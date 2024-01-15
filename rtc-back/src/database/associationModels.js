
import { sequelize } from '../database/connection.js';
import FriendRequest from '../models/FriendRequest.js';
import Friendship from '../models/Friendship.js';
import Message from '../models/Message.js';
import User from '../models/User.js';

export const associationModels = async () => {
    try {
        User.hasMany(Friendship, { foreignKey: 'userId', as: 'userFriendships' });
        Friendship.belongsTo(User, { foreignKey: 'userId', as: 'user' });

        User.hasMany(Friendship, { foreignKey: 'friendId', as: 'userFriends' });
        Friendship.belongsTo(User, { foreignKey: 'friendId', as: 'friend' });

        User.hasMany(FriendRequest, { foreignKey: 'fromUserId', as: 'sentFriendRequests' });
        User.hasMany(FriendRequest, { foreignKey: 'toUserId', as: 'receivedFriendRequests' });

        FriendRequest.belongsTo(User, { foreignKey: 'fromUserId', as: 'fromUser' });
        FriendRequest.belongsTo(User, { foreignKey: 'toUserId', as: 'toUser' });

        User.hasMany(Message, { foreignKey: 'senderId', as: 'sentMessages' });
        User.hasMany(Message, { foreignKey: 'receiverId', as: 'receivedMessages' });

        //Recriar todas as tabelas
        //await sequelize.sync({ force: true });
    } catch (error) {
        console.error("ERRO: Erro ao associar os modelos! ", error);
    }
}

export default associationModels;
