const bcrypt = require("bcrypt");
const User = require("../models/User");
const { api } = require("./helpers");

describe.only("creatinga  new user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const password = await bcrypt.hash("pswd", 10);
    const user = new User({
      name: "usertest",
      password: password,
      memberId: 626,
      phone: "091459408",
      email: "user@test.com",
    });
    await user.save();
  });
  test("words as expected creating a fresh username", async () => {
    const usersDb = await User.find({});
    const usersAtStart = usersDb.map((user) => user.toJSON());
    const newUser = {
      name: "newUserTest",
      password: "1234",
      memberId: 625,
      phone: "632563256",
      email: "newUser@test.com",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersDBAfter = await User.find({});
    const usersAtEnd = usersDBAfter.map((user) => user.toJSON());

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});
