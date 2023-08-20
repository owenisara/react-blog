
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import NavbarComponent from '../components/NavbarComponent'
import axios from 'axios'
import Swal from 'sweetalert2'
import parse from 'html-react-parser';
import { getUser,getToken } from '../service/authorize'
function App() {
  const [blogs, setBlogs] = useState([])

  const fetchdata = (()=>{
 axios.get(`${import.meta.env.VITE_API}/blogs`)
              .then(res=>{
                  setBlogs(res.data)
              }).catch(err=>alert(err))
  })

  useEffect(()=>{
    fetchdata()
  },[])
  
const confirmDelete=(slug)=>{
  Swal.fire({
    title:"คุณต้องการลบบทความหรือไม่",
    icon:"warning",
    showCancelButton:true
  }).then((result)=>{
    if(result.isConfirmed){
      deleteBlog(slug)
      
    }
  })
}

const deleteBlog =(slug)=>{
  axios.delete(`${import.meta.env.VITE_API}/blog/${slug}`,{headers:{authorization:`Bearer ${getToken()}`}})
  .then((res)=>{
    Swal.fire("Deleted",res.data.message,"success" )
    fetchdata()
  })
 
}
  return (
    <div className='container p-5'>
      <NavbarComponent/>
    {blogs.map((blog,index) =>(
        <div key={index} className='row' style={{borderBottom:'1px solid silver'}}> 
        <div className='col pt-3 pb-2'> 
               <Link to={`/blog/${blog.slug}`}><h2>{blog.title}</h2></Link>  
              <p>{parse(blog.content.substring(0,250))}</p>
              <p className='text-muted'>ผู้เขียน:{blog.author} , เผยเเพร่ : {new Date(blog.createdAt).toLocaleString() }</p>
            { getUser()&&( <div>
              <Link className='btn btn-outline-success' to={`/blog/edit/${blog.slug}`}>  แก้ไขบทความ &nbsp; </Link> 
              <button className='btn btn-outline-danger'onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
            </div>)}
          </div>
        </div>))}
    </div>
  )
}
export default App
