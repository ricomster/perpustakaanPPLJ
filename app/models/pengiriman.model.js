module.exports = (sequelize, Sequelize) => {
    const Pengiriman = sequelize.define("pengiriman", {
      noResi:{
        type: Sequelize.STRING,
        primaryKey: true
      },
      idPeminjaman:{
        type: Sequelize.INTEGER
      },
      jasaEkspedisi:{
        type: Sequelize.STRING
      }
    });
  
    return Pengiriman;
  };
  