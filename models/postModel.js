const mongoose =  require('mongoose');

const postSchema = mongoose.Schema({
    location: String,
    caption: String,
    file: String,
    name: String,
    userPic: String,
    userId:String,
    likes: { 
        type: [String], 
        default: []
    },
    comments: { 
        type: [Object], 
        default: [] 
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
