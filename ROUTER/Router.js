const Postmethod = require("../Controls/Postmethod")

const router = require("express").Router()

router.route("/postmethod").post(Postmethod);


module.exports = router