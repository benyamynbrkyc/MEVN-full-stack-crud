const express = require('express');
const postRoutes = new express.Router();
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

// require Post model in our routes module
let Post = require('./post.model');

// defined get data (index or listing) route
postRoutes.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      res.json(err);
    } else {
      res.json(posts);
    }
  });
});

// defined edit route
postRoutes.get('/edit/:id', (req, res) => {
  let id = req.params.id;
  Post.findById(id, (err, post) => {
    if (err) {
      res.json(err);
    } else {
      res.json(post);
    }
  });
});

// defined update route
postRoutes.post('/update/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (!post) {
      res.status(404).send('data is not found');
    } else {
      post.title = req.body.title;
      post.body = req.body.body;
      post
        .save()
        .then(() => {
          res.json('Update complete');
        })
        .catch(() => {
          res.status(400).send('Unable to update the database');
        });
    }
  });
});

// defined delete | remove | destroy route
postRoutes.delete('/delete/:id', (req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id }, (err) => {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

let upload = multer({ dest: 'uploads/' });

// defined store route
postRoutes.post('/add', upload.any(), async (req, res, next) => {
  if (req.files) {
    req.files.forEach((file) => {
      let dateOfUpload = new Date().toUTCString();
      let filename = dateOfUpload + '-' + file.originalname;

      fs.rename(file.path, 'uploads/' + filename, async (err) => {
        if (err) throw err;

        let post = new Post({
          title: req.body.title,
          body: req.body.body,
          img: filename,
        });

        // post.img = await sharp(post.img.buffer).toBuffer();

        console.log('image\n', post.img);
        console.log('\n\nasdibgasubdaidas\n\n', post);

        await post.save((err, result) => {
          if (err) throw err;
          res.json(result);
        });
      });
    });
  }
});

module.exports = postRoutes;
