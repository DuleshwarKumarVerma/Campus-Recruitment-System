const express = require('express');
const bodyParser= require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


app.use('/', require('./routes/api'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));
