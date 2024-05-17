/**
*@Author Nishant Tiwari
*Implementation of JWKS controller
*
**/
const fs = require("fs");
const jose = require("node-jose");
const ksUtility = require('../keystore/keystore.utility');

const addPubKey = async (req, res, next) => {
	if (!req.body.certificate || !req.body.certificate_type) {
		return res.status(400).send("Invalid Request Body");
	  }
	  try {
		let keyStore = await ksUtility.getKeystore();
		keyStore
		  .add(req.body.certificate, req.body.certificate_type)
		  .then((key) => {
			if (key) {
			  fs.writeFileSync(
				"keys.json",
				JSON.stringify(keyStore.toJSON(true), null, "  ")
			  );
			}
			return res.send(key);
		  })
		  .catch((err) => {
			return res.status(500).send(err.message);
		  });
	  } catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	  }
};

const verifyJWT = (req, res, next) => {
	if (!req.query.token) {
		return res.status(400).send("Invalid Request Body");
	  }
	
	  try {
		jose.JWS.createVerify(keyStore)
		  .verify(req.query.token)
		  .then((result) => {
			console.log("RESULT >>", result.payload.toString("utf8"));
			return res.send(result);
		  })
		  .catch((err) => {
			return res.status(500).send(err.message);
		  });
	  } catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	  }
};

const getKeyByKid = (req, res, next) => {
	if (!req.query.kid) {
		return res.status(400).send("Invalid Request Body");
	  }
	
	  try {
		let key = keyStore.get(req.query.kid);
		console.log("RESULT >>", key);
		return res.send(key.toJSON(true));
	  } catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	  }
};

module.exports = {addPubKey,getKeyByKid,verifyJWT};
