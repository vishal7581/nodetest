const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();


app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/templates')
// app.use(express.static(__dirname + '/testhtml'));
// app.get('/',(req,res)=>{
// // res.send('<h2>Hello World<h2>');
// res.send({
//   name: 'vishal',
//   likes: [
//     'stuff',
//     'more stuff'
//   ]
// });
// });
app.use((req,res,next)=>{
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`
fs.appendFile('server.log' , log +'\n', (err)=>{
if(err){
  console.log('Error logging in the file');
}
next();
});
});

  // app.use((req,res,next)=>{
  // res.render('maintainence.hbs');
  //
  // })

app.get('/',(req,res)=>{
res.render('homepage.hbs',{
authorName: 'Vishal',
date: new Date().getFullYear()
});
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
pageName:'About Me',
authorName: 'Vishal',
date: new Date().getFullYear()
});
});

app.get('/bad',(req,res) => {
  res.send({
    errorMessage:'Unable to display the page',
  });
});


app.listen(port,()=>{
  console.log(`server is running on ${port}`);
});
