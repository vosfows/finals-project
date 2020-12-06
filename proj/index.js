const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var mysqlConnection = mysql.createConnection({
	host: 'localhost',
	user:'admin',
	password:'',
	databse:'music',
	multipleStatement: true
});

mysqlConnection.connect((err)=>{
	if (!err) {
		console.log('Connected successfully');
	}else{
	console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
	}
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//Display
app.get('/website' , (req, res) => {
mysqlConnection.query('SELECT * FROM website', (err, rows, fields) => {
if (!err)
res.send(rows);
else
console.log(err);
})
});

//Add to db
mysqlConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  mysqlConnection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("successfully inserted");
  });
});

