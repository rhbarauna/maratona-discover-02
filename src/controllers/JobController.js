const Utils = require('../utils');
const repository = require('./../repositories/jobRepository');
const { user } = require('../repositories/profileRepository');

const viewsPath =`${__dirname}/../views`

const validateInput = (name, hours, total) => {
  if(name.trim() == "" || hours.trim() == "" || hours.trim() == "") {
    throw new Error('Preencha todos os campos');
  }
}

const JobController = {
  get(req, res) {
    res.render(`${viewsPath}/job.ejs`)
  },
  find(req, res){
    let job = repository.find(req.params.id);

    if(!job) {
      throw new Error('Job não encontrado');
    }
    console.log(job);
    const formattedBudget = Utils.formatCurrency(job.budget);
    job = {
      id: job.id,
      name: job.name,
      "daily-hours": job.dailyHours,
      "total-hours": job.totalHours,
      "created-at": job.createdAt,
      "total-value": formattedBudget
    };
console.log(job);
    res.render(`${viewsPath}/job-edit.ejs`, {job});
  },
  create(req, res) {
    const name = req.body.name;
    const dailyHours = req.body['daily-hours'];
    const totalHours = req.body['total-hours'];
    //validar os dados de entrada
    try{
      validateInput(name, dailyHours, totalHours);

      const job = {
        name,
        dailyHours: Number(dailyHours),
        totalHours: Number(totalHours),
        budget: totalHours * user.valuePerHour,
        dueDate:Date.now().addDays(totalHours/dailyhours),
        status: 'in-progress'
      };

      repository.create(job);
      res.redirect('/');
    }catch(err) {
      console.error(err.message);
      res.render(`${viewsPath}/job.ejs`, {error: err.message});
    }
  }
}

module.exports = JobController;