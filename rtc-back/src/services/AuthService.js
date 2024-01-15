
import { User } from '../models/User.js';
import { userExists } from '../utils/userUtil.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'ImTheStorm';

export const authService = {
    login: async (email, password) => {
        try {
            const user = await User.findOne({
                where: { email }
            });

            if (!user) {
                throw new Error("E-mail ou senha incorretos");
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                throw new Error("E-mail ou senha incorretos");
            }

            user.status = user.lastStatus;
            await user.save();

            const token = jwt.sign({
                uuid: user.uuid,
                username: user.username,
                displayName: user.displayName
            }, SECRET_KEY, {
                expiresIn: '5h',
            });

            return { message: "Seja bem-vindo " + user.displayName, token };
        } catch (error) {
            console.error("Erro ao realizar login: ", error);
            throw new Error("Ocorreu uma falha na autenticação");
        }
    },
    register: async (username, email, password, profilePhoto) => {
        try {
            if (!username || !email || !password) {
                throw new Error("Preencha todos os campos");
            }

            const checkExists = await userExists(username, email);
            if (checkExists.exists) {
                throw new Error(checkExists.message);
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            const formattedDisplayName = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

            const user = await User.create({
                username,
                displayName: formattedDisplayName,
                email,
                password: passwordHash,
                profilePhoto,
                status: 'Online',
                lastStatus: 'Online',
                customStatus: "I'm "+ formattedDisplayName +"!",
                aboutMe: "Hello world, I'm a new MathChat user..."
            });

            return {
                message: "Sua conta foi criada!",
                user
            };
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw new Error("Ocorreu uma falha ao criar sua conta");
        }
    },
};
