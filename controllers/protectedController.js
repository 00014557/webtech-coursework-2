const Post = require('../models/postModel')

exports.getAddComplaints = (req, res) => {
    res.render('protectedPages/postForm', {
      titleName: 'Add Complaints'
    });
};

exports.postEdit = async (req, res) => {
  try {
    const {
      description,
      workType,
      complain_reasons,
      companyAddress,
      companyOwner,
      jobDuty,
      workPeriod,
      companyName,
      id
    } = req.body;
  
    console.log(id,req.user._id.toString());

    const post = await Post.findById(id);
    if (post.userId.toString() !== req.user._id.toString()) {
     return res.redirect('/');
    }
    post.description = description;
    post.workType = workType;
    post.complain_reasons = complain_reasons;
    post.companyAddress = companyAddress;
    post.companyOwner = companyOwner; 
    post.jobDuty = jobDuty;
    post.workPeriod = workPeriod;
    post.companyName = companyName;

    await post.save()
    res.redirect('/protected/posts');
  } catch (error) {
     console.log(error);
     return res.redirect('/');
  }
}
  

exports.editPost = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Post.findById(id).populate("userId").exec((err,doc)=>{
      if(!doc){
        return res.redirect('/');
     }
     res.render('protectedPages/editForm', {
      titleName: 'Edit Post',
      post: doc
    })
    })
  } catch (error) {
    console.log(error);
    return res.redirect('/');    
  }
    
};


exports.getPosts = async (req, res, next) => {
  try {
     await Post.find({userId:req.user._id}).populate('userId').exec((err,doc)=>{
      if(!doc){
        return res.redirect('/login');
     }

      if (err) { return console.error(err); }
      res.render('protectedPages/postList', {
        titleName: 'My posts',
        postList: doc
      });
    })
    
  } catch (error) {
    console.log(error);
    return res.redirect('/')
  }
};


exports.postAddComplaints = async(req, res) => {
  try {
    const {
      description,
      workType,
      complain_reasons,
      companyAddress,
      companyOwner,
      jobDuty,
      workPeriod,
      companyName,
    } = req.body;
  
    const userId    = req.session.user._id;
    
    const post = new Post({
      description,
      workType,
      complain_reasons,
      companyAddress,
      companyOwner,
      jobDuty,
      workPeriod,
      companyName,
      userId
    })
    await post.save()
    return res.redirect("/protected/posts");
  } catch (error) {
    res.redirect("/protected/addComplaint");
    console.log(error);
  }
}  


   

exports.deletePost = async(req, res)=>{
 try {
  const id = req.body.postId;
  await Post.findByIdAndRemove(id)
  return res.redirect("/protected/posts");

 } catch (error) {
   console.log(error);
   return res.redirect("/protected/posts");
 }
}