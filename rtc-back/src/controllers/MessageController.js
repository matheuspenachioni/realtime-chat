
import { Message } from '../models/Message.js';
import { Op } from 'sequelize';

//Envia uma mensagem de um usuário para outro
export const sendMessage = async (req, res) => {
  try {
    const { content, attachment, receiverId } = req.body;
    const senderId = req.user.uuid;

    const message = await Message.create({
      content, 
      attachment,
      senderId,
      receiverId,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({
      message: 'Falha ao enviar mensagem',
    });
  }
};

//Recupera as mensagens entre o usuário "João" e o usuário "Pedro"
export const getMessages = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const { otherUserId } = req.params;

    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: otherUserId },
          { senderId: otherUserId, receiverId: userId },
        ],
      },
      order: [['createdAt', 'ASC']],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Erro ao obter mensagens:', error);
    res.status(500).json({
      message: 'Falha ao obter mensagens',
    });
  }
};
