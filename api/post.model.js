const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define collection and schema for Post
let Post = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    pathToImg: {
      // ../../api/
      type: String,
      required: true
    },
    imgName: {
      type: String,
      required: true
    },
    img: mongoose.ObjectId,
    dateUploaded: {
      type: String,
      required: true
    }
  },
  {
    collection: 'articles'
  }
);

module.exports = mongoose.model('Post', Post);
