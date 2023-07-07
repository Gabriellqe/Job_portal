const router = require("express").Router();
const { createQna } = require("../controllers/qna/qna.controller");

router.post("/create", createQna);

module.exports = router;
