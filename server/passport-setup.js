const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config({ path: '../.env' });
const { postUser } = require('./db/index');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:8081/api/auth/google/callback',
},
(accessToken, refreshToken, profile, done) => {
  //
  // we need to make a way to check if a user is in the database
  //
  // create the user object to add to the database
  const userDetails = {
    username: profile.displayName,
    nameFirst: profile.name.givenName,
    nameLast: profile.name.familyName,
    phoneNumber: '',
    email: profile.emails[0].value,
    imageUrl: profile.photos[0].value,
  };
  // use the postUser help funciton to add the user to the database
  postUser(userDetails);

  done(null, profile);
}));
