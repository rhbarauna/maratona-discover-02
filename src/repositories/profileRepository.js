let profile = {
  name: 'Rhenato',
  avatar: 'https://github.com/rhbarauna.png',
  valuePerHour: 1875,
  salary:300000,
  hoursPerDay:8,
  daysPerWeek:5,
  vacationWeeksPerYear:4
}

module.exports = {
  find() {
    return profile;
  },
  update(updatedProfile) {
    profile = updatedProfile;
  }
};