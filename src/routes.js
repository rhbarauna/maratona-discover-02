const express = require('express');
const router = express.Router();

const viewsPath =`${__dirname}/views`

const profile = {
  name: 'Rhenato',
  avatar: "https://github.com/rhbarauna.png"
}

router.get('/', (req, res) => res.render(`${viewsPath}/index.ejs`));
router.get('/job', (req, res) => res.render(`${viewsPath}/job.ejs`));
router.get('/job/edit', (req, res) => res.render(`${viewsPath}/job-edit.ejs`));
router.get('/profile', (req, res) => res.render(`${viewsPath}/profile.ejs`, { profile: profile}));
router.get('/index', (req, res) => res.redirect('/'));

module.exports = router;