module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "#D0b0ruberuku",
  DB: "perpustakaandb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
