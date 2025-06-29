const users = require('./modules/userModule/user.controller')
const blogs = require('./modules/blogModule/blog.controller')


module.exports.bootstrap = (app, express) => {
     const port = 3000
     app.use(express.json())

     app.use('/users', users)
     app.use('/blogs', blogs)


     app.listen(port, () => {
          console.log(`Server started on port ${port}`)
     });
}