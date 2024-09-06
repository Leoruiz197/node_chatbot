const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const body = req.body;

    // Verifica se é uma callback_query do Telegram
    if (body.callback_query) {
        const callbackData = body.callback_query.data;
        const chatId = body.callback_query.message.chat.id;
        const callbackId = body.callback_query.id;

        // Responde à callback_query para evitar reiniciar o bot
        res.json({
            method: "answerCallbackQuery",
            callback_query_id: callbackId
        });

        // Enviar resposta de mensagem com base no callback_data
        if (callbackData === 'opcao_1') {
            // Envia uma mensagem para o chat com a opção escolhida
            res.json({
                method: 'sendMessage',
                chat_id: chatId,
                text: "Você escolheu a Opção 1!"
            });
        } else if (callbackData === 'opcao_2') {
            // Envia uma mensagem para o chat com a opção escolhida
            res.json({
                method: 'sendMessage',
                chat_id: chatId,
                text: "Você escolheu a Opção 2!"
            });
        } else {
            res.json({
                method: 'sendMessage',
                chat_id: chatId,
                text: "Opção desconhecida."
            });
        }
    } else {
        // Caso não seja uma callback_query, retorna o esperado pelo Dialogflow
        const queryResult = body.queryResult;
        res.json({
            fulfillmentText: `Você disse: ${queryResult.queryText}`
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
