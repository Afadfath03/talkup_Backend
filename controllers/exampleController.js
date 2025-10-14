const { Op } = require("sequelize");
const { Example } = require("../models");

const createExample = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newExample = await Example.create({ name, description });

    res.status(201).json({
      status: "Success",
      message: "Success create new example",
      isSuccess: true,
      data: {
        example: newExample,
      },
    });
  } catch (error) {
    console.log(error.name);

    if (error.name === "SequelizeValidationError") {
      const errorMessage = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "Failed",
        message: errorMessage[0],
        isSuccess: false,
        data: null,
      });
    } else if (error.name === "SequelizeDatabaseError") {
      return res.status(400).json({
        status: "Failed",
        message: error.message || "Database error",
        isSuccess: false,
        data: null,
      });
    }

    res.status(500).json({
      status: "Failed",
      message: "An unexpected error occurred",
      isSuccess: false,
      data: null,
    });
  }
};

const getAllExample = async (req, res) => {
  try {
    const { name, limit = 10, page = 1 } = req.query;
    const condition = {};

    if (name) condition.name = { [Op.iLike]: `%${name}%` };

    const offset = (page - 1) * limit;

    const examples = await Example.findAndCountAll({
      where: condition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    const totalData = examples.count;
    const totalPages = Math.ceil(totalData / limit);

    res.status(200).json({
      status: "Success",
      message: "Success get all examples",
      isSuccess: true,
      data: {
        totalData,
        totalPages,
        currentPage: parseInt(page),
        examples: examples.rows,
      },
    });
  } catch (error) {
    console.log(error.name);
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const getExampleById = async (req, res) => {
  const id = req.params.id;

  try {
    const example = await Example.findOne({ where: { id } });

    if (!example) {
      return res.status(404).json({
        status: "Failed",
        message: "Example not found",
        isSuccess: false,
        data: null,
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Success get example",
      isSuccess: true,
      data: { example },
    });
  } catch (error) {
    console.log(error.name);
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const updateExample = async (req, res) => {
  const id = req.params.id;
  const { name, description } = req.body;

  try {
    const example = await Example.findOne({ where: { id } });

    if (!example) {
      return res.status(404).json({
        status: "Failed",
        message: "Example not found",
        isSuccess: false,
        data: null,
      });
    }

    await Example.update({ name, description }, { where: { id } });

    res.status(200).json({
      status: "Success",
      message: "Success update example",
      isSuccess: true,
      data: { id, name, description },
    });
  } catch (error) {
    console.log(error.name);
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

const deleteExample = async (req, res) => {
  const id = req.params.id;

  try {
    const example = await Example.findOne({ where: { id } });

    if (!example) {
      return res.status(404).json({
        status: "Failed",
        message: "Example not found",
        isSuccess: false,
        data: null,
      });
    }

    await Example.destroy({ where: { id } });

    res.status(200).json({
      status: "Success",
      message: "Success delete example",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    console.log(error.name);
    res.status(500).json({
      status: "Failed",
      message: error.message,
      isSuccess: false,
      data: null,
    });
  }
};

module.exports = {
  createExample,
  getAllExample,
  getExampleById,
  updateExample,
  deleteExample,
};
