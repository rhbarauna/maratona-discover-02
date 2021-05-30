const ProfileRepository = require('../repositories/ProfileRepository');
const Utils = require('../Utils');

function validate(data) {
  const {name, avatar, monthlyBudget, hoursPerDay, daysPerWeek, vacationPerYear} = data;
  if(data.name.trim() == "" || avatar.trim() == ""){
    throw new Error('Favor preencher nome e link da foto');
  }
  if(hoursPerDay <= 0 || monthlyBudget <= 0 || daysPerWeek <= 0 || vacationPerYear <= 0){
    throw new Error('Todos os campos do planejamento deve ser maior que 0');
  }
};

module.exports = {
  async get(_, res) {
    const profile = await ProfileRepository.find();
    const formattedValuePerHour = Utils.formatCurrency(profile.valuePerHour);
    res.render(`profile`, {profile: {...profile, formattedValuePerHour}})
  },
  async update(req, res) {
    //receber os dados
    const rawData = req.body;
    const data = {
      name: rawData.name,
      avatar: rawData.avatar,
      hoursPerDay: Number(rawData["hours-per-day"]),
      monthlyBudget: Number(rawData["monthly-budget"]),
      daysPerWeek: Number(rawData["days-per-week"]),
      vacationPerYear: Number(rawData["vacation-per-year"])
    };
    
    try {
      validate(data);
      const {name, avatar, monthlyBudget, hoursPerDay, daysPerWeek, vacationPerYear} = data;
      
      const totalWeeksWorkedPerYear = 52 - vacationPerYear;
      const totalWorkedDays = totalWeeksWorkedPerYear * daysPerWeek;
      const totalWorkedHours = totalWorkedDays * hoursPerDay;
      const workedHoursPerMonth = totalWorkedHours / 12;
      const valuePerHour = (monthlyBudget/workedHoursPerMonth).toFixed(2).replace('.', '');
      
      let profile ={
        name, 
        avatar,
        valuePerHour: Number(valuePerHour),
        monthlyBudget,
        hoursPerDay,
        daysPerWeek,
        vacationPerYear
      }
      ProfileRepository.update(profile);
      
      res.redirect('/profile');
    }
    catch(err) {
      console.error(err.message);
      const profile = await ProfileRepository.find();
      res.render(`profile`, {profile, error: err.message})
    }
    
    //calcular o valor baseado nos campos recebidos
  }
}