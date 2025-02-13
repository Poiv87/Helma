const express = require('express');
const webController = require('../controllers/controller.js');
const serviceController = require('../controllers/services_controller.js');
const router = express.Router();

// Index web
router.get('/', webController.homePage);
router.get('/about', webController.aboutPage);
router.post('/sing_in', webController.signinPagePost);
router.get('/sign_in', webController.singPage);
router.post('/login', webController.login);
router.get('/admin', webController.admin);
router.get('/profile', webController.profilePage);
router.post('/finyish', webController.profilePagePost);
router.post('/update', webController.change);
router.delete('/:id', webController.deleted);
router.get('/later', webController.valentain);
router.get('/quyze', webController.starting);
router.get('/nexting', webController.nexting);
router.get('/firsting', webController.firsting);
router.get('/meoo', webController.meoo);
router.get('/formom', webController.formom);



// Services
router.get('/services/araiesh', serviceController.araieshPage);
router.get('/services/nakhon', serviceController.nakhonPage);
router.get('/services/mo', serviceController.moPage);
router.post('/submit_reserving', serviceController.reservePost);
router.get('/ubfoeseor66EBetbrtb66tbtb6r', serviceController.reserved);
router.get('/try_again', serviceController.error);

module.exports = router;
