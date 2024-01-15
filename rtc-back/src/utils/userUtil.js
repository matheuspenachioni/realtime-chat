
import { User } from '../models/User.js';

export const userExists = async (username, email) => {
    try {
        const userByUsername = await User.findOne({ where: { username } });
        if (userByUsername) {
            return {
                exists: true,
                message: 'O username informado já está em uso'
            };
        }

        const userByEmail = await User.findOne({ where: { email } });
        if (userByEmail) {
            return {
                exists: true,
                message: 'O e-mail informado já está em uso'
            };
        }

        return {
            exists: false,
            message: "O username e o e-mail informados estão livres para uso"
        };
    } catch (error) {
        return {
            exists: false,
            message: 'Falha ao verificar username e e-mail'
        };
    }
};
