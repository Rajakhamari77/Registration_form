const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/registrationForm', { useNewUrlParser: true, useUnifiedTopology: true });


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});


const User = mongoose.model('User', userSchema);


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/public'));


app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  
  const newUser = new User({ username, email, password });

  try {
    
    await newUser.save();
    res.send('Registration successful!');
  } catch (error) {
    res.send('Error registering user.');
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
