import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:4000/${id}`);

    const result = await response.json();

    if (response.ok) {
      setError("");
      // toast.error("Edit Successfully")
      // console.log("updated successfully", result);
      setName(result.name)
      setEmail(result.email)
      setAge(result.age)
    }
  };

  //updateing the data
  const editHandler = async (e)=>{
    e.preventDefault()

    const updatedUser = {name,email,age} 
    // console.log(updatedUser)

    const response = await fetch(`http://localhost:4000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-Type": "application/json"
        },
    });
    
    const result = await response.json()
    if(!response.ok){
        // console.log(result.error)
        setError(result.error)
    }else{
      setError("")
        navigate('/all')
        toast.success("Updated Successfully")
    }
  }

  useEffect(() => {
    getSingleUser();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger">{error} </div>}
      <div className="text-center">
        <h1>Edit The Data</h1>
      </div>
      <form onSubmit={editHandler}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
