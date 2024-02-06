var admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
var serviceAccount = require("./react-firebase-df5f2-firebase-adminsdk-eyopj-85a6769281.json");

const config = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://react-firebase-df5f2-default-rtdb.asia-southeast1.firebasedatabase.app"
};
admin.initializeApp(config);
const auth = admin.auth();
module.exports = auth