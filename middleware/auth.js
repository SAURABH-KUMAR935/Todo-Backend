const authMiddleware = (req, res, next) => {
    console.log('Session:', req.session);
    console.log('Session user:', req.session?.user);
    
    if (!req.session || !req.session.user) {
        console.log('Authentication failed - no session user');
        return res.status(401).json({ message: 'Authentication required' });
    }
    
    req.user = req.session.user;
    console.log('User authenticated:', req.user);
    next();
};

module.exports = authMiddleware;
