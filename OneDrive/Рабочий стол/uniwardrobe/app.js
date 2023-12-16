const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/checkout', (req, res) => {
    // Извлеките данные о заказе из req.body
    const orderData = req.body;

    // Сохраните данные в базе данных

    // Отправьте подтверждение клиенту (или обработайте по-другому)
    res.send('Заказ успешно принят!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});



