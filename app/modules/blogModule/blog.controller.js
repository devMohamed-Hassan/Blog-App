const express = require('express');
const { createBlog, updateBlog, getBlogs } = require('./blog.service');
const router = express.Router()

router.post('/create-blog/:userId', createBlog);

router.patch('/update-blog/:id', updateBlog);

router.get('/get-blogs', getBlogs);

module.exports = router;