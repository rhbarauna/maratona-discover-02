const express = require('express');
const router = require('./routes');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public')); //adicionar conteúde com acesso public
app.use(router);//criar rotas

app.listen(3001, () => console.log('rodando'));