module.exports = (sequelize, Sequelize) => {
  const Book = sequelize.define("books", {
    isbn:{
      type: Sequelize.STRING
    },
    statusKetersediaan:{
      type: Sequelize.BOOLEAN
    }
  });

  return Book;
};
