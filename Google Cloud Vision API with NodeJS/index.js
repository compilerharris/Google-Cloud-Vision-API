const vision = require('@google-cloud/vision');
var cors = require('cors');
const express = require('express');
const app = express();
var router = express.Router();
app.use(cors());

const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "***",
    "private_key_id": "***",
    "private_key": "***",
    "client_email": "***",
    "client_id": "***",
    "auth_uri": "***",
    "token_uri": "***",
    "auth_provider_x509_cert_url": "***",
    "client_x509_cert_url": "***",
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
