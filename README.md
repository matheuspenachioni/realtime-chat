<h1 align="center">🧑👧🏼 Math Chat 👧🏻🧑🏾</h1>
<h3 align="center">Um bate-papo em tempo real</h3>

## Sobre
A ideia desse projeto surgiu quando eu estava revisando meus conhecimentos em React, acabei fazendo uma tela baseada na interface do Discord e com algumas mensagens mockadas, mas isso me despertou uma grande vontade de fazer com que isso fosse real, então me desafiei a fazer um projeto baseado nessa plataforma.

## Funcionalidades
- [x] Cadastro de Usuário:
    - Validar se username e e-mail já existem;
    - Cortar imagem de perfil com Croppie;
    - Criptografar a senha;
- [x] Login de Usuário:
    - Por 'nome de usuário e senha' ou 'e-mail e senha';
    - Uso de Json Web Tokens (JWT);
- [x] Sistema de Amizade:
    - Enviar solicitação pelo nome de usuário;
    - Quem recebe pode:
        - Aceitar solicitação de amizade;
        - Rejeitar solicitação de amizade;
    - Quem envia pode:
        - Cancelar solicitação de amizade;
    - Ver solicitações pendentes;
    - Ver todos amigos;
- [x] Chat:
    - Os usuários que já são amigos podem conversar entre si;
    - Cada mensagem pode conter 'apenas texto', 'apenas imagem' ou 'texto e imagem';
    - Uso de socket.io para comunicação em tempo real;

## Conclusão
Encontrei várias barreiras durante o desenvolvimento desse projeto, mas sinto que pude evoluir graças a isso. De todos os problemas, o que achei o mais desafiador foi quando envolvi web sockets para a comunicação em tempo real entre os usuários, eu nunca tinha utilizado essa tecnologia antes, então foi um longo processo de aprendizado e muita 'tentativa e erro' até chegar no resultado desejado. Pretendo continuar e melhorar esse projeto, pois algumas coisas ficaram de fora e ainda tem várias funcionalidades que podem ser implementadas.

## Observações
As imagens dos atributos profilePhoto (User) e attachments (Message) estão sendo salvas em base64 no banco de dados.