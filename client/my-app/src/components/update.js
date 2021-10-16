import React, {useState} from "react";
import Axios from "axios";

function Update(){
  const [data, setData]=useState({
    name:"" ,
    age:"",
    email:"",
    number:"",
    uid:'',
  })
  function upd(res,req,e){
    e.preventDefault();
    Axios.patch(('localhost:5000/users/'+ data.uid),{
      name: (data.name),
      age: (data.age),
      email:(data.email),
      number:(data.number)
    })
    .then(result =>{
      console.log(result)
  }).catch(error => {
      console.log(error)
  })
  }

    function handle(e){
      const newdata={...data}
      newdata[e.target.id]=e.target.value
      setData(newdata)
      console.log(newdata)

    }

    return(
      <div>
        <form onSubmit ={(e)=> Update(e)}>
        <h2><i>Update User</i></h2>
        <label><b>Enter UserId : </b></label>
        <input onChange={(e)=>handle(e)} id="uid" value={data.id} placeholder="User ID" type="text" ></input><br /><br />
        <label><b>Enter the Name :  </b></label>
        <input onChange={(e)=>handle(e)} id="name" value={data.name} placeholder="Name" type="text" ></input><br /><br />
        <label><b>Enter the age : </b> </label>
        <input onChange={(e)=>handle(e)} id="age" value={data.age} placeholder="Age" type="text" ></input><br /><br />
        <label><b>Enter Email : </b></label>
        <input onChange={(e)=>handle(e)} id="email" value={data.email} placeholder="E-mail" type="text" ></input><br /><br />
        <label><b>Enter Number : </b></label>
        <input onChange={(e)=>handle(e)} id="number" value={data.number} placeholder="Number" type="text" ></input><br /><br />
        <button onClick ={(e)=>upd(e)}>Update User</button>



    </form>
  </div>
)
}
 export default Update;
