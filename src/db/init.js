const Database = require('./config');

const initDB = async () => {
  const db = await Database();
  //create profile table
  await db.exec(`
    CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      value_per_hour INT,
      monthly_budget INT,
      hours_per_day INT,
      days_per_week INT,
      vacation_per_year INT
    );
  `);
  
  //create jobs table
  await db.exec(`
    CREATE TABLE jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      budget INT,
      status TEXT,
      due_date DATE_TIME,
      created_at DATETIME,
      updated_at DATETIME
    );
  `)

  //populate profile
  await db.run(`INSERT INTO profile (
    name, avatar, value_per_hour, monthly_budget,
    hours_per_day, days_per_week, vacation_per_year) VALUES
    ('Rhenato','https://github.com/rhbarauna.png', 1875, 3000, 8, 5,4);`)

  //populate jobs
  await db.run(`INSERT INTO jobs (
    name, daily_hours, total_hours, budget, status, due_date) VALUES
    (
      "Pizzaria Guloso",
      2,
      40,
      450000,
      "in-progress",
      ${(new Date()).setDate((new Date()).getDate() + 3)}
    )`);

    await db.run(`INSERT INTO jobs (
      name, daily_hours, total_hours, budget, status, due_date) VALUES
      (
        "OneTwo Project",
        2,
        40,
        450000,
        "done",
        ${(new Date()).setDate((new Date()).getDate() + 3)}
      )`);

  await db.close();
};

initDB();