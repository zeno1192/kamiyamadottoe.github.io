const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },   // 投稿内容
    createdAt: { type: Date, default: Date.now } // 作成日時
});

module.exports = mongoose.model('Post', postSchema);
