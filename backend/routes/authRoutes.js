const express = require('express');
const router = express.Router();
const { register } = require('../controllers/registerController');
const { login }    = require('../controllers/loginController');
const {forgotPassword,resetPassword}=require('../controllers/passwordController');
const { getAllUsers,getUserById,updateUser,deleteUser } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password',   resetPassword);

router.get('/users', getAllUsers);
router.get('/users/:id',getUserById);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

module.exports = router;
