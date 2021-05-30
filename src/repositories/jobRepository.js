const Database = require('./../db/config');

const JobRepository = {
  async get(){
    const db = await Database();
    const jobs = await db.all(`SELECT * FROM jobs`);
    await db.close();
    return jobs.map(job => ({
      id: job.id,
      name: job.name,
      dueDate: job.due_date,
      dailyHours: job.daily_hours,
      totalHours: job.total_hours,
      budget: job.budget,
      status: job.status
    }));
  },
  async find(jobId) {
    const db = await Database();
    const job = await db.get(`SELECT * FROM jobs WHERE jobs.id = ${jobId}`)
    await db.close();
    
    return {
      id: job.id,
      name: job.name,
      dueDate: job.due_date,
      dailyHours: job.daily_hours,
      totalHours: job.total_hours,
      budget: job.budget,
      status: job.status
    };
  },
  async create(job){
    const now = Date.now();
    const db = await Database();
    await db.run(`INSERT INTO jobs (name, daily_hours, total_hours, budget, status, due_date, created_at, updated_at) VALUES
      ("${job.name}","${job.dailyHours}",${job.totalHours},${job.budget},"${job.status}",${job.dueDate},${now},${now})
    `);
    await db.close();
  },
  async delete(jobId){
    const db = await Database();
    await db.get(`DELETE FROM jobs WHERE jobs.id = ${jobId}`)
    await db.close();
  },
  async update(valuesToUpdate){
    const db = await Database();

    await db.run(`UPDATE jobs SET 
      name = "${valuesToUpdate.name}",
      daily_hours = ${valuesToUpdate.dailyHours},
      total_hours = ${valuesToUpdate.totalHours},
      budget = ${valuesToUpdate.budget},
      status = "${valuesToUpdate.status}",
      due_date = ${valuesToUpdate.dueDate},
      updated_at = ${Date.now()}
      WHERE jobs.id = ${valuesToUpdate.id}
    `);
    await db.close();
  },
}

module.exports = JobRepository;