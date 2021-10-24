const {Users} = require('../models/Users');

const Query ={
  getUsersDetails: async() =>{
    try{
      const Users = await Users.findAll();
      return Users;
    }catch (err){
      console.log(err);
    }
  },
  getUsersDetailsid: async (postgres,{id})=>{
    try{
      const user = await Users.findBypk(id)
      return user;
    } catch (err){
      console.log(err);
    }
  }
}
const Mutation ={
  createUser: async(postgres,{
    Name,
    age,
    email,
    number
  }) =>{
    try{
      await Users && Users.create({
        Name,
        age,
        email,
        number
      })
      return "created User"
    }catch(err){
    console.log(err)
    }
  },
  updateEmployee: async (postgres, {
  id,
  Name,
  age,
  email,
  number
}) => {
  try {
    await Users && Users.update({
      Name,
      age,
      email,
      number
    }, { where: { id: id } });
    return "User updated successfully";
  } catch (err) {
    console.log(err)
  }
},
deleteEmployee: async (postgres, { id }) => {
  await Users.destroy({ where: { id: id } })
  return "User updated successfully";
}
}

module.exports ={Query,Mutation}
