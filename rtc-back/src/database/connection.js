
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('mathchat_db', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => {
        console.log('SUCESSO: A conexão com o database foi estabelecida!');
    })
    .catch(error => {
        console.error('ERRO: Erro ao estabelecer conexão! ', error);
    });

export default sequelize;