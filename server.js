const express = require('express');
const bodyParser= require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.use('/', require('./routes/api'));


app.listen(3000);
console.log("Server running on port 3000")