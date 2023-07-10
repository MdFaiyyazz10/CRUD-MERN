import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const ReadPost = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function getData() {
    const response = await fetch("http://localhost:4000");

    const result = await response.json();
    console.log("result" , result)

    if (!response.ok) {
    //   console.log(result.error);
      setError(result.error);
    } else {
      setData(result);
      setError("")
    }
  }

  const deleteHandler = async (id)=>{
    const response = await fetch(`http://localhost:4000/${id}` , {
        method: "DELETE"
    })

    const result = await response.json()

    if (!response.ok) {
        //   console.log(result.error);
          setError(result.error);
        } else {
            // setError("Delete Successfully")
            toast.error("Deleted")
            setError("")
            getData()
        }
  }

  useEffect(() => {
    getData();
  }, []);

//   console.log(data);

  return (
    <div className="container my-2">
        {error && <div class="alert alert-danger" >{error} </div>}
      <h2 className="text-center">All Data</h2>
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div class="card">
              <div className="card-body">
                <h5 className="card-title">Name:{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">E-Mail:{ele.email}</h6>
                <h6 className="card-text">Age:{ele.age}</h6>
                <Link className="card-link" onClick={()=>deleteHandler(ele._id)}>Delete</Link>
                <Link to={`/${ele._id}`} className="card-link">Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadPost;
