import React, {useState} from "react";
import Axios from "axios";


function Form(){
  const [data, setData]=useState({
    uid:'',
  })

function del(req,res,e){
  Axios.delete('localhost:5000/users/'+ data.uid)
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
    <form onSubmit ={(e)=> del(e)}>
    <h2><i>Delete Users</i></h2>
    <label><b>Enter UserId : </b></label>
    <input onChange={(e)=>handle(e)} id="uid" value={data.id} placeholder="User ID" type="text" ></input><br /><br />
    <button onClick ={(e)=>del(e)}>Delete User</button>
    </form>
  </div>
)
}
export default Form;
