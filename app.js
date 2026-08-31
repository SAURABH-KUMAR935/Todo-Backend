require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todos';
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

// Session configuration
app.use(session({
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: isProduction,                 // true in production (HTTPS required), false for local http dev
        sameSite: isProduction ? 'none' : 'lax', // 'none' needed for cross-site (different Vercel subdomains) in prod
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/auth', require('./Routers/auth'));

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