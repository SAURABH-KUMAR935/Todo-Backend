require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todos';

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/todos', require('./Routers/todos'));

mongoose.connect(MONGODB_URI).then(() => {
    app.listen(PORT, () => {
        console.log("Connected to MongoDB");
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
