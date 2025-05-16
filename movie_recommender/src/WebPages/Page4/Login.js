import React, { useContext, useState } from 'react'
import style from '../Styles/loginStyle.module.css'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../context';

//creating login function
const Login = () => { 
  const[showPassword, setShowPassword] = useState(false) 
  const[data, setData]=useState({
    email :"",
    password : ""
  })
  const navigate=useNavigate();
  const {fetchUserDetails} = useContext(Context)

  const handleOnChange=(e)=>{
    const {name,value} =e.target                                  //to get the name and value
    setData((preve)=>{
      return{
        ...preve,                                                //spread operator
        [name]:value
      }
    })
  }

  const handleSubmit =async(e)=>{
    e.preventDefault()
    
    //to send the data to the backend
    const dataResponse = await fetch(SummaryApi.signIn.url,{
      method : SummaryApi.signIn.method,                         //to send the data as json
      credentials : "include",
      headers : {
        "content-type": "application/json"
      },
      body : JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()
    
    
    if(dataApi.success){                                        //show a success message
      toast.success(dataApi.message)
      
      navigate("/")
      fetchUserDetails()                                       //fetch user details
    }
    if(dataApi.error){                                         //show an error message
      toast.error(dataApi.message)
    }

  }
  console.log("data login",data)
  return (
    <>
      <section id='login'>
        <div className={style.bodyMask}></div>
        <div className={style.container} style={{background:`url("./images/bg.jpg")no-repeat center / cover`}} >
           
            <div className={style.bg} style={{marginTop:"3em"}}>
                <div className={style.icons}>
                  <img src="./images/signin.gif" alt='login icons' className={style.defaultImg}/>
                </div>
                <form  className={style.form} onSubmit={handleSubmit}>
                  <div>
                    <label >Email: </label>
                    <div style={{ marginTop: "0.2em"}}>
                    <input autoFocus autoComplete='off' type ='email' placeholder='Enter email...' name='email' value={data.email}
                      onChange={handleOnChange}
                    /> 
                    </div>
                   
                  </div>

                  <div style={{marginTop:"0.5em"}}>
                    <label>Password: </label>
                    <div className={style.passwordHolder}>
                      <input  autoComplete='off' className={style.password}
                      type ={showPassword ? "text": "password"} 
                      placeholder='Enter password...'
                      name='password'
                      value={data.password}
                      onChange={handleOnChange}/>
                      {/*to show and hide password */}
                      <div className={style.cursor} onClick={()=>setShowPassword((preve)=>!preve)}>
                        
                          {
                          showPassword ? (
                            <IoEyeOff/>
                          )
                          :
                          (
                            <IoEye/>
                          )
                          }
                        
                        
                       
                      </div>
                    </div>
                      
                    
                  </div>

                  <button className={style.login}>Log in</button>
                </form>

                <p className={style.Signup}>Don't have account ? <Link className={style.link} to={"/Signup"}>Sign Up </Link></p>
            </div>
        </div>
      </section>
    </>
  )
}

export default Login
