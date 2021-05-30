const Database = require('./../db/config');

module.exports = {
  async find() {
    const db = await Database();
    const profile = await db.get(`SELECT * FROM profile`);
    await db.close();
    return {
      name: profile.name,
      avatar: profile.avatar,
      valuePerHour: profile.value_per_hour,
      monthlyBudget: profile.monthly_budget,
      hoursPerDay: profile.hours_per_day,
      daysPerWeek: profile.days_per_week,
      vacationPerYear: profile.vacation_per_year
    };
  },
  async update(updatedProfile) {
    const db = await Database();
    await db.run(`UPDATE profile SET 
      name = "${updatedProfile.name}",
      avatar = "${updatedProfile.avatar}",
      value_per_hour = ${updatedProfile.valuePerHour},
      monthly_budget = ${updatedProfile.monthlyBudget},
      hours_per_day = ${updatedProfile.hoursPerDay},
      days_per_week = ${updatedProfile.daysPerWeek},
      vacation_per_year = ${updatedProfile.vacationPerYear}
    `);
    await db.close();
  }
};