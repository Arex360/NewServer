/* 
This API is used to get Trap image

firestore

*/


const express = require("express");
const getImage = require("../firebase/getImage");
const router = express.Router();
router.get("/getTrapImage/:trapID", async (req, res) => {
  const { trapID } = req.params;
  const snapshot = await getImage({ trapID });
  res.sendFile(snapshot);
});
module.exports = router;
