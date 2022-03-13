import React, { useEffect, useState  } from 'react'
import { Link, useNavigate } from "react-router-dom";
import {motion } from 'framer-motion'

//redux
import {useDispatch , useSelector} from "react-redux"
import {login,logout , getUserDetails} from "../../redux/actions/userAction.js"

const Login = () => {
    const navigate = useNavigate();
	const [email ,setEmail] =useState('')
    const [password ,setPassword] =useState('')
    const dispatch =useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { error , userInfo } =userLogin

    useEffect(()=>{
        if(userInfo){
            navigate("/")
        }
    },[ userInfo ])

    const submitHandler =(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
  return (
    <motion.div
	layout
 	animate={{ opacity:1}}
  	initial={{opacity:0}}
  	exit={{opacity:0 }}
  	transition={{duration:0.5}} 
	>
      <div className="signup_container">
			<div className='signup_form_container'>		
				<div className='right'>
					<form className='form_container' 
                      onSubmit={submitHandler}>
						<h1>Login</h1>						
						<input
							type="email"
							placeholder="Email"
							name="email"
							value={email}
                            onChange={(e)=>setEmail(e.target.value)}
							required
							className='input'
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={password}
                            onChange={(e)=>setPassword(e.target.value)}
							required
							className='input'
						/>
						{error && <div className='error_msg'>{error}</div>}
						<button type="submit" className='green_btn'>
							Login
						</button>
					</form>
				</div>
        		<div className='left leftl'>
					<h1>Create a account</h1>
					<Link to="/signup">
						<button type="button" className='white_btn'>
							Sign up
						</button>
					</Link>
				</div>
			</div>
		</div>
    </motion.div>
  )
}

export default Login