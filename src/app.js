const express = require('express');
const path    = require('path');
const router  = require('./routes');


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true})); //receber o req body
app.use(express.static('public')); //adicionar conteúde com acesso public
app.use(router);//criar rotas

app.listen(3001, () => console.log('rodando'));

const now = new Date();
const JobRepository = require('./repositories/JobRepository');
JobRepository.create({ 
  id:1,
  name:"Pizzaria Guloso",
  dueDate: now.setDate(now.getDate() + 3),
  dailyHours: 2,
  totalHours: 40,
  budget:450000,
  status:"in-progress"
});
JobRepository.create({ 
  id:2,
  name:"OneTwo Project",
  dueDate: now.setDate(now.getDate() + 3),
  dailyHours: 2,
  totalHours: 40,
  budget:450000,
  status:"done"
});