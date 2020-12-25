require('dotenv').config()
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");
const { executePuppeteer } = require('./executePuppeteer')
const { config } = require('./firebaseConfig')
// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
firebase.initializeApp(config);

const rookies = require('./rookies').rookies2020Draft




console.log('config', config)



executePuppeteer(rookies)
    .then((currentRecord) => {
        console.log('currentRecord', currentRecord)
        // // const savedDoc = await db.collection('manual-scrape-dates').add({
        // //     date: ,
        // //     teams: currentRecord
        // // });

        // console.log('savedDoc', savedDoc)

    }).catch((err) => {
        console.log('err', err)
    })
