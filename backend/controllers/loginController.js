const User=require('../models/userModel');
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')


async function login(req,res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    } 
    try {
        // search customer
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return res.status(400).json({ error: 'Invalid email or password.' });
        }
        //compare hash data

        const match=await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({error: 'Invalid data'});
        }

        //generaate token
        const payload={id: user.id,email:user.email};
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:process.env.JWT_EXPIRES_IN
        })
        return res.json({message: 'login successful'});
}catch(err){
    console.error(err);
    return res.status(500).json({error:'Server error.'});
    }
}

module.exports={login};