
import { useState,useEffect } from "react";
import AppwriteServices from "../appwrite/config"
import { Container } from "../component";
import PostCard from "../component";


function Home(){

const [posts,setPosts]= useState([])

useEffect(()=>{
AppwriteServices.getPosts().then((posts)=>{
    if(posts){
        setPosts(posts.document)
    }
})
},[])

if(posts===0){
    return(
        <div className="w-full text-center py-7 mt-4">
            <Container>
            <div className="flex flex-wrap">
                        <div className="p-3 w-full">
                            <h1 className="text-2xl font-bold hover:text-orange-500">
                               YOU DONT HAVE ANY POSTS YET
                            </h1>
                        </div>
                    </div>
            </Container>
        </div>
    )
}
    return(
        <div className="w-full text-center mt-4 py-7">
  <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;