const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv")
dotenv.config();


const app = express();

//Use the path module to set a static path
app.use(express.static(path.join(__dirname, "client")))

app.use(bodyParser.json())

const publicVapidKey = 'BGmG1JXYpIOss7GWLoppCF0wJqAVZ2AAlujZjEe3tDBupZRHD3QSOqaHkDPYZhm0ydEy6mPBNClr8OhiBs5uaJI';
const privateVapidKey= process.env.PRIVATE_KEYS;

webPush.setVapidDetails("mailto:cyclomoney@test.com", publicVapidKey, privateVapidKey)


// create a route 
app.post('/subscribe', (request, response) => {
    // To get pushSubscription Object
    const subscription = request.body;

    // Send status 201 - resource created
    response.status(201).json({});

    // create payload 
    const payload = JSON.stringify({title : 'Push test'})
  
    // pass object into send notification 
    webPush.sendNotification(subscription, payload).catch(err => console.error(err))
})

const PORT = 7000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))