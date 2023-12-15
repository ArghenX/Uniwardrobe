const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/checkout', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;

    // Здесь ваш код для обработки информации о заказе
    // Например, вы можете сохранить информацию о заказе в базе данных

    res.send('Заказ оформлен! Спасибо, ' + name + '!');
});

app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
