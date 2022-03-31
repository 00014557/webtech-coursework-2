const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email:{
      type: String,
      required: true
  },
  password: {
      type: String,
      required: true
  },
  age:{
      type: Number,
      required: true
  },
  posts: [
      {
        postId: {
          type: Schema.Types.ObjectId,
          ref: 'Post',
          required: true
        }
      }
    ]
});



module.exports = mongoose.model('User', userSchema);
