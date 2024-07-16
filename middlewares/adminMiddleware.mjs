const adminMiddleware = (err, req, res, next) => {
    if (req.user.is_admin != true) {
        return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
};

export { adminMiddleware };
