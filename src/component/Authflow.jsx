import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import {useSelector} from 'react-redux'


function Protected({children, authentication=true}){
    const navigate = useNavigate()
    const [loader , setloader] = useState("true")
   const authStatus = useSelector(state=> state.auth.status)

useEffect(()=>{
if(authentication && authStatus !== authentication){
    navigate("/login")
}
else if(!authentication && authStatus !== authentication){
    navigate("/")
}
setloader("false")
},[authStatus , authentication , navigate])


    return loader ? <h1>LOADING ......</h1> : <>{children}</>
}

export default Protected


