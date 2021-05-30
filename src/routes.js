const express = require('express');
const router = express.Router();
const IndexController = require('./controllers/IndexController');
const JobController = require('./controllers/JobController');
const ProfileController = require('./controllers/ProfileController');

router.get('/', IndexController.get);
router.get('/job', JobController.get);
router.post('/job', JobController.create);
router.get('/job/edit/:id', JobController.find);
router.post('/job/edit/:id', JobController.update);
router.post('/job/delete/:id', JobController.delete);
router.get('/profile', ProfileController.get);
router.post('/profile', ProfileController.update);
router.get('/index', (req, res) => res.redirect('/'));

module.exports = router;