const User = require('../models/userModel');

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
    //   attributes: { exclude: ['password'] } // do not return password
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

 async function getUserById(req,res) {
    try{
      const users=await User.findAll();
      const userId=parseInt(req.params.id);

      let foundUser=null;
      for(let i=0;i<users.length;i++){
        if(users[i].id===userId){
          foundUser=users[i];
          break;
        }
      }
      if(!foundUser){
        return res.status(404).json({error: "User not found"});
      }
      res.status(200).json(foundUser);
    }catch(error){
      console.log(error);
      res.status(500).json({ error: "Faid to fetch user" });
    }
  
 }

  async function updateUser(req,res) {
    try{
      const users=await User.findAll();
      const userId=parseInt(req.params.id);

      let foundUser=null;
      for(let i=0;i<users.length;i++){
        if(users[i].id===userId){
          foundUser=users[i];
          break;
        } 
      }
      if(!foundUser){
        return res.status(404).json({error: "User not found"});
      }

      await foundUser.update(req.body);
      res.status(200).json({message: "user changed sucessfully"});

    }catch{
      console.log(error);
      res.status(500).json({ error: "Faid to fetch user" });
    }
    
  }

  async function deleteUser(req,res){
    try{
      const users=await User.findAll();
      const userId=parseInt(req.params.id);

      let foundUser=null;
      for(let i=0;i<users.length;i++){
        if(users[i].id===userId){
          foundUser=users[i];
          break;
          }
        }
        if(!foundUser){
          return res.status(404).json({error: "User not found"});
        }
        await foundUser.destroy();//delete user
        res.status(200).json({message: "user deleted sucessfully"});
    }catch{
      console.log(error);
      res.status(500).json({ error: "Faid to fetch user" });
    }
  }

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
