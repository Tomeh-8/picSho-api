const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");

const postController = {
    getPosts: async (req, res) => {
        const {createdAt} = req.body;
        try {
            const posts = await Post.find().sort({createdAt: -1});               
            res.status(200).json(posts);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    },

    getPost: async (req, res) => {
        const {id} = req.params;
    try {
        const post = await Post.findById(id); 
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
    },

    createPost: async (req, res) => {
        const { location, caption, file, likes, comments, name, userPic, userId } = req.body;

    const newPost = await new Post({ location, caption, file, likes, comments, name, userPic, userId });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
    },

    updatePost: async (req, res) => {
        const { id } = req.params;
        const { location, caption, file, likes, comments } = req.body;
        try {
            modifiedPost = {location, caption, file, _id: id};
           await Post.findByIdAndUpdate(id, {$set:modifiedPost});
            res.status(201).json(modifiedPost);
        } catch (err) {
            res.status(204).json({ message: err.message })
        }

    },

    deletePost: async (req, res) => {
        const { id } = req.params;

        try {
            const deletedPost = await Post.findByIdAndRemove(id);
            res.status(200).json(deletedPost);
        } catch (err) {
            res.status(204).json({ message: err.message }) 
        }
    },

    likePost: async(req,res) => {
        const {id} = req.params;    
        try {
        const {userId} = req.body;
        const post = await Post.findById(id);
    
        const index = post.likes.findIndex((likeId) => likeId === userId);
        
        if (index === -1) {
          post.likes.push(userId);
        } else {
          post.likes = post.likes.filter((likeId) => likeId !== userId);
        }       
           const modifiedLikes = await Post.findByIdAndUpdate(id, post, { new: true });
            res.status(201).json(modifiedLikes);
        } catch (err) {
            res.status(204).json({ message: err.message })
        }
    },

    commentPost: async(req,res) => {
        const { id } = req.params; 
        try {
            const {comments, name, userPic} = req.body;
            const post = await Post.findById(id);
            post.comments.push({comments, name, userPic});
           
           const modifiedComment = await Post.findByIdAndUpdate(id, post, { new: true });
            res.status(201).json(modifiedComment);
        } catch (err) {
            res.status(204).json({ message: err.message })
        }
    }
}

module.exports = postController;