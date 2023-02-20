const { firestore } = require("./firebase");
const postImage = async ({ trapID, path }) => {
  const snapshot = await firestore
    .collection("traps")
    .doc(trapID)
    .set({ path,timestamp: new Date().toString() });
  console.log("post image");
};
module.exports = postImage;
