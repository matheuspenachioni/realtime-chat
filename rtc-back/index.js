import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//Database
import { syncModels } from './src/database/syncModels.js';
syncModels();
import { associationModels } from './src/database/associationModels.js';
associationModels();
//Util
import { verifyToken } from './src/utils/jwtUtil.js';
//Controllers
import { login, register } from './src/controllers/AuthController.js';
import { getUserInfo, updateStatusAndCustomStatus, updateUser } from './src/controllers/UserController.js';
import { getFriends, sendFriendRequest, getPendingRequests, acceptFriendRequest, rejectFriendRequest, cancelFriendRequest } from './src/controllers/FriendshipController.js';
//Socket
import { Server } from 'socket.io';
import http from 'http';
import Message from './src/models/Message.js';
import { Op } from 'sequelize';

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, { cors: corsOptions, maxHttpBufferSize: 1e8 })

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`);

    socket.on('getMessages', async ({ userId, otherUserId }) => { 
        console.log(`userId: ${userId} e otherUserId: ${otherUserId}`)

        const messages = await Message.findAll({
            where: {
                [Op.or]: [
                    { senderId: userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: userId },
                ],
            },
            order: [['createdAt', 'ASC']],
        });
        io.to(socket.id).emit(`messages`, messages);
    });
    socket.on('sendMessage', async ({ content, attachment, receiverId, senderId }) => {
        try {
            const message = await Message.create({
                content,
                attachment,
                senderId,
                receiverId,
            });
            io.emit(`newMessage`, message);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }); 
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = 3000;
serverHttp.listen(PORT, () => {
    console.log(`Server is running in ${PORT}...`);
});

//Auth
app.post('/login', login);
app.post('/register', register);
//User
app.get('/user-info/:uuid', verifyToken, getUserInfo);
app.patch('/update-user', verifyToken, updateUser);
app.patch('/update-status', verifyToken, updateStatusAndCustomStatus);
//Friendship
app.get('/friends', verifyToken, getFriends);
app.post('/send-friend-request', verifyToken, sendFriendRequest);
app.get('/pending-requests', verifyToken, getPendingRequests);
app.post('/accept-friend-request/:requestId', verifyToken, acceptFriendRequest);
app.post('/reject-friend-request/:requestId', verifyToken, rejectFriendRequest);
app.post('/cancel-friend-request/:requestId', verifyToken, cancelFriendRequest);