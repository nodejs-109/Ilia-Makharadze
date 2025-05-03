const bcrypt = require('bcryptjs');
const  User  = require('../models/userModel'); 


async function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        //create new user
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
}

module.exports = {
    register,
};
