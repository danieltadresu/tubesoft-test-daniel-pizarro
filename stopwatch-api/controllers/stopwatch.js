const Stopwatch = require("../models/stopwatch");

exports.get = async (req, res, next) => {
  try {
    const data = await Stopwatch.findAll({
      attributes: ["id", "time", "createdAt", "updatedAt"],
    });
    res.status(200).json({
      code: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong in the server.",
    });
  }
};

exports.add = async (req, res, next) => {
  try {
    const data = await Stopwatch.create({
      time: req.body.time,
    });
    res.status(200).json({
      code: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong in the server.",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    Stopwatch.destroy({
      where: {},
      truncate: true
    })
    res.status(200).json({
      code: 200,
      message: "Delete all data",
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Something went wrong in the server.",
    });
  }
};
