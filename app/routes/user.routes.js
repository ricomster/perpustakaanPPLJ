const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/library/newbook", controller.newBookLibrary);

  app.post("/api/book/newbook", controller.newBook);

  app.get(
    "/api/library/getlibrary",
    [authJwt.verifyToken],
    controller.getLibrary
  );

  app.put(
    "/api/profile/changeprofile",
    [authJwt.verifyToken],
    controller.changeProfile
  );

  app.post(
    "/api/sirkulasi/pinjambuku",
    [authJwt.verifyToken],
    controller.pinjamBuku
  );

  app.post(
    "/api/sirkulasi/kembalikanbuku",
    [authJwt.verifyToken],
    controller.kembalikanBuku
  );

  app.post(
    "/api/getriwayat",
    [authJwt.verifyToken],
    controller.getRiwayat
  );

  app.put(
    "/api/sirkulasi/perpanjangpeminjaman",
    [authJwt.verifyToken],
    controller.perpanjangPeminjaman
  );

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  // app.get(
  //   "/api/test/admin",
  //   [authJwt.verifyToken, authJwt.isAdmin],
  //   controller.adminBoard
  // );
};
