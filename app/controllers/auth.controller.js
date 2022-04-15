const db = require("../models");
const config = require("../config/auth.config");
const Klien = db.klien;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    await Klien.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      nama: req.body.nama,
      alamat: req.body.alamat,
      asalInstitusi: req.body.asalInstitusi,
      telepon: req.body.telepon,
    });
    res.send({ message: "User registered successfully!" });
    // if (req.body.roles) {
    //   const roles = await Role.findAll({
    //     where: {
    //       name: {
    //         [Op.or]: req.body.roles,
    //       },
    //     },
    //   });

    //   const result = user.setRoles(roles);
    //   if (result) res.send({ message: "User registered successfully!" });
    // } else {
    //   // user has role = 1
    //   const result = user.setRoles([1]);
    //   if (result) res.send({ message: "User registered successfully!" });
    // }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const klien = await Klien.findOne({
      where: {
        email: req.body.email,
      }
    });

    if (!klien) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      klien.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: klien.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    // let authorities = [];
    // const roles = await user.getRoles();
    // for (let i = 0; i < roles.length; i++) {
    //   authorities.push("ROLE_" + roles[i].name.toUpperCase());
    // }

    req.session.token = token;

    return res.status(200).send({
      id: klien.id,
      email: klien.email,
      nama: klien.nama,
      alamat: klien.alamat,
      asalInstitusi: klien.asalInstitusi,
      telepon: klien.telepon
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
};
