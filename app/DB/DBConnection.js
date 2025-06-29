const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
     host: "localhost",
     port: 3306,
     user: 'devMohamed',
     password: 'Strongpassword@1234',
     database: "blogApp"

})

connection.connect((err) => {
     if (err) {
          console.log("Connection Faild!", err);
     }
     else {
          console.log("Connection Successfully");

     }

})

module.exports = connection