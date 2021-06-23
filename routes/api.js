const express = require('express');
const router = express.Router();

const Authentication = require('../controllers/authentication.controller');
const Calorie = require('../controllers/calorie.controller');
const Registration = require('../controllers/registration.controller');

router.post('/login', Authentication.loginAttempt);

router.get('/daily/:username',Calorie.getTodaysCalorieStatus);

router.get('/diet/:username',Calorie.getDiet);

router.post('/daily/calories',Calorie.postDailyCalorie);

router.post('/daily/water',Calorie.postDailyWater);

router.get('/weekly/:username', Calorie.getWeeklyCalorieStatus);

router.post('/profile', Registration.register);

router.post('/profile/details', Registration.addDetails);

router.get('/profile/:username', Authentication.getProfile);

module.exports = router;