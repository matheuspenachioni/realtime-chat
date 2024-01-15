
import { User } from '../models/User.js';
import { FriendRequest } from '../models/FriendRequest.js';
import { Friendship } from '../models/Friendship.js';

export const friendshipService = {
    getFriends: async (userId) => {
        try {
            const friendships = await Friendship.findAll({
                where: { userId },
                include: [{
                    model: User,
                    as: 'friend',
                    attributes: ['uuid', 'username', 'displayName', 'status', 'customStatus', 'profilePhoto']
                }]
            });

            const friends = friendships.map(friendship => friendship.friend);

            return { status: 200, message: "Lista de amigos obtida com sucesso", data: friends };
        } catch (error) {
            console.error("ERRO: Erro ao obter lista de amigos:", error);
            return { status: 500, message: "Erro interno do servidor" };
        }
    },
    sendFriendRequest: async (fromUserId, toUsername) => {
        try {
            const toUser = await User.findOne({
                where: { username: toUsername }
            });

            if (!toUser) {
                return { status: 404, message: "O usuário não foi encontrado. Verifique se o nome está correto", data: null };
            }

            const toUserId = toUser.uuid;

            const existingFriendship = await Friendship.findOne({
                where: {
                    userId: fromUserId,
                    friendId: toUserId,
                },
            });

            if (existingFriendship) {
                return { status: 400, message: "Ei! Você já é amigo desse usuário" };
            }

            const request = await FriendRequest.create({ fromUserId, toUserId });
            return { status: 201, message: "Solicitação de amizade enviada!", data: request };
        } catch (error) {
            console.error("Erro ao enviar solicitação de amizade:", error);
            return { status: 500, message: "Erro interno do servidor" };
        }
    },
    acceptFriendRequest: async (requestId, toUserId) => {
        try {
            const request = await FriendRequest.findOne({
                where: {
                    uuid: requestId,
                    toUserId,
                    status: 'PENDING'
                }
            });

            if (!request) {
                return { status: 404, message: "A solicitação não foi encontrada" };
            }

            await Friendship.create({ userId: request.fromUserId, friendId: request.toUserId });
            await Friendship.create({ userId: request.toUserId, friendId: request.fromUserId });
            await request.update({ status: 'ACCEPTED' });

            return { status: 200, message: "Solicitação de amizade aceita" };
        } catch (error) {
            console.error("Erro ao aceitar solicitação de amizade:", error);
            return { status: 500, message: "Erro interno do servidor", };
        }
    },
    rejectFriendRequest: async (requestId, toUserId) => {
        try {
            const updatedRequest = await FriendRequest.update({ status: 'REJECTED' }, {
                where: {
                    uuid: requestId,
                    toUserId,
                    status: 'PENDING'
                }
            });

            if (!updatedRequest[0]) {
                return { status: 404, message: "A solicitação não foi encontrada" };
            }

            return { status: 200, message: "Solicitação de Amizade rejeitada com sucesso" };
        } catch (error) {
            console.error("ERRO: Erro ao rejeitar solicitação! ", error);
            return { status: 500, message: "Erro interno do servidor" };
        }
    },
    cancelFriendRequest: async (requestId, fromUserId) => {
        try {
            const canceledRequest = await FriendRequest.findOne({
                where: {
                    uuid: requestId,
                    fromUserId,
                    status: 'PENDING'
                }
            });

            if (!canceledRequest) {
                return { status: 404, message: "A solicitação não foi encontrada" };
            }

            await canceledRequest.destroy();

            return { status: 200, message: "Solicitação de Amizade cancelada com sucesso" };
        } catch (error) {
            console.error("ERRO: Erro ao cancelar solicitação de amizade:", error);
            return { status: 500, message: "Erro interno do servidor" };
        }
    },
    getPendingRequests: async (userId) => {
        try {
            const sentRequests = await FriendRequest.findAll({
                where: {
                    fromUserId: userId,
                    status: 'PENDING'
                },
                include: [{
                    model: User,
                    as: 'toUser',
                    attributes: ['uuid', 'username', 'email', 'profilePhoto']
                }]
            });

            const receivedRequests = await FriendRequest.findAll({
                where: {
                    toUserId: userId,
                    status: 'PENDING'
                },
                include: [{
                    model: User,
                    as: 'fromUser',
                    attributes: ['uuid', 'username', 'email', 'profilePhoto']
                }]
            });

            const pendingRequests = {
                sentRequests,
                receivedRequests
            };

            return { status: 200, message: "Solicitações pendentes recuperadas", data: pendingRequests };
        } catch (error) {
            console.error("Erro ao listar solicitações pendentes:", error);
            return { status: 500, message: "Erro interno do servidor" };
        }
    },
};
