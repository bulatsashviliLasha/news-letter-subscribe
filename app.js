const express = require("express");
const bodyParser = require("body-parser");
const https = require('https');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public')); // better use just "public"
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html")
});
app.post('/', (req, res) => {
    const FName = req.body.firstName;
    const LName = req.body.lastName;
    const email_address = req.body.email;

    const data = {
        members: [
            {
                email_address,
                status: 'subscribed',
                merge_fields: {
                    FName,
                    LName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us8.api.mailchimp.com/3.0/lists/0ce6d57ade";

    const options = {
        method: "POST",
        auth: "lasha1:dfbf53ddee835e73e2a4a025e5cf095d-us8"
    };

    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data))
        })
    })


    //request.write(jsonData);
    request.end();

})

app.post("/failure", (req, res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || port, () => {
    console.log(`Listening port ${port}`)
})
//API KEY
//dfbf53ddee835e73e2a4a025e5cf095d-us8
//ID
//0ce6d57ade