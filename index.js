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

app.patch('/update/:id', (req, res) => {
     const { id } = req.params
     const { firstName, lastName, password } = req.body
     if (!firstName || !lastName || !password) {
          return res.status(400).json({ message: 'firstName, lastName, and password are required' });
     }
     const query = `
          UPDATE users
            SET first_name=?, last_name=?, password=?
            WHERE id=?
     
     `
     connection.execute(query, [firstName, lastName, password, id], (err, val) => {
          if (err) {
               res.status(500).json({ message: 'Internal server error' })
          }
          else {
               if (val.affectedRows) {
                    res.status(200).json({ message: 'User updated successfully' })
               }
               else {
                    res.status(404).json({ message: 'User not found' })
               }
          }

     })


})

app.get('/profile/:id', (req, res) => {
     const { id } = req.params;
     const query = `
        SELECT
            id,
            CONCAT(first_name, " ", last_name) AS name,
            date_of_birth,
            FLOOR(DATEDIFF(NOW(), date_of_birth) / 365.25) AS age_in_years
        FROM
            users
        WHERE
            id=?
    `;

     connection.execute(query, [id], (err, val) => {
          if (err) {
               console.error('Database error:', err);
               return res.status(500).json({ message: 'Internal server error' });
          }

          if (val.length === 0) {
               return res.status(404).json({ message: 'User not found' });
          }

          res.status(200).json({ user: val[0] });
     });
});


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




