const express = require('express');
const router =express.Router();
const {getAllposts,getOnepost,createNewpost,deletePost,updatePost}=require("../controler/article");
const checkAuth=require("../middleware/check-auth");
const multer=require("multer");

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+ file.originalname)
    }
});
const upload =multer({dest:"uploads/"});

router.get('/',getAllposts)

router.get('/:postId',getOnepost)

router.post('/',checkAuth,upload.single("coverImage"),createNewpost);

router.delete('/:postId',checkAuth,deletePost)

router.put('/:postId',checkAuth,updatePost)


module.exports=router;
