const express = require("express");
const router = express.Router();
const User = require("../model/user");
const controller = require("../controller/user");


router.post("/", controller.addUser);
router.get("/", controller.getAllUser);
router.get("/:id", controller.getByIdUser);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);


module.exports = router;
