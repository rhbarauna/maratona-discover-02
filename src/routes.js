const express = require('express');
const router = express.Router();
const IndexController = require('./controllers/IndexController');
const JobController = require('./controllers/JobController');
const profileRepository = require('./repositories/profileRepository');

const viewsPath =`${__dirname}/views`

router.get('/', IndexController.get);
router.get('/job', JobController.get);
router.post('/job', JobController.create);
router.get('/job/edit/:id', JobController.find);
router.get('/profile', (req, res) => res.render(`${viewsPath}/profile.ejs`, { profile: profileRepository.profile}));
router.get('/index', (req, res) => res.redirect('/'));

module.exports = router;