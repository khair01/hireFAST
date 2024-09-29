import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    // Get the token from the cookie
    const token = req.cookies.token; // Use req.cookies if using cookie-parser
    console.log("token from middleware", token);
    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Attach the decoded user data to the request object
        req.user = decoded; // You can now access req.user in your routes
        next(); // Proceed to the next middleware or route handler
    });
};

export default authMiddleware;