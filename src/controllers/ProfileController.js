const ProfileRepository = require('../repositories/profileRepository');
const Utils = require('../utils');

function validate(data) {
  const {name, avatar, salary, hoursPerDay, daysPerWeek, vacationWeeksPerYear} = data;
  if(data.name.trim() == "" || avatar.trim() == ""){
    throw new Error('Favor preencher nome e link da foto');
  }
  if(hoursPerDay <= 0 || salary <= 0 || daysPerWeek <= 0 || vacationWeeksPerYear <= 0){
    throw new Error('Todos os campos do planejamento deve ser maior que 0');
  }
};

module.exports = {
  get(_, res) {
    const profile = ProfileRepository.find();
    const formattedValuePerHour = Utils.formatCurrency(profile.valuePerHour);
    res.render(`profile.ejs`, {profile: {...profile, formattedValuePerHour}})
  },
  update(req, res) {
    //receber os dados
    const rawData = req.body;
    const data = {
      name: rawData.name,
      avatar: rawData.avatar,
      hoursPerDay: Number(rawData["hours-per-day"]),
      salary: Number(rawData["monthly-budget"]),
      daysPerWeek: Number(rawData["days-per-week"]),
      vacationWeeksPerYear: Number(rawData["vacation-per-year"])
    };
    
    try {
      validate(data);
      const {name, avatar, salary, hoursPerDay, daysPerWeek, vacationWeeksPerYear} = data;
      
      const totalWeeksWorkedPerYear = 52 - vacationWeeksPerYear;
      const totalWorkedDays = totalWeeksWorkedPerYear * daysPerWeek;
      const totalWorkedHours = totalWorkedDays * hoursPerDay;
      const workedHoursPerMonth = totalWorkedHours / 12;

      const valuePerHour = salary/workedHoursPerMonth;
      
      let profile = ProfileRepository.find();
      profile = {
        ...profile,
        name, 
        avatar,
        valuePerHour,
        salary,
        hoursPerDay,
        daysPerWeek,
        vacationWeeksPerYear
      }
      ProfileRepository.update(profile);
      
      res.redirect('/profile');
    }
    catch(err) {
      console.error(err.message);
      const profile = ProfileRepository.find();
      res.render(`profile.ejs`, {profile, error: err.message})
    }
    
    //calcular o valor baseado nos campos recebidos
  }
}