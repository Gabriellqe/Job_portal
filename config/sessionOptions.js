const MongoStore = require("connect-mongo");

const sessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl: 12 * 60 * 60,
  }),
};

module.exports = sessionOptions;
