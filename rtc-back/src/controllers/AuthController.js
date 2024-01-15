
import { authService } from '../services/AuthService.js';

//Realiza a autenticação de um usuário já cadastrado no banco de dados
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await authService.login(
            email, password
        );

        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

//Realiza o cadastro de um usuário no banco de dados
export const register = async (req, res) => {
    try {
        const { username, email, password, profilePhoto } = req.body;

        const result = await authService.register(
            username, email, password, profilePhoto
        );

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};