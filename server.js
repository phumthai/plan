require('dotenv').config()
const express = require('express')
const app = express()
var fs = require('fs')

app.set('view engine','ejs')
app.use('/static', express.static('public'));

app.get('/', (req, res) => res.render('pages/index'))

const port = process.env.PORT || 5500;
app.listen(port , () => console.log('App listening on port ' + port));

app.get('/plan', (req, res) => res.render('pages/plans'))
app.get('/choose', (req, res) => res.render('pages/choosepage'))
app.get('/tutorial', (req,res) => {
    var filePath = "/public/SPlannerTutorial.pdf";
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
})
app.get('/staffTutorial', (req,res) => {
    var filePath = "/public/SPlannerTutorialStaff.pdf";
    fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
})


const axios = require('axios')
const { response } = require('express')
const clientID = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.CALLBACK_URL

// Declare the callback route
app.get('/auth', (req, res) =>{
    res.redirect(`https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}&scope=cmuitaccount.basicinfo&state=xyz`)
})

app.get('/callback', (req,res) => {
    var rescode = req.query.code;
    axios({
        method: 'post',
        url: `https://oauth.cmu.ac.th/v1/GetToken.aspx?code=${rescode}&redirect_uri=${redirectUri}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code`,

    }).then((resp) => {
        access_token = resp.data.access_token
        refresh_token = resp.data.refresh_token
        axios({
            method: 'get',
            url: `https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo`,
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        }).then((respd) => {
            res.render('pages/staffs',{ userData: respd.data });
        })
    })

})
















