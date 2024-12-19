const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;  // or any other port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'templates','index.html','public')));

const mongoURI = 'mongodb+srv://abhinayk9393:Abhinay%237@cluster0.7hs27.mongodb.net/formDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((error) => console.error('MongoDB connection error:', error));

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Form = mongoose.model('Form', formSchema);

app.get('/', (req, res) => {
  console.log("GET request received on /");  // Console log to confirm route hit
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
  const formData = new Form({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  formData.save()
    .then(() => {
      console.log('Form data saved successfully');node 
      res.send('Form data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving form data:', error);
      res.status(500).send('Error saving form data.');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);  // Console log to confirm server start
});