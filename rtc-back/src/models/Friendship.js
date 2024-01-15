
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/connection.js';
import User from './User.js';

export class Friendship extends Model { }

Friendship.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'uuid'
        }
    },
    friendId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'uuid'
        }
    }
}, {
    sequelize,
    modelName: 'friendship'
});

export default Friendship;
