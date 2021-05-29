const JobRepository = {
  jobs: [],
  get(){
    return this.jobs;
  },
  find(job_id){
    return this.jobs.find(job => job.id == job_id);
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
    this.jobs = this.jobs.filter(job => job.id != job_id);
  },
  update(valuesToUpdate){
    const index = this.jobs.find(job => job.id == valuesToUpdate.id);
    let job = {
      ...this.jobs[index],
      name        : valuesToUpdate.name, 
      dailyHours  : valuesToUpdate.dailyHours,
      totalHours  : valuesToUpdate.totalHours,
      budget      : valuesToUpdate.budget,
      updatedAt   : valuesToUpdate.dueDate,
      dueDate     : valuesToUpdate.dueDate,
      status      : valuesToUpdate.status
    }

    this.jobs[index] = job;
  },
}

module.exports = JobRepository;