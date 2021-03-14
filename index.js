require('dotenv').config()
const express = require('express')
const app = express()
const cookieSession = require('cookie-session')

app.set('view engine','ejs')
app.use('/static', express.static('public'));

app.get('/', (req, res) => res.render('pages/index'))

const port = process.env.PORT || 5500;
app.listen(port , () => console.log('App listening on port ' + port));

app.get('/plan', (req, res) => res.render('pages/plan'))
app.get('/choose', (req, res) => res.render('pages/choosepage'))


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
    console.log(rescode)
    axios({
        method: 'post',
        url: `https://oauth.cmu.ac.th/v1/GetToken.aspx?code=${rescode}&redirect_uri=${redirectUri}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code`,

    }).then((resp) => {
        console.log(resp.data)
        access_token = resp.data.access_token
        refresh_token = resp.data.refresh_token
        axios({
            method: 'get',
            url: `https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo`,
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        }).then((respd) => {
            console.log(respd.data)
            res.render('pages/staffs',{ userData: respd.data });
        })
    })

})
















