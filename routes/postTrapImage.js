const express = require("express");
const postimage = require("../firebase/postImage");
const router = express.Router();
router.post("/postTrapImage", async (req, res) => {
  const { trapID, path } = req.body;
  const snapshot = await postimage({ trapID, path });
  res.send("added trap Image");
});
module.exports = router;
