const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define collection and schema for Post
let Post = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    img: {
      type: Buffer,
      required: true,
    },
  },
  {
    collection: 'posts',
  }
);

module.exports = mongoose.model('Post', Post);
