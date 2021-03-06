import express from'express'
import multer from 'multer'
import path from 'path'

const router =express.Router()


const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null , 'uploads/')
    },
    filename(req,file ,cb) {
        cb(null , `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType (file ,cb){
    const allowedFileTypes =['image/png' , 'image/jpg' ,'image/jpeg'];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null ,true)
    }else{
        cb('Image only')
    }
}

const upload = multer( { 
    storage , 
    fileFilter(req,file,cb){
        checkFileType(file , cb) 
    }
})

router.post('/' , upload.single('image'),(req,res) => {
    res.send(`/${req.file.path}`)
})
export default router