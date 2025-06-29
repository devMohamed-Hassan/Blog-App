const connection = require('../../DB/DBConnection')

module.exports.createBlog = (req, res, next) => {
     const { title, body } = req.body
     const { userId } = req.params

     if (!title || !body) {
          return res.status(400).json({ message: 'title and body are required' })
     }

     const query = `
        INSERT INTO blogs (title, body, user_id, created_at, updated_at)
        VALUES (?, ?, ?)
    `

     connection.execute(query, [title, body, userId], (err, result) => {
          if (err) {
               console.error('Database error:', err);
               if (err.errno === 1452) {
                    return res.status(404).json({ message: 'User not found. Cannot create blog for non-existent user.' })
               }
               return res.status(500).json({ message: 'Internal server error' })
          }
          res.status(201).json({
               message: 'Blog created successfully',
               blogId: result.insertId
          });
     });
}

module.exports.updateBlog = (req, res, next) => {
     const { id } = req.params;
     const { title, body } = req.body;

     if (!title || !body) {
          return res.status(400).json({ message: 'title and body are required' });
     }

     const query = `
        UPDATE
          blogs
        SET
          title=?, body=?
        WHERE
          id=?
    `;

     connection.execute(query, [title, body, id], (err, result) => {
          if (err) {
               console.error('Database error:', err);
               return res.status(500).json({ message: 'Internal server error' });
          }

          if (result.affectedRows === 0) {
               return res.status(404).json({ message: 'Blog not found' });
          }

          res.status(200).json({ message: 'Blog updated successfully' });
     });
}

module.exports.getBlogs = (req, res) => {
     const { id } = req.query;

     let query = `
          SELECT
               blog.id AS blog_id,
               blog.title AS title,
               blog.body AS body,
               blog.user_id AS user_id,
               user.id AS user_id,
               CONCAT(user.first_name, " ", user.last_name) AS name,
               FLOOR(DATEDIFF(NOW(), user.date_of_birth) / 365.25) AS age
          FROM
               blogs AS blog
          LEFT JOIN
               users AS user
          ON
               blog.user_id = user.id
    `;

     let params = [];

     if (id) {
          query += ` WHERE blog.id = ?`;
          params.push(id);
     }

     connection.execute(query, params, (err, data) => {
          if (err) {
               console.error('Database error:', err);
               return res.status(500).json({ message: 'Internal server error' });
          }

          if (id && data.length === 0) {
               return res.status(404).json({ message: 'Blog not found' });
          }

          res.status(200).json(id ? { blog: data[0] } : { blogs: data });
     });
}