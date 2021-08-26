const mongoose = require("mongoose");
const User = require("../model/user");

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      const result = await User.find();
      res.json({
        result: result.map((result) => {
          return {
            name: result.name,
            phone: result.phone,
            image: "<link>/" + result.image,
            url: "<link>" + result._id,
          };
        }),
      });
    } catch (error) {
      res.json({
        massage: error,
      });
    }
  },

  getByIdUser: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await User.findById(id);
      res.json({
        result: result,
      });
    } catch (error) {
      res.json({
        massage: error,
      });
    }
  },

  addUser: async (req, res, next) => {
    try {
      const result = await new User({
        name: req.body.name,
        phone: req.body.phone,
        image: req.file.path,
      }).save();
      res.json({
        massage: "insert done !!",
        id: result.id,
        name: result.name,
        phone: result.phone,
        image: "localhost:3000/" + result.image,
      });
    } catch (error) {
      res.json({
        massage: error,
      });
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const result = await User.updateOne(
        { _id: req.params.id },
        { $set: { name: req.body.name, phone: req.body.phone } },
        { useFindAndModify: false }
      );
      res.json({
        massage: "update done!!",
      });
    } catch (error) {
      res.json({
        massage: error,
      });
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const result = await User.findByIdAndRemove(
        { _id: req.params.id },
        { useFindAndModify: false }
      );
      res.json({ massage: "deleted" });
    } catch (error) {
      res.json({
        massage: error,
      });
    }
  },
}; ////end controller
