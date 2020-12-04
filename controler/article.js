const  mongoose  = require('mongoose');
const Post = require('../models/post');
const Comment = require('../models/comment');


const getAllposts=((req,res,next)=>{
    Post.find().exec().then((posts)=>{
        res.send(posts);
    }).catch(err =>{
        res.status(500).json({
            error:err
        })
    })
});


const getOnepost =((req,res,next)=>{
    const id =req.params.postId;

    Post.findById(id).exec().then(post=>{
        if(post){
            Comment.find({postId:id}).select({"name":1,"comment":1,"_id":0}).exec().then(comments=>{
                res.send({post:post,comments:comments});
            })
        }else{
            res.status(404).json({
                message:'No valid Post for the provided ID'
            })
        }
    }).catch(err =>{
        res.status(500).json({
            error:err
        })
    })
});


const createNewpost= ((req,res,next)=>{
    console.log(req.file);
    const post =new Post({
       _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        body: req.body.body,
        image:req.file.path
    });
    post.save().then(result =>{
        console.log(result);
        res.send(result);
    }).catch(err=>{
        res.send({
            error:err
        })
    });
});

const deletePost =((req,res,next)=>{
    const id =req.params.postId;
    Post.remove({_id:id}).exec().then(result=>{
        res.send(result);
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

const updatePost =((req,res,next)=>{
    const id =req.params.postId;
    Post.update({_id:id},{$set:req.body}).exec().then(result =>{
        res.send(result)
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

module.exports={
    getAllposts,
    getOnepost,
    createNewpost,
    deletePost,
    updatePost
}