
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'ImTheStorm';

export const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return res.status(403).json({ message: 'O token não fornecido' });
  }

  const token = bearerHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Erro ao autenticar: ' + err);
      return res.status(500).json({ message: 'Falha ao autenticar token' });
    }

    req.user = decoded;
    next();
  });
};
