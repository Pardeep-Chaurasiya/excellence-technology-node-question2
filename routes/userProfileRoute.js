const express = require("express");
const UserController = require("../controller/userController");

const router = express.Router();
router.get("/getdata", UserController.getData);
router.get("/getaverageage", UserController.getAverage);
router.get("/insertuser", UserController.insertData);
router.get("/deleteuser", UserController.deleteUser);

module.exports = router;
