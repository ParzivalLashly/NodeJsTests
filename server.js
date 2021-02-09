const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const axios = require('axios');

var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} : path (${req.path})`;
  console.log(log);
  fs.writeFileSync('server.log', log + '\n');
  next();
})

// app.use((req, res, next) =>{
//   res.render('offline.hbs');
// })

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() =>{
  return new Date().getFullYear();
})
hbs.registerHelper('upperCase',(text) =>{
  return text.toUpperCase();
})

app.get('/',(req, res) => {
  res.render('index.hbs',{
    pageTitle: 'Homepage',
    h1: 'Index of Homepages',
    p: 'this is my first html page in Nodejs',
  });
})

app.get('/aboutus',(req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Us',
    h1: 'Index of About Us',
    p: 'this is my about us html page in Nodejs',
  });
})

var coinApiUrl = `http://bex24.ir/assets/plugins/api/binance/includes/coin.php?coin_type=BTCUSDT`;

axios.get(coinApiUrl).then((res)=>{
  var result = res.data;
}).catch(()=>{
  var result = "Error / could'nt reach API";
})

app.get('/fetch_coin_price',(req,res)=>{
  res.render('coin_price.hbs',{
    pageTitle: 'Get Bitcoin price',
    h1: 'Price of Bitcoin is :',
    p: result
  });
})

app.listen(80,()=>{
  console.log('Server is Running');
});
