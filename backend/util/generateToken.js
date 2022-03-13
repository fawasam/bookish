import jwt from'jsonwebtoken'

const generateToken = (id) =>{

    //sign for create token 
    return jwt.sign ({id} , process.env.JWT_SECRET ,{
        expiresIn : '30d'
    } )
}

export default generateToken