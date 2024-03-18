var express = require('express');
var router = express.Router();
const {mainServices} = require('../services/mainService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/execute", async function (req, res, next){

  //recibir datos
  let inArguments = req.body.inArguments;

  //pasamos un formato json
  let mainServ = new mainServices;
  let contactData = await mainServ.getAttributes(inArguments);

  //enviamos al API para que se inserte en la BD

  let result = await mainServ.sendInfo(contactData);

  res.status(200).json({"error": result.error ,"message": result.message, "data": result.data});

});

router.post("/publish", async function (req, res, next){

  res.status(200).json({"error": false ,"message": "Its working", "data": null});

});

module.exports = router;
