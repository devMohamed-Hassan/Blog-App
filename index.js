const express = require('express')
const mysql2 = require('mysql2');
const app = express()
const port = 3000
app.use(express.json())


const connection = mysql2.createConnection({
     host: "localhost",
     port: 3306,
     user: 'devMohamed',
     password: 'Strongpassword@1234',
     database: "blogApp"

})

app.post('/signup', (req, res, next) => {
     const { firstName, lastName, email, password } = req.body;
     const query = `
     INSERT INTO
          users(first_name,last_name,email,password)
     VALUES
          (?,?,?,?)
     `
     connection.execute(query, [firstName, lastName, email, password], (err, val) => {
          if (err) {
               res.json({ err })
          } else {
               res.json({ message: "Done", val })
          }

     })

})


app.post('/login', (req, res, next) => {
     const { email, password } = req.body
     const query = `
     SELECT
          email,
          password,
          CONCAT(first_name," ",last_name) as name
          
     FROM
          users
     WHERE
          email=? AND
          password=?  
     `
     connection.execute(query, [email, password], (err, val) => {
          if (err) {
               res.json({ err })
          }
          else {
               if (val.length) {
                    res.json({ message: "Login Successfully!", user: val })
               }
               else {
                    res.json({ message: "user not found!" })
               }
          }


     })

})


connection.connect((err) => {
     if (err) {
          console.log("Connection Faild!", err);
     }
     else {
          console.log("Connection Successfully");

     }

})




app.listen(port, () => {
     console.log(`Server started on port ${port}`)
});




