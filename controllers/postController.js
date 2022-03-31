const Post = require('../models/postModel');

exports.getPosts = async (req, res, next) => {
  try {
      Post.find().populate('userId').exec((err,doc)=>{
      if (err) { return console.error(err); }
      res.render('index/posts', {
        titleName: 'Complaints',
        postList: doc
      });
    })
    
  } catch (error) {
    console.log(error);
    return res.redirect('/')
  }
};


exports.getPostDetail = async (req, res, next) => {
  try {
      Post.find({_id:req.params.id}).populate('userId').exec((err,doc)=>{
      if (err) { return console.error(err); }
      console.log(doc);
      res.render('index/postDetail', {
        titleName: doc.companyName,
        post: doc
      });
    })
    
  } catch (error) {
    console.log(error);
    return res.redirect('/')
  }
};