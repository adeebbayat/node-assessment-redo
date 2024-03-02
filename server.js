const express = require('express');
const {controller} = require('./controller.js');
const app = express();
const path = require('path');
const PORT = 3000;


// parses JSON from incoming request
app.use(express.json());


// serve the colors.html page when /colors is visited
// handle post requests to /colors
// DO NOT USE express.static

// get request colors.html handling
app.get('/colors',(req,res) => {
  res.status(200).sendFile(path.join(__dirname,'client/colors.html'));
});

// post request handling
app.post('/colors',controller.getColor,(req,res) => {
  console.log(res.locals);
  const color = res.locals
  res.json({color});
});

// css handling
app.get('/styles.css', (req, res) => {
  res.status(200)
  .contentType('text/css')
  .sendFile(path.join(__dirname, 'client/styles.css'));
});

// 404 error handling 
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'client/404.html'));
});

// Global error handling middleware
// How can we trigger this to run?
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
