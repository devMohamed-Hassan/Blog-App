const connection = require('../../DB/DBConnection')

module.exports.signup = (req, res, next) => {
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

}

module.exports.login = (req, res, next) => {
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

}
module.exports.update = (req, res) => {
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

}

module.exports.profile = (req, res) => {
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
}

module.exports.search = (req, res, next) => {
     const { searchKey } = req.query;

     if (!searchKey) {
          return res.status(400).json({ message: 'searchKey query parameter is required' });
     }

     const query = `
        SELECT
            id,
            CONCAT(first_name, " ", last_name) AS name,
            email,
            date_of_birth,
            FLOOR(DATEDIFF(NOW(), date_of_birth) / 365.25) AS age
        FROM
            users
        WHERE
            first_name LIKE ? OR
            last_name LIKE ? OR
            email LIKE ?
    `;

     const likeSearchKey = `%${searchKey}%`;

     connection.execute(query, [likeSearchKey, likeSearchKey, likeSearchKey], (err, val) => {
          if (err) {
               console.error('Database error:', err);
               return res.status(500).json({ message: 'Internal server error' });
          }

          res.status(200).json({ results: val });
     });
}