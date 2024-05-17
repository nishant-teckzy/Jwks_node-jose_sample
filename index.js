const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const jwkroutes = require('./routes/jwk.routes');
const ksUtility = require('./keystore/keystore.utility');

app.use(express.json());
app.use("/",jwkroutes);
app.listen(process.env.PORT, async function (err) {
  if (err) console.error(err);
  
  await ksUtility.createKeystore();
  let ks = await ksUtility.getKeystore();
  console.log("RESULT_KS", ks.toJSON());

  // jose.JWS.createVerify(key).
  //       verify("eyJhbGciOiJSUzM4NCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5NWRlNGRhMC01MjQ5LTRiNWQtOTY2YS0xZjBiNGI2NjZkYTIiLCJzdWIiOiI5NWRlNGRhMC01MjQ5LTRiNWQtOTY2YS0xZjBiNGI2NjZkYTIiLCJhdWQiOiJodHRwczovL3ZlbmRvcnNlcnZpY2VzLmVwaWMuY29tL2ludGVyY29ubmVjdC1hbWN1cnByZC1vYXV0aC8vb2F1dGgyL3Rva2VuIiwianRpIjoiN2Y5YTk1ZGMtMjRjZC00ZGI2LTg1ZTgtMDBhMDBhNTYwY2EwIiwiZXhwIjoxNzE0Mzg2MTIyfQ.Eud2ODkqb_q41CY8SkJR1sXkDTPTK6-PpEqRM5u5p3OjMxHAhg1khza_oBvOTXkA3jvwYczyC8QidhMECtP12Pk9_pATkHOtJX68onpkYU2OOGfOakVUCOetmhgf_gxmFlI-FHwzQLFk26f0pzdFUIQoYU4DAYt9dwXOvXivLxVL8rUC3D422d9IJE5co235tIEAQlWCrf8TJVJm7bvu9jjMsuX4NZFTFH1Q_6HLmTaTt0U3J-1N5xTQTs32GQfstvoiV3D8GnEb_oFEte4QrwdNgHETLGaURhO61j1lEvPJjInisKCOaiM5SkjVacGfVj5OCkgVE5j_eBlqdjo9AA").
  //       then(function(result) {
  //         console.log("RESULT >>",result.payload.toString("utf8"));
  //       });

  console.error("Server listening on PORT", process.env.PORT);
});
