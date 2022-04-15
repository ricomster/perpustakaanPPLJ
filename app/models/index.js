const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.library = require("./library.model.js")(sequelize, Sequelize);
db.book = require("./book.model.js")(sequelize, Sequelize);
db.sirkulasi = require("./sirkulasi.model.js")(sequelize, Sequelize);
db.pengiriman = require("./pengiriman.model.js")(sequelize, Sequelize);
db.klien = require("./klien.model.js")(sequelize, Sequelize);

db.library.belongsToMany(db.book, {
  through: "library_book",
  foreignKey: "isbn"
});
db.book.belongsToMany(db.library, {
  through: "library_book",
  foreignKey: "isbn"
});

module.exports = db;
