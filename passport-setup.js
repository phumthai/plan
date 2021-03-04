const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth2').Strategy;
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});

// passport.use(new GoogleStrategy({
//     clientID:process.env.GOOGLE_CLIENT_ID,
//     clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL:process.env.GOOGLE_CALLBACK_URL,
//     passReqToCallback:true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     console.log(profile)
//     return done(null, profile);
//   }
// ));

passport.use('provider', new OAuth2Strategy({
  authorizationURL: 'https://oauth.cmu.ac.th/v1/Authorize.aspx',
  tokenURL: 'https://oauth.cmu.ac.th/v1/GetToken.aspx',
  clientID: 'HjJEVEw20FJykvS2KEqNjJB6pVQK5wpUGQrU0PgD',
  clientSecret: 'PFcZNE8Fjf9xBvD8UPsa0X6Es11Ge7b6yX8QGNuU',
  callbackURL: 'http://localhost:5500/callback'
},
function(request,accessToken, refreshToken, profile, done) {
  User.findOrCreate( function(err, user) {
    done(err, user);
  });
  return done(null, profile);
}
));