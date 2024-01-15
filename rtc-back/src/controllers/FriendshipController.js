
import { friendshipService } from '../services/FriendshipService.js';

//"João" envia uma solicitação de amizade para "Pedro"
export const sendFriendRequest = async (req, res) => {
    try {
        const fromUserId = req.user.uuid;
        const { toUsername } = req.body;

        const result = await friendshipService.sendFriendRequest(fromUserId, toUsername);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
};

//"Pedro" pode aceitar a solicitação de amizade de "João"
export const acceptFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const result = await friendshipService.acceptFriendRequest(requestId, req.user.uuid);

        res.status(result.status).json({
            message: result.message,
        });
    } catch (error) {
        console.error("ERRO: Erro ao aceitar solicitação de amizade! ", error);
        res.status(500).json({
            message: "Falha ao aceitar a solicitação"
        });
    }
};

//"Pedro" pode rejeitar a solicitação de amizade de "João"
export const rejectFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const result = await friendshipService.rejectFriendRequest(requestId, req.user.uuid);

        res.status(result.status).json({
            message: result.message,
        });
    } catch (error) {
        console.error("ERRO: Erro ao rejeitar solicitação de amizade! ", error);
        res.status(500).json({
            message: "Falha ao rejeitar a solicitação"
        });
    }
};

//"João" pode cancelar a solicitação de amizade enviada para "Pedro"
export const cancelFriendRequest = async (req, res) => {
    try {
        const requestId = req.params.requestId;
        const result = await friendshipService.cancelFriendRequest(requestId, req.user.uuid);

        res.status(result.status).json({
            message: result.message,
        });
    } catch (error) {
        console.error("ERRO: Erro ao cancelar solicitação de amizade! ", error);
        res.status(500).json({
            message: "Falha ao cancelar a solicitação"
        });
    }
};

//O usuário pode ver as solicitações enviadas por ele ou enviadas para ele
export const getPendingRequests = async (req, res) => {
    try {
        const userId = req.user.uuid;
        const result = await friendshipService.getPendingRequests(userId);

        res.status(result.status).json({
            message: result.message,
            data: result.data
        });
    } catch (error) {
        console.error("ERRO: Erro ao listar solicitações pendentes! ", error);
        res.status(500).json({
            message: "Falha ao recuperar as solicitações pendentes"
        });
    }
};

//O usuário pode ver todos aqueles que são amigos dele
export const getFriends = async (req, res) => {
    try {
        const userId = req.user.uuid;
        const result = await friendshipService.getFriends(userId);

        res.status(result.status).json({
            message: result.message,
            data: result.data
        });
    } catch (error) {
        console.error("ERRO: Erro ao obter lista de amigos! ", error);
        res.status(500).json({
            message: "Falha ao recuperar a lista de amigos"
        });
    }
};
