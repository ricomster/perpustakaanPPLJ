const db = require("../models");
// const ROLES = db.ROLES;
const Klien = db.klien;

checkDuplicateEmail = async (req, res, next) => {
  try {

    // Email
    let klien = await Klien.findOne({
      where: {
        email: req.body.email
      },
    });

    if (klien) {
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: "Failed! Role does not exist = " + req.body.roles[i]
//         });
//         return;
//       }
//     }
//   }
  
//   next();
// };

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;
