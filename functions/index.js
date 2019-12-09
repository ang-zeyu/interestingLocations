const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const fs = require('fs');

const gccConfig = {
    projectId: 'rnn-maps-test-1559407056507',
    keyFilename:'rnn-maps-test-1559407056507-firebase-adminsdk-q1fsc-62845f3784.json'
}

const gcs = require('@google-cloud/storage')(gccConfig);



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.route = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, 'base64', (err) => { console.log(err); return response.status(500).json({ error: err }) });
        const bucket = gcs.bucket('rnn-maps-test-1559407056507.appspot.com');

        const id = Math.random() * Math.random();
        bucket.upload('/tmp/uploaded-image.jpg', {uploadType:'media', destination: '/places/' + id +'.jpg',
            metadata:{ contentType:'image/jpeg', firebaseStorageDownloadTokens: id }})
    });

    response.send("Hello from Firebase!");
});
