import { useEffect, useState } from "react"
import { PostForm, Container } from "../component"
import { useNavigate, useParams } from "react-router-dom"
import appwriteservise from "../appwrite/config"


function EditPost(){
const navigate = useNavigate()
const {slug} = useParams()
const [post , setPost]= useState(null)
useEffect(()=>{
if(slug){
    appwriteservise.getPost(slug).then((post)=>{
        if(post){
            setPost(post)
        }
    })
}
else{
    navigate('/')
}
},[slug, navigate])

  return  post ? (
       <div className="py-7">
        <Container>
            <PostForm post={post}/>
        </Container>
       </div>
    ) : null;
}
  export default EditPost