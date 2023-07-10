import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const CreatePost = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [age, setAge] = useState(0)
    const [error, setError] = useState("")

    console.log(name,email,age)
    const navigate = useNavigate()

    const handler = async (e)=>{
        e.preventDefault()

        let addUser = {name,email,age} 
        console.log(addUser)

        const response = await fetch("http://localhost:4000" , {
            method: "POST",
            body: JSON.stringify(addUser),
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        const result = await response.json()
        if(!response.ok){
            console.log(result.error)
            setError(result.error)
        }else{
            // console.log(result)
            setError("")
            setName("")
            setEmail("")
            setAge("")
            navigate('/all')
            toast.success("Successfully Created")
        }
    }

  return (
    <div className='container my-2'>
        {error && <div class="alert alert-danger" >{error} </div> }
        <div className='text-center'>
            <h1>Enter The Data</h1>
        </div>
    <form onSubmit={handler}>
  <div className="mb-3">
    <label className="form-label">Name</label>
    <input type="text" className="form-control"  value={name} onChange={(e)=> setName(e.target.value)} />
  </div>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control"  value={email} onChange={(e)=> setEmail(e.target.value)} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=> setAge(e.target.value)}  />
  </div>
  <button type="submit" >Submit</button>
</form>
      
    </div>
  )
}

export default CreatePost
