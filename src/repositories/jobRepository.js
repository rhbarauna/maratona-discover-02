module.exports = {
  jobs: [],
  get(){
    return this.jobs;
  },
  find(id){
    let jobIndex = this.jobs.findIndex(jb => jb.id == id);
    return this.jobs[jobIndex];
  },
  create(job){
    const jobId = this.jobs[this.jobs.length-1]?.id + 1 || 1;
    this.jobs.push({
      id: jobId,
      ...job,
      createdAt: Date.now()
    });
  },
  delete(job_id){},
  update(job){
    let jobIndex = this.jobs.findIndex(jb => jb.id == job.id);
    jobs[jobIndex] = job;
  },
}