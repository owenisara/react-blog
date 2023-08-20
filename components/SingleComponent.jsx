import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './NavbarComponent';
import parse from 'html-react-parser';
const SingleComponent = () => {
    let {slug} = useParams();
    const[blog,setBlog]= useState('')
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API}/blog/${slug}`)
        .then(res=>{
            setBlog(res.data)
        }).catch(err=>alert(err))
    },[])
  return (
    <div className='container p-5'>
        <NavbarComponent/>
        {blog && <div>
          <h1>{blog.title} </h1>
          <div >{parse(blog.content) }</div>
          <p className='text-muted'>ผู้เขียน:{blog.author} , เผยเเพร่ : {new Date(blog.createdAt).toLocaleString() }</p>
          </div>}
    </div>
  )
}

export default SingleComponent
