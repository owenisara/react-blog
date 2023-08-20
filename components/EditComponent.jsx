import React, { useState,useEffect } from 'react'
import NavbarComponent from './NavbarComponent'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from "react-quill"
import {  useParams } from 'react-router-dom';
import "react-quill/dist/quill.snow.css"
import { getToken } from '../service/authorize'
const EditComponent = () => {
  const[state,setState] = useState({
  title:"",
  author:"",
  slug:""
})
const{title,author} = state
const[content,setContent]=useState("")
let {slug} = useParams();

const submitContent=(e)=>{
  setContent(e)
}

useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API}/blog/${slug}`)
    .then(res=>{
        const{title,content,author}= res.data
        setState({...state,title,author,slug})
        setContent(content)
    }).catch(err=>alert(err))
},[])

const inputValue=name=>event=>{
  console.log(name,"=",event.target.value)
  setState({...state,[name]:event.target.value});
}


const showUpdateForm=()=>(
    <form onSubmit={submitForm}> 
    <div className='form-group'>
      <label>ชื่อบทความ</label>
      <input type="text" required className='form-control' onChange={inputValue("title")} value={title}/>
    </div>
    <div className='form-group'>
      <label>รายละเอียด</label>
      <ReactQuill value={content} onChange={submitContent} theme='snow' className='pb-5 mb-3' style={{border:'1px solid #666'}}/>
    </div>
    <div className='form-group'>
      <label>ผู้เขียน</label>
      <input type="text" required className='form-control'onChange={inputValue("author")} value={author}/>
    </div>
    <br/>
    <input type="submit"  value="อัพเดต" className='btn btn-primary' />
    </form>)

const submitForm=(e)=>{
  e.preventDefault();
axios.put(`${import.meta.env.VITE_API}/blog/${slug}`,{title,content,author},{headers:{authorization:`Bearer ${getToken()}`}})
.then(res=>{
  Swal.fire(
    'เเจ้วเตือน!',
    'อัพเดตข้อมูลเรียบร้อย!',
    'success'
  )
  const {title,content,author}= res.data
  setState({...state,title,author,slug})
  setContent(content)

}).catch(err=>{Swal.fire(
  'เเจ้วเตือน!',
  'error'
)})

}
  return (
    <div className='container p-5' >
        <NavbarComponent/>
        <h1>เเก้ไขบทความ</h1>
        {showUpdateForm()}
   

    </div>
  )
}

export default EditComponent
