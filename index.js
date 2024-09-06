const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log(body)
    if (body.callback_query) {
        const callbackData = body.callback_query.data;

        // Verifica o callback_data e dispara intents correspondentes
        if (callbackData === 'opcao_1') {
            res.json({
                fulfillmentText: "Você escolheu a Opção 1!"
            });
        } else if (callbackData === 'opcao_2') {
            res.json({
                fulfillmentText: "Você escolheu a Opção 2!"
            });
        } else {
            res.json({
                fulfillmentText: "Opção desconhecida."
            });
        }
    } else {
        res.json({
            fulfillmentText: "Nenhuma ação tomada."
        });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
