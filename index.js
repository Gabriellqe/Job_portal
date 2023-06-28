const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const corsOptions = require("./config/corsOptions");
const sessionOptions = require("./config/sessionOptions");

const userRoute = require("./routes/user.routes");
const tutCatRoute = require("./routes/tutCat.routes");
const docCatRoute = require("./routes/docCat.routes");
const blogCatRoute = require("./routes/blogCat.routes");
const videoCatRoute = require("./routes/videoCat.routes");
const courseCatRoute = require("./routes/courseCat.routes");
const tutorialRoute = require("./routes/tutorial.routes");
const newsLetterRoute = require("./routes/newsLetter.routes");
const reviewRoute = require("./routes/review.routes");
const contactRoute = require("./routes/contact.routes");
const videoRoute = require("./routes/video.routes");
const blogRoute = require("./routes/blog.routes");
const docRoute = require("./routes/doc.routes");
const courseRoute = require("./routes/course.routes");
const googleRouter = require("./routes/google.routes");
const notFoundMiddleware = require("./middlewares/not-found.js");
const errorHandlerMiddleware = require("./middlewares/errorHandler.js");
const passportSetup = require("./utils/passport");

//Config
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./.env",
  });
}

//Routes
app.get("/", (req, res) => {
  res.send(`<a href="http://localhost:5000/google">Login with google</a>`);
});
app.use("/api/user", userRoute);
app.use("/api/tutorial/category", tutCatRoute);
app.use("/api/doc/category", docCatRoute);
app.use("/api/blog/category", blogCatRoute);
app.use("/api/video/category", videoCatRoute);
app.use("/api/course/category", courseCatRoute);
app.use("/api/tutorial", tutorialRoute);
app.use("/api/newsletter", newsLetterRoute);
app.use("/api/review", reviewRoute);
app.use("/api/contact", contactRoute);
app.use("/api/video", videoRoute);
app.use("/api/blog", blogRoute);
app.use("/api/doc", docRoute);
app.use("/api/course", courseRoute);

app.use("/", googleRouter);

//Error handling middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
