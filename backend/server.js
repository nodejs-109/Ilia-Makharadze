require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); 
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./models/db');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'frontend')));


// Routes
app.use('/', authRoutes);
app.use('/api/books', bookRoutes);



//endpoints

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'registrationPage.html'));
});
sequelize.sync()
.then(() => {
    console.log('Database connected and models synchronized.');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
});


app.get('/registration',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','frontend','registrationPage.html'))
})


app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','frontend','loginPage.html'))
})

app.get('/forgot-password',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','frontend','forgot-password.html'))
})

app.get('/reset-password',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','frontend','reset-password.html'))
})