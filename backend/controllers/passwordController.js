const User = require('../models/userModel');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) 
    return res.status(400).json({ error: 'Email is required.' });

  const user = await User.findOne({ where: { email } });
  if (!user)
    return res.status(404).json({ error: 'No user with that email.' });

  // create reset token
  const resetToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  // Send link with sandbox
  const resetUrl = `${process.env.CLIENT_URL}/reset-password.html?token=${resetToken}`;
  const message = `Reset your password by visiting:\n\n${resetUrl}\n\nThis link expires in 1 hour.`;

  try {
    await sendEmail({ to: email, subject: 'Password Reset', text: message });
    res.json({ message: 'Password reset email sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email could not be sent.' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password)
    return res.status(400).json({ error: 'Token and new password are required.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) 
      return res.status(404).json({ error: 'User not found.' });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Password reset successful.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Token invalid or expired.' });
  }
};
