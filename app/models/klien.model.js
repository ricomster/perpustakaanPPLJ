module.exports = (sequelize, Sequelize) => {
    const Klien = sequelize.define("klien", {
      email:{
        type: Sequelize.STRING
      },
      password:{
        type: Sequelize.STRING
      },
      nama:{
        type: Sequelize.STRING
      },
      alamat:{
        type: Sequelize.STRING
      },
      asalInstitusi:{
        type: Sequelize.STRING
      },
      telepon:{
        type: Sequelize.STRING
      }
    });
  
    return Klien;
  };
  