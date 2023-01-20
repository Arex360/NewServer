var admin = require("firebase-admin");
var serviceAccount = require("./smartKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smarttrap-e9766-default-rtdb.firebaseio.com",
});
let database = admin.database()
let firestore = admin.firestore()
module.exports= {database,firestore}
