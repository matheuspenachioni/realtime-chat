
import User from '../models/User.js';

//Recupera as informações de um usuário
export const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.uuid;
    const user = await User.findOne({
      where: { uuid: userId },
      attributes: ['uuid', 'username', 'displayName', 'email', 'profilePhoto', 'status', 'customStatus', 'aboutMe'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    res.status(500).json({ message: 'Falha ao recuperar informações do usuário' });
  }
};

//Atualiza as informações básicas do usuário
export const updateUser = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const { displayName, email, profilePhoto, customStatus, aboutMe } = req.body;

    console.log(profilePhoto);

    const user = await User.findOne({ where: { uuid: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (displayName && displayName !== user.displayName) {
      user.displayName = displayName;
    }
    if (email && email !== user.email) {
      user.email = email;
    }
    if (profilePhoto && profilePhoto !== user.profilePhoto) {
      user.profilePhoto = profilePhoto;
    }
    if (customStatus && customStatus !== user.customStatus) {
      user.customStatus = customStatus;
    }
    if (aboutMe && aboutMe !== user.aboutMe) {
      user.aboutMe = aboutMe.replace(/\\n/g, '\n');
    }

    await user.save();
    res.json({ message: 'Informações do usuário atualizadas com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar informações do usuário:', error);
    res.status(500).json({ message: 'Falha ao atualizar informações' });
  }
};

//Atualiza o status e o customStatus do usuário
export const updateStatusAndCustomStatus = async (req, res) => {
  try {
    const userId = req.user.uuid;
    const { status, lastStatus, customStatus } = req.body;

    const user = await User.findOne({ where: { uuid: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (status && status !== user.status) {
      user.status = status;
    }

    if(lastStatus && lastStatus !== user.lastStatus) {
      user.lastStatus = lastStatus;
    }

    if (customStatus && customStatus !== user.customStatus) {
      user.customStatus = customStatus;
    }

    await user.save();
    res.json({ message: 'Status atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar status e customStatus do usuário:', error);
    res.status(500).json({ message: 'Falha ao atualizar status' });
  }
};