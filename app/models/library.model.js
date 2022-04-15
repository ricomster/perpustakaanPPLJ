module.exports = (sequelize, Sequelize) => {
  const Library = sequelize.define("library", {
    isbn:{
      type: Sequelize.STRING,
      primaryKey: true
    },
    judul:{
      type: Sequelize.STRING
    },
    jumlahKetersediaan:{
      type: Sequelize.INTEGER
    },
    pengarang:{
      type: Sequelize.STRING
    },
    penerbit:{
      type: Sequelize.STRING
    },
    tahunTerbit:{
      type: Sequelize.DATEONLY
    },
    kategori:{
      type: Sequelize.STRING
    }
  });

  return Library;
};
