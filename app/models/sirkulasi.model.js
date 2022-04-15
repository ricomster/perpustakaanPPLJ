module.exports = (sequelize, Sequelize) => {
    const Sirkulasi = sequelize.define("sirkulasi", {
      email:{
        type: Sequelize.STRING,
      },
      bookId:{
        type: Sequelize.INTEGER
      },
      isbn:{
        type: Sequelize.STRING
      },
      tanggalPeminjaman:{
        type: Sequelize.DATEONLY
      },
      durasi:{
        type: Sequelize.INTEGER
      },
      tanggalPengembalian:{
        type: Sequelize.DATEONLY
      },
      status:{
        type: Sequelize.STRING
      }
    });
  
    return Sirkulasi;
  };
  