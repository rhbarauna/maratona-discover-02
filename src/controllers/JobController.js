const Utils = require('../utils');
const repository = require('./../repositories/jobRepository');
const { profile } = require('../repositories/profileRepository');

const viewsPath =`${__dirname}/../views`

const validateInput = (name, hours, total) => {
  if(name.trim() == "" || hours.trim() == "" || hours.trim() == "") {
    throw new Error('Preencha todos os campos');
  }
}

const buildJob = (req) => {
    const name = req.body.name;
    const dailyHours = req.body['daily-hours'];
    const totalHours = req.body['total-hours'];
    validateInput(name, dailyHours, totalHours);
    
    return {
      name,
      dailyHours: Number(dailyHours),
      totalHours: Number(totalHours),
      budget: totalHours * profile.valuePerHour * 100,
      dueDate: Utils.addDays(totalHours/dailyHours).getTime(),
      status: 'in-progress'
    };
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

    const formattedBudget = Utils.formatCurrency(job.budget);
    job = {
      id: job.id,
      name: job.name,
      "daily-hours": job.dailyHours,
      "total-hours": job.totalHours,
      "created-at": job.createdAt,
      "total-value": formattedBudget
    };

    res.render(`${viewsPath}/job-edit.ejs`, {job});
  },
  create(req, res) {
    try{
      const job = buildJob(req);
      repository.create(job);
      res.redirect('/');
    }catch(err) {
      console.error(err.message);
      res.render(`${viewsPath}/job.ejs`, {error: err.message});
    }
  },
  update(req, res) {
    const id = req.params.id;
    try{
      const job = buildJob(req);
      repository.update({id,...job});
      res.redirect('/');
    }catch(err) {
      console.error(err.message);
      res.render(`${viewsPath}/job.ejs`, {error: err.message});
    }
  },
  delete(req, res) {
    const id = req.params.id;
    try{
      repository.delete(id);
      res.redirect('/');
    }catch(err) {
      console.error(err.message);
      res.render(`${viewsPath}/job.ejs`, {error: err.message});
    }
  },
}

module.exports = JobController;