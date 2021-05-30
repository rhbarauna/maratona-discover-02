let jobs = [];
const JobRepository = {
  get(){
    return jobs;
  },
  find(job_id){
    return jobs.find(job => job.id == job_id);
  },
  create(job){
    const jobId = jobs[jobs.length-1]?.id + 1 || 1;
    const now = Date.now();

    jobs.push({
      id: jobId,
      ...job,
      createdAt: now,
      updatedAt: now
    });
  },
  delete(job_id){
    jobs = jobs.filter(job => job.id != job_id);
  },
  update(valuesToUpdate){
    const index = jobs.findIndex(job => job.id == valuesToUpdate.id);
    let job = {
      ...jobs[index],
      name        : valuesToUpdate.name, 
      dailyHours  : valuesToUpdate.dailyHours,
      totalHours  : valuesToUpdate.totalHours,
      budget      : valuesToUpdate.budget,
      updatedAt   : valuesToUpdate.dueDate,
      dueDate     : valuesToUpdate.dueDate,
      status      : valuesToUpdate.status
    }

    jobs[index] = job;
  },
}

module.exports = JobRepository;