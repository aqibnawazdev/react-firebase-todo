/**
 * Import function triggers from their respective submodules:
 *
 * 
*
* See a full list of supported triggers at https://firebase.google.com/docs/functions
*/
const { onDocumentWritten } = require("firebase-functions/v2/firestore");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { onRequest } = require("firebase-functions/v2/https");
const { onCall } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const auth = require('./firebase.config.js');
const { getDocs, collection } = require("firebase/firestore");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.getTaskList = onSchedule('every 2 minutes', async (event) => {
    const collectionRef = collection(db, "todo");
    try {
        const docSnap = await getDoc(docRef);
    } catch (err) {
        console.log(err);
    }
})
