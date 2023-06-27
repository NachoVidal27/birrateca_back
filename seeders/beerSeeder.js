const { faker } = require("@faker-js/faker");
const Beer = require("../models/Beer");

faker.locale = "es";

module.exports = async () => {
  const beers = [];
  for (let i = 0; i <= Number(process.env.TOTAL_USERS); i++) {
    const memberId = faker.datatype.number(650);
    const style = faker.lorem.words(2);
    const description = faker.lorem.words(50);
    const ingredients = faker.lorem.words(10);
    const abv = `${faker.datatype.number(12)}%`;
    const photo = faker.lorem.words(2);
    const beer = new Beer({
      style: style,
      description: description,
      ingredients: ingredients,
      abv: abv,
      photo: photo,
      brewDate: "10/10/1998",
      memberId: memberId,
    });
    beers.push(beer);
  }
  await Beer.insertMany(beers);
  console.log("[Database] Se corrió el seeder de Beers.");
};
