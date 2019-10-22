require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swagController');
const authController = require('./controllers/authController');
const cartController = require('./controllers/cartController');
const searchController = require('./controllers/searchController');

const app = express();

const {SESSION_SECRET, SERVER_PORT} = process.env;

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14
        }
    })
)

app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.get('/api/swag', swagController.read);
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);
app.get('/api/users', authController.getUsers);
app.post('/api/cart/checkout', cartController.checkout);
app.post('/api/cart/:id', cartController.add);
app.delete('/api/cart/:id', cartController.deleteThing);
app.get('/api/search', searchController.search);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}.`));