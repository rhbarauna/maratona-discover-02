const Utils = require('../utils');
const findJob = (jobId) => {
  const jobIndex = JobRepository.jobs.findIndex(jb => jb.id == jobId);
  return {job:JobRepository.jobs[jobIndex], index: jobIndex};
}

const JobRepository = {
  jobs: [],
  get(){
    return this.jobs;
  },
  find(id){
    const {job} = findJob(id);
    return job;
  },
  create(job){
    const jobId = this.jobs[this.jobs.length-1]?.id + 1 || 1;
    const now = Date.now();

    this.jobs.push({
      id: jobId,
      ...job,
      createdAt: now,
      updatedAt: now
    });
  },
  delete(job_id){
    const {index} = findJob(job_id);
    this.jobs.splice(index, 1);
  },
  update(valuesToUpdate){
    const {job, index} = findJob(valuesToUpdate.id);

    job.name        = valuesToUpdate.name; 
    job.dailyHours  = valuesToUpdate.dailyHours;
    job.totalHours  = valuesToUpdate.totalHours;
    job.budget      = valuesToUpdate.budget;
    job.updatedAt   = valuesToUpdate.dueDate;
    job.dueDate     = valuesToUpdate.dueDate;
    job.status      = valuesToUpdate.status;

    this.jobs[index] = job;
  },
}

module.exports = JobRepository;