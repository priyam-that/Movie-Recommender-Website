import React, { useState } from 'react'
import style from '../Styles/loginStyle.module.css'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import imageTobase64 from '../../helpers/imageTobase64';
import SummaryApi from '../../common';
import { toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';



const SignUp = () => {  
  const[showPassword, setShowPassword] = useState(false)                  //to show and hide password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)   //to show and hide confirm password
  const[data, setData]=useState({
    email :"",
    password : "",
    name: "",
    confirmPassword : "",
    profilePic : ""
  })

  //used to navigate
  const navigate = useNavigate() 

  //used to handle the states
  const handleOnChange=(e)=>{ 
    const {name,value} =e.target
    setData((preve)=>{  
      return{ 
        ...preve,                                                         //spread operator
        [name]:value 
      }
    })
  }

  //to convert image to base64
  const handleUploadPic = async(e)=>{
    const file = e.target.files[0]                                      //to get the file

    const imagePic = await imageTobase64(file)
    
    setData((preve)=>{
      return{
        ...preve,
        profilePic : imagePic
      }
    })
  }

  //to handle the submit
  const handleSubmit =async(e)=>{  
    e.preventDefault()
    
    if(data.password === data.confirmPassword){
      
      //to send the data to the backend
      const dataResponse = await fetch(SummaryApi.signUP.url,{   
        method : SummaryApi.signUP.method,
        headers : {
          "content-type" : "application/json"                           //to send the data as json
        },
        body: JSON.stringify(data) 
      })
      const dataApi = await dataResponse.json()                        //to get the data from the backend
      
      //show a success message
      if(dataApi.success){
        toast.success(dataApi.message)    
        navigate("/login")
      }

      //show an error message
      if(dataApi.error){
        toast.error(dataApi.message)  
      }
  
    }else{
      toast.error("Please check password and Confirm Password")
    }
    
  }
 
  return (
    <section id='signup'>
     <div className={style.bodyMask}></div>
        <div className={style.container} style={{background:`url("./images/bg.jpg")no-repeat center / cover`}}>
            <div className={style.bg} style={{marginTop:"3em"}}>
                <div className={style.icons}>
                  <div className={style.img}>
                    {/*to show the profile pic */}
                    <img src={data.profilePic || "./images/signin.gif"} alt='login icons' className={style.defaultImg}/>
                  </div>
                  
                  <form>
                  
                    <label>
                      <div className={style.profilePicBtn}> {/* to upload the profile pic  */}
                        Upload Photo
                      </div>
                      <input placeholder='Upload Photo' autoComplete='off' type='file' className={style.picfile} onChange={handleUploadPic}/>
                    </label>
                    
                  </form>
                </div>
                <form  className={style.form} onSubmit={handleSubmit}>   {/* to handle the submit  */}
                  <div style={{marginTop:"0.3em"}}>
                    <label>Name: </label>
                    <div style={{ marginTop: "0.2em"}}>
                      <input autoComplete='off' autoFocus type ='text' placeholder='Enter username...' name='name' value={data.name}
                      onChange={handleOnChange}
                      required
                      className={style.email}
                      />
                    </div>
                  </div>

                  <div style={{marginTop:"0.3em"}}>
                    <label>Email: </label>
                    <div style={{ marginTop: "0.2em"}}>
                      <input autoComplete='off' type ='email' placeholder='Enter email...' name='email' value={data.email}
                      onChange={handleOnChange}
                      required
                      className={style.email}
                      />
                    </div>
                  </div>

                  <div style={{marginTop:"0.3em"}} >
                    <label>Password: </label>
                    <div className={style.passwordHolder}>
                      <input  autoComplete='off'
                      type ={showPassword ? "text": "password"} //to show and hide password
                      placeholder='Enter password...'
                      name='password'
                      value={data.password}
                      onChange={handleOnChange}
                      required
                      className={style.password}/>
                    
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

                  <div style={{marginTop:"0.3em"}}>
                    <label>Confirm Password: </label>
                    <div className={style.passwordHolder}>
                      <input 
                      type ={showConfirmPassword ? "text": "password"} 
                      placeholder='Confirm your password...'
                      name='confirmPassword'
                      value={data.confirmPassword} //to show and hide confirm password
                      onChange={handleOnChange}
                      required
                      className={style.password}/>
                    
                      <div className={style.cursor} onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                          {
                          showConfirmPassword ? (
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

                  <button className={style.login}>Sign Up</button>
                </form>

                <p className={style.Signup}>Already have account ? <Link className={style.link} to= "/Login">Log in</Link> </p>
            </div>
        </div>
      </section>
  )
}

export default SignUp