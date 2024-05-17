/**
*@Author Nishant Tiwari
*Implementation of JWKS routes
*
**/
const express = require('express');
const router  = express.Router(); 
const jwkController = require('../controllers/jwk.controller'); 
router.post('/addPubKey', jwkController.addPubKey);  
router.post('/verifyJWT', jwkController.verifyJWT);  
router.post('/getKey', jwkController.getKeyByKid);  
module.exports = router;
