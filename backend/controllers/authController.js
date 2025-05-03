const bcrypt = require('bcryptjs');
const { User } = require('../models'); // User model

async function login(req, res) {
    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        
        res.json({ message: 'Login successful!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error.' });
    }
}

module.exports = {
    login,
};
