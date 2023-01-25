const { firestore } = require("./firebase");
const getImage = async ({ trapID }) => {
  const snapshot = await firestore.collection("traps").doc(trapID).get();
  let data = snapshot.data();
  if (data) {
    const { path } = data;
    return path;
  } else {
    return "";
  }
};
module.exports = getImage;
