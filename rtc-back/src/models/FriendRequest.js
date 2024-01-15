
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/connection.js';
import User from './User.js';

export class FriendRequest extends Model { }

FriendRequest.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    fromUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'uuid'
        }
    },
    toUserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'uuid'
        }
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
        allowNull: false,
        defaultValue: 'PENDING'
    }
}, {
    sequelize,
    modelName: 'friend_request'
});

export default FriendRequest;
