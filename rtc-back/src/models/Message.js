import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/connection.js';
import User from './User.js';

export class Message extends Model {}

Message.init(
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'uuid',
      },
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'uuid',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attachment: {
        type: DataTypes.TEXT,
        allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'messages',
  }
);

export default Message;
