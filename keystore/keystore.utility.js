const fs = require("fs");
const jose = require("node-jose");

/**
*@Author Nishant Tiwari
*Implementation of JWKS Keystore
*
**/
const createKeystore = async () => {
  if(!await getKeystore()){
    fs.writeFileSync(
      process.env.KEYSTORE_NAME,
      JSON.stringify(jose.JWK.createKeyStore().toJSON(true), null, "  ")
    );

  }
};

const getKeystore = async () => {
  try {
    let data = fs.readFileSync(process.env.KEYSTORE_NAME, { encoding: "utf8" });
    return jose.JWK.asKeyStore(data);
  } catch (err) {
    console.error(err);
    
  }
  return null;
};

module.exports = { createKeystore, getKeystore };
