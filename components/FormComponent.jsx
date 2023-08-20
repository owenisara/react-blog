import React, { useState } from 'react'
import NavbarComponent from './NavbarComponent'
import axios from 'axios'
import Swal from 'sweetalert2'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getToken, getUser } from '../service/authorize'
const FormComponent = () => {
  const[state,setState] = useState({
  title:"",
  author:getUser()
})
const{title,author} = state

const[content,setContent]=useState("")

const inputValue=name=>event=>{
  console.log(name,"=",event.target.value)
  setState({...state,[name]:event.target.value});
}

const submitContent=(e)=>{
  setContent(e)
}

const submitForm=(e)=>{
  e.preventDefault();
console.table({title,content,author})
axios.post(`${import.meta.env.VITE_API}/create`,{title,content,author},{headers:{authorization:`Bearer ${getToken()}`}})
.then(response=>{
  Swal.fire(
    'เเจ้วเตือน!',
    'บันทึกข้อมูลเรียบร้อย!',
    'success'
  )
  setState({...state,title:"",author:""})
  setContent('')
}).catch(err=>{Swal.fire(
  'เเจ้วเตือน!',
  err.response.data.error,
  'error'
)})

}
  return (
  
    <div className='container p-5' >
        <NavbarComponent/>
        <h1>Form Component</h1>
       
        <form onSubmit={submitForm}> 
        <div className='form-group'>
          <label>ชื่อบทความ</label>
          <input type="text" required className='form-control' onChange={inputValue("title")} value={title}/>
        </div>
        <div className='form-group'>
          <label>รายละเอียด</label>
          <ReactQuill value={content} onChange={submitContent} theme='snow' className='pb-5 mb-3' placeholder='เขียนบทความของคุณ' style={{border:'1px solid #666'}}/>
        </div>
        <div className='form-group'>
          <label>ผู้เขียน</label>
          <input type="text" required className='form-control'onChange={inputValue("author")} value={author} />
        </div>
        <br/>
        <input type="submit"  value="บันทึก" className='btn btn-primary' />
        </form>
       
    </div>
  )
}

export default FormComponent
