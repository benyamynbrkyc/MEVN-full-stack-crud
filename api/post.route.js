const express = require('express');
const postRoutes = new express.Router();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const config = require('./db');
const mongoose = require('mongoose');

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
  Post.findByIdAndRemove({ _id: req.params.id }, err => {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

const storage = new GridFsStorage({
  url: config.DB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename =
          new Date().getFullYear() +
          '-' +
          new Date().getDate() +
          '-' +
          (new Date().getMonth() + 1) +
          '-' +
          file.originalname;

        const fileInfo = {
          filename: filename,
          bucketName: 'articleUploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// defined store route
postRoutes.post('/add', upload.any(), async (req, res, next) => {
  let post = new Post({
    title: req.body.title,
    body: req.body.body,
    pathToImg: `../../api/uploads/${req.files[0].filename}`,
    imgName: req.files[0].filename,
    dateUploaded: new Date().toString(),
    img: mongoose.Types.ObjectId(`${req.files[0].id}`)
  });
  await post.save((err, result) => {
    if (err) throw err;

    res.json({
      msg: 'Successfully saved to Database',
      data: { title: req.body.title, body: req.body.body, img: req.files[0] },
      result: result
    });
  });
});

// defining server storage, used for serving files to the client
const serverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getFullYear() +
        '-' +
        new Date().getDate() +
        '-' +
        (new Date().getMonth() + 1) +
        '-' +
        file.originalname
    );
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  )
    cb(null, true);
  else cb('File type is not supported.');
};
const serverUpload = multer({
  storage: serverStorage,
  fileFilter
});

// calls on file selection, saves to file system
postRoutes.post('/upload/image', serverUpload.any(), (req, res) => {
  if (!req.body && !req.files) res.json({ msg: 'Unable to upload!' });
  else res.json({ msg: 'Successfully uploaded', data: req.files });
});

module.exports = postRoutes;
