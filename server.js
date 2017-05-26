const express = require('express');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./config/db');
const router = require('./config/router');
const AuthController = require('./middlewares/auth.controller.js');
const app = express();

app.use('/doc', express.static('./doc'));
db.sync();
app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(AuthController.authValidator());
router(app);
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Run to port ${port}`));
