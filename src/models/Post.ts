import mongoose from "mongoose";

const PostSchema = mongoose.model('Post', new mongoose.Schema({
        author: String,
        place: String,
        description: String,
        hashtags: String,
        image: String,
        likes: {
            type: Number,
            default: 0,
        }
    }, {
        timestamps: true, //vai criar em cada campo de dados um campo para marcar o createat and updatedat
}));

export default PostSchema;