const Utils = require('../Utils');
const repository = require('../repositories/JobRepository');
const ProfileRepository = require('../repositories/ProfileRepository');

const validateInput = (name, hours, total) => {
  if(name.trim() == "" || hours.trim() == "" || hours.trim() == "") {
    throw new Error('Preencha todos os campos');
  }
}

const buildJob = async (req) => {
    const profile = await ProfileRepository.find()
    const name = req.body.name;
    const dailyHours = req.body['daily-hours'];
    const totalHours = req.body['total-hours'];
    validateInput(name, dailyHours, totalHours);
    
    return {
      name,
      dailyHours: Number(dailyHours),
      totalHours: Number(totalHours),
      budget: totalHours * profile.valuePerHour,
      dueDate: Utils.addDays(totalHours/dailyHours).getTime(),
      status: 'in-progress'
    };
}
//TODO - adicionar campo para valor por hora diferenciado por projeto. Criar um checkbox para habilitar o campo e persistir o valor enviado. Caso tenha um valor diferenciado, exibir nos detalhes do projeto mas nao na listagem junto
const JobController = {
  get(req, res) {
    res.render(`job`)
  },
  async find(req, res){
    let job = await repository.find(req.params.id);

    if(!job) {
      return res.send('Job not found');
      // throw new Error('Job não encontrado');
    }

    const formattedBudget = Utils.formatCurrency(job.budget);
    job = {
      id: job.id,
      name: job.name,
      "daily-hours": job.dailyHours,
      "total-hours": job.totalHours,
      "created-at": job.createdAt,
      "total-value": formattedBudget
    };

    res.render(`job-edit`, {job});
  },
  async create(req, res) {
    try{
      const job = await buildJob(req);
      await repository.create(job);
      res.redirect('/');
    }catch(err) {
      console.error(err.message);
      res.render(`job`, {error: err.message});
    }
  },
  async update(req, res) {
    const id = Number(req.params.id);
    try{
      const jobDTO = await buildJob(req);
      await repository.update({id,...jobDTO});
      res.redirect('/');
    }catch(err) {
      console.error(err.message);
      res.render(`job`, {error: err.message});
    }
  },
  async delete(req, res) {
    const id = req.params.id;
    try{
      await repository.delete(id);
      res.redirect('/');
    }catch(err) {
      console.error(err.message);
      res.render(`job`, {error: err.message});
    }
  },
}

module.exports = JobController;