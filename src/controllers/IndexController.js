const Utils = require('../utils');
const JobRepository = require('../repositories/jobRepository');
const ProfileRepository = require('../repositories/profileRepository');

const getStatus = (jobStatus) => {
  if(jobStatus == "done"){
    return {
      class: 'done',
      description: 'Encerrado'
    }
  }

  return {
    class: 'progress',
    description: 'Em andamento'
  }
}

const remainingTime = (job) => {

  if(job.status == "done") {
    return "Entregue"
  }
  const remainingDays = Utils.remainingDays(job.dueDate);
  if(remainingDays > 0) {
    return `${remainingDays} dias para a entrega`;
  }

  return `${remainingDays} dias de atraso`;
}

module.exports = {
  get(_, res) {
    let jobs = JobRepository.get();
    jobs = jobs.map(job => {
      const formattedBudget = Utils.formatCurrency(job.budget);
      const remaintinTimeDescription = remainingTime(job);
      
      let formattedStatus = getStatus(job.status);
      return {
        id: job.id,
        name: job.name,
        "daily-hours": job.dailyHours,
        "total-hours": job.totalHours,
        "created-at": job.createdAt,
        "remaining-time": remaintinTimeDescription,
        "total-value": formattedBudget,
        "status-class": formattedStatus.class,
        "status-description": formattedStatus.description
      };
    });
    
    const profile = ProfileRepository.find();

    res.render(`index.ejs`, {profile, jobs})
  }
}