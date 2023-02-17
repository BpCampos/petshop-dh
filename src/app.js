// Importações
const express = require('express');
const path = require('path');
const methodOverride = require('method-override')
const homeRouter = require('./routes/homeRouter');
const adminRouter = require('./routes/adminRouter');
const userRouter = require('./routes/userRouter');
const session = require('express-session')
const loggedUserData = require('./middleware/loggedUserData')
const cookies = require('cookie-parser')

//Variaveis
const app = express();
const port = 3000;

//Configurações / Middlewares
app.set('view engine', 'ejs');
app.set("views", path.resolve("src", "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve("src", "public")));
app.use(methodOverride('_method'))
app.use(session({
    secret: "Warning self destruction",
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());
app.use(loggedUserData);




//Rotas
app.use(homeRouter);
app.use(adminRouter);
app.use(userRouter);

app.listen(port, () => console.log(`Servidor funcionando na porta ${port}`))
// npm run dev -> nodemon | npm start -> node