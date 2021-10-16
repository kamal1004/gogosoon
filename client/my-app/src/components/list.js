import React  from "react";
import Axios from "axios";


function List(req,res,e){
  Axios.get('localhost:5000/users')
  .then(result =>{
    console.log(result)
}).catch(error => {
    console.log(error)
})

return(
  <div>
    <form onSubmit ={(e)=> List(e)}>
    <h2><i>List Users</i></h2>
    <button >List all User</button>
    </form>
  </div>
)
}

export default List;
