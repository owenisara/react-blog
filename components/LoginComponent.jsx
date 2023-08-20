import NavbarComponent from './NavbarComponent'
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { autenticate, getUser } from '../service/authorize'
import{useNavigate} from 'react-router-dom'

const LoginComponent = (props) => {
  const navigate = useNavigate();
    const[state,setState] = useState({
        username:"",
        password:""
      })
      const{username,password} = state

      const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
      }

      const submitForm=(e)=>{
        e.preventDefault()
            console.table(username,password)
            axios.post(`${import.meta.env.VITE_API}/login`,{username,password})
            .then(res=>{
             
              autenticate(res,()=>navigate('/create'))

            }).catch(err=>{Swal.fire(
              'เเจ้วเตือน!',
              err.response.data.error,
              'error'
            )})
    }
    useEffect(()=>{
        getUser()  && navigate('/')
    },[])
  return (
    <div className='container p-5' >
    <NavbarComponent/>
    <h1>เข้าสู่ระบบ | แอดมิน</h1>
   
    <form onSubmit={submitForm}> 
    <div className='form-group'>
      <label>Username</label>
      <input type="text" required className='form-control' onChange={inputValue("username")} value={username}/>
    </div>
    <div className='form-group'>
      <label>Password</label>
      <input type="password" required className='form-control'onChange={inputValue("password")} value={password} />
    </div>
    <br/>
    <input type="submit"  value="เข้าสู่ขะบบ" className='btn btn-primary' />
   
    </form>
   
</div>
  )
}

export default LoginComponent 
