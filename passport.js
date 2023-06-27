const passport = require("passport");
const LocalStrategy = require("passport-local");

module.exports = (app) => {
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async function (username, password, cb) {
        // Este código sólo se llama si username y password están definidos.
        console.log("[LocalStrategy] Username:", username); // To-Do: Borrar este `console.log` luego de hacer pruebas.
        console.log("[LocalStrategy] Password:", password); // To-Do: Borrar este `console.log` luego de hacer pruebas.
        // Completar código...
      },
    ),
  );

  passport.serializeUser((user, done) => {
    console.log("[Passport] Serialize User");
    // Completar código...
  });

  passport.deserializeUser(async (id, done) => {
    console.log("[Passport] Deserialize User");
    // Completar código...
  });
};
