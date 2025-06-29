const connection = require('../../DB/DBConnection')

module.exports.signup = (req, res, next) => {
     const { firstName, lastName, email, password, dateOfBirth } = req.body;

     if (!firstName || !lastName || !email || !password || !dateOfBirth) {
          return res.status(400).json({
               success: false,
               message: "All fields are required: firstName, lastName, email, password, dateOfBirth.",
          });
     }
     const checkQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`;
     connection.execute(checkQuery, [email], (err, results) => {
          if (err) {
               console.error("Database error during email check:", err);
               return res.status(500).json({
                    success: false,
                    message: "An internal error occurred. Please try again later.",
               });
          }

          if (results.length > 0) {

               return res.status(409).json({
                    success: false,
                    message: "A user with this email already exists.",
               });
          }

          const insertQuery = `
               INSERT INTO
                    users(first_name, last_name, email, password, date_of_birth)
               VALUES
                    (?, ?, ?, ?, ?)
        `;

          connection.execute(
               insertQuery,
               [firstName, lastName, email, password, dateOfBirth],
               (err, val) => {
                    if (err) {
                         console.error("Database error during signup:", err);
                         return res.status(500).json({
                              success: false,
                              message: "An error occurred while creating your account. Please try again later.",
                         });
                    }

                    return res.status(201).json({
                         success: true,
                         message: "Account created successfully.",
                         userId: val.insertId,
                    });
               }
          );
     });
};



module.exports.login = (req, res, next) => {
     const { email, password } = req.body;

     if (!email || !password) {
          return res.status(400).json({
               success: false,
               message: "Email and password are required.",
          });
     }

     const query = `
          SELECT
               id,
               email,
               CONCAT(first_name, " ", last_name) AS name
          FROM
               users
          WHERE
               email = ? AND password = ?
          LIMIT 1
    `;

     connection.execute(query, [email, password], (err, results) => {
          if (err) {
               console.error("Database error during login:", err);
               return res.status(500).json({
                    success: false,
                    message: "An internal error occurred. Please try again later.",
               });
          }

          if (results.length === 0) {
               return res.status(401).json({
                    success: false,
                    message: "Invalid email or password.",
               });
          }

          const user = results[0];

          return res.status(200).json({
               success: true,
               message: "Login successful.",
               user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
               },
          });
     });
};


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