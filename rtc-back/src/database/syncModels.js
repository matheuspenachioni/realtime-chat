
import FriendRequest from '../models/FriendRequest.js';
import Friendship from '../models/Friendship.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

export const syncModels = async () => {
    try {
        await User.sync();
        console.log("SUCESSO: A tabela User foi criada com sucesso!");

        await FriendRequest.sync();
        console.log("SUCESSO: A tabela FriendRequest foi criada com sucesso!");

        await Friendship.sync();
        console.log("SUCESSO: A tabela Friendship foi criada com sucesso!");

        await Message.sync();
        console.log("SUCESSO: A tabela Message foi criada com sucesso!");
    } catch (error) {
        console.log("ERRO: Erro ao sincronizar os modelos! ", error);
    }
}

export default syncModels;
