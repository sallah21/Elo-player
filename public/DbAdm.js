var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port:'3306',
  user: "root",
  password: "password",
  database: 'mydb'
});

con.connect(function(err) {
  if (err) throw err;
 
  if(con){
    console.log("Connected!");
    var sql = "INSERT INTO artist (Name,Songs) VALUES ?";
    var values =  [
      ['Taco Hemingway', 'ZTM'],
      ['LOGIC', 'I Am The Greatest'],
      ['Eminem', 'Ringer'],
      ['Drake', 'Gods plan'],

    ];
    con.query(sql, function(err,result){
        if(err) throw err;
        console.log(result.affectedRows + " Rows added with ID : " + result.insertId );
      })
  }
  else{
  console.log('Not connected!')
  }
  })