const vision = require('@google-cloud/vision');
var cors = require('cors');
const express = require('express');
const app = express();
var router = express.Router();
app.use(cors());

const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "crafty-cache-392714",
    "private_key_id": "6b393d4f2d3c641a9cef98533860b3d7cc19bea3",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWktqHI1OB5gGC\nqtsjn5IvNYQOa9qrF69Xbek+cNTgOVr8h4yhlIyZ0OO9RJJqAWBkcxWzZcykuqjP\nJxAM19n/FLDo+skmCN1MUZ1IQIyhfLPEz0mtQ1tpMmzds9pZDwj+x//hZW587a1m\nCF2MI8JTeCLcgi8gwEpyS9ljr4k6L8KkxPsn85Jc0Makf1ul76h1eCiWlhb+QfYb\n6hVrV2VYVFdZ5l6NN50FRlQ8lo4NkmBZvv8Szhp1lM3XFGsp2MdWqHKFjarDSoLs\nOGPdPNaZrBmpf6vJHzLEqo83SOsO2idlIpZgD0/JKMh63wJeaRbDfZBGe77gFt8b\nhbjajCOhAgMBAAECggEAMfnCK/duW7LWZzikEYf45EXym+lC5NZ/YD2ZNZHSAudY\n6bgoaPnQRYMBh/OQpl/rs3madE4he7x91MGkW1lqzJ5lFd5TOyiVYlEf8NQX7QS+\nWfhtkI0/nSDBemGJWXTHA5BRaI3XTgGNgVYxc5JgkFBKzlED6PzgWf6Qg0c/Du3j\neDp/dwAu/n0zUnEcb41RwRf1dcS9MTDoF4OSD5mU8aI4wTh4vZ0ck8l26ENclCCK\n70mkabhW80kr58egDVkgXpFUgccPijjPaygrcTRSiefoTZTVLA/eMZyBSC7Rykf9\nU67CNoy7I0LvamyCSgokNyPY1N43VoMcw3Wbl0WOAQKBgQD2T1PL28bARaYJnMVG\npC1ScZFnanKCKxEWMQA4waEit095aTB1cTlQZQo6gjVBUH00mjRvtfPtMDnHQHB9\nbKq7mTHWquNqchtm79BLUeV1+IoVLBuFyTabSO/NL5eEMzyYCPmDYJ0CvW5NBG8Q\n8wHuIjcxn1iE38he4n7SRXNoXQKBgQDfA+ZSbOs+hg6ILCW07bzyfH5CSK5D9Dql\n0GuUbN746igdNjDpz/QzHkFJu4ywtItCBgn2FP2WREe38p+A+fCiJuTYt1FoR2Iz\niJ+ISVUq/YlK+OCdIRlCIAt7G9Eq3VRxYMm2mTmm8O0ng+w9yabJE/2mJ45cAGZU\nGqoR1o2kFQKBgQDDUhC/Ph8T5adPRBRkeli+YfTOL2lys7gvAtiMKXAgWYEaZEHb\nP9gVWqqLzylwC+XdytL+Kymt02peCUmrDHsvnMIa2xTQGoCEVnO05tKxhE/rjjid\nFPzKk0ImUjEy0nagka1bc0fPHmzTgkqZBDtpnZRrM1M8u0DnjXDISe7EuQKBgQCc\nKlrqdSL2EWGzsVZmL+QT2WGAgOym4SsAWcY7lVE99JpKelweHmTeNt15CEAorQSn\nIxtumpxI0V93TAqtglgi9CFkMFptLy9w7sbn5JIjHI87VLPU1Ayf5VikyIHcBkjP\na/tURk+8uxEWjqarTb3hKIKCC0kA27bMRi+5dgiRUQKBgFZYQwB65gw+Cvh4LJxl\nTyPaX2pbgKfxrEFEZY3tmu37JcKy3bIXDn/UGyqu899Rn5Al8TO6nqv3fzUXIcXL\nMHbZqA2nA/GmhekFwmkXGlXH8OR+UC4dRZq9VBeyhQqc4TdFh4ylz68RU5wTYo1t\njCbPPX+w89mtFLTK8qQ6m8zw\n-----END PRIVATE KEY-----\n",
    "client_email": "automate-buddy@crafty-cache-392714.iam.gserviceaccount.com",
    "client_id": "118434840180566891030",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/automate-buddy%40crafty-cache-392714.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}))

const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email,
    }
};

const client = new vision.ImageAnnotatorClient(CONFIG);

app.get('/api/imageSearch', async function (req, res) {

    const file_path = "landmark_three.jpeg";
    // if(req.files.image != null){
    if(file_path != null){
        let [result] = await client.webDetection(file_path);
        console.log(result.webDetection.pagesWithMatchingImages);
        return res.status(200).send({ 'success': result.webDetection.pagesWithMatchingImages });
    }
    return res.status(404).send({ 'error': 'Please select image' });

});

const detectLandmark = async (file_path) => {

    let [result] = await client.webDetection(file_path);
    console.log(result.webDetection.pagesWithMatchingImages[0]);
}

// detectLandmark("landmark_three.jpeg");


// app.use(fileUpload());
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
// app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.listen(3020, function () {
    console.log('Server is listening on port 3020');
});