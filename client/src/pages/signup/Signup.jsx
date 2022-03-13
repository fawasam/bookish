import React, { useEffect, useState  } from 'react'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {motion } from 'framer-motion'

//redux
import {useDispatch , useSelector} from "react-redux"
import {register} from "../../redux/actions/userAction.js"

import"./Signup.css";
const Signup = () => {

	const navigate = useNavigate();
	const dispatch =useDispatch()
	const [name ,setName] =useState('')
    const [email ,setEmail] =useState('')
    const [password ,setPassword] =useState('')
    const [confirmPassword ,setConfirmPassword] =useState('')
    const [message ,setMessage] =useState(null)

    const userRegister = useSelector(state => state.userRegister)
    const { error , userInfo } =userRegister

    useEffect(()=>{
        if(userInfo){
            navigate("/")
        }
    },[userInfo ])

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }
        else{
            dispatch(register(name,email,password))
        }
    }
	
	return (
		<motion.div 
		 layout
 		 animate={{ opacity:1}}
 		 initial={{opacity:0}}
		  exit={{opacity:0 }}
		  transition={{duration:0.5}} 
		
		className="signup_container">
			<div className='signup_form_container'>	
				<div className='right'>
					<form className='form_container' onSubmit={handleSubmit}>
			        {error && console.log(`${error}`)}
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Username"
							name="name"
                   onChange={(e)=>setName(e.target.value)}
							value={name}
							required
							className='input'
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
                   onChange={(e)=>setEmail(e.target.value)}
							value={email}
							required
							className='input'
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
                   onChange={(e)=>setPassword(e.target.value)}
							value={password}
							required
							className='input'
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							name="password"
                   onChange={(e)=>setConfirmPassword(e.target.value)}
							value={confirmPassword}
							required
							className='input'
						/>
						{error && <div className='error_msg'>{error}</div>}
						<button type="submit" className='green_btn'>
							Sign Up
						</button>
					</form>
				</div>
				<div className='left'>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className='white_btn'>
							Sing in
						</button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default Signup;