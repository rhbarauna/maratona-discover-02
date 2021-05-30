const Utils = require('../Utils');
const JobRepository = require('../repositories/JobRepository');
const ProfileRepository = require('../repositories/ProfileRepository');

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
    const profile = ProfileRepository.find();
    let freeHours = profile.hoursPerDay;
    
    const statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    }

    jobs = jobs.map(job => {
      const formattedBudget = Utils.formatCurrency(job.budget);
      const remaintinTimeDescription = remainingTime(job);
      const statusClass = job.status == "done" ? 'done' : 'progress';

      statusCount[statusClass]  += 1;
      freeHours -= job.status == "done" ? 0 : job.dailyHours;

      return {
        id: job.id,
        name: job.name,
        "daily-hours": job.dailyHours,
        "total-hours": job.totalHours,
        "created-at": job.createdAt,
        "remaining-time": remaintinTimeDescription,
        "total-value": formattedBudget,
        "status-class": statusClass,
        "status-description": statusClass == "done" ? 'Encerrado' : 'Em andamento',
      };
    });
    
    

    res.render(`index`, {profile, jobs, counter: statusCount, freeHours})
  }
}