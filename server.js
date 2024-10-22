require('dotenv').config();  // .envファイルから環境変数を読み込む
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');  // MongoDBのモデルを読み込む

const app = express();
const port = process.env.PORT || 3000;

// MongoDB接続設定
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// 静的ファイルの提供 (フロントエンドを含む)
app.use(express.static('public'));
app.use(express.json());  // JSONをパースするミドルウェア

// 投稿を取得するAPIエンドポイント
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });  // 作成日時で並び替え
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 新しい投稿を作成するAPIエンドポイント
app.post('/api/posts', async (req, res) => {
    const post = new Post({
        content: req.body.content,
        createdAt: new Date()
    });
    try {
        const newPost = await post.save();  // MongoDBに保存
        res.status(201).json(newPost);  // 成功した場合は新しい投稿を返す
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const cors = require('cors');
app.use(cors());
