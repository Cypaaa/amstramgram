import { login } from '../services/authService.mjs';

const loginController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const result = await login(username, email, password);
        result.user.password = null;
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export { loginController };
