
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/connection.js';

export class User extends Model { }

const userStatusEnum = ['Online', 'Invisible', 'Idle', 'Do Not Disturb'];

User.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 40]
        }
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [1, 40]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    profilePhoto: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM(...userStatusEnum),
        allowNull: false
    },
    lastStatus: {
        type: DataTypes.ENUM(...userStatusEnum),
        allowNull: false
    },
    customStatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    aboutMe: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: { 
            len: [0, 200]
        }
    }
}, {
    sequelize,
    modelName: 'users'
});

export default User;
