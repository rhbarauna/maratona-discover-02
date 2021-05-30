let profile = {
  name: 'Rhenato',
  avatar: 'https://github.com/rhbarauna.png',
  valuePerHour: 5000,
  salary:0,
  hoursPerDay:0,
  daysPerWeek:0,
  vacationWeeksPerYear:0
}

module.exports = {
  find() {
    return profile;
  },
  update(updatedProfile) {
    profile = updatedProfile;
  }
};