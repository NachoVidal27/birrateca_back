/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */

const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  for (let i = 0; i <= Number(process.env.TOTAL_USERS); i++) {
    const firstname = faker.name.firstName();
    const user = new User({
      memberId: 8,
      name: firstname,
      phone: "092738492",
      email: slugify(`${firstname}@gmail.com`, {
        replacement: "-",
        lower: true,
        locale: "en",
      }),
      password: await bcrypt.hash("1234", 8),
    });
    users.push(user);
  }
  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
