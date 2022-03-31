const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  workPeriod: {
    type: String,
    required: true
  },
  jobDuty: {
    type: String,
    required: true
  },
  companyOwner: {
    type: String,
    required: true
  },
  companyAddress: {
    type: String,
    required: true
  },
  complain_reasons: {
    type: String,
    required: true
  },
  workType:{
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});



module.exports = mongoose.model('Post', postSchema);
