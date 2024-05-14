const { fakerEN_US: faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const { Admin } = require("../models");

module.exports = async () => {
  const admins = [];

  const testPassword = await bcrypt.hash("123", 10);

  const password = await bcrypt.hash("admin", 10);

  admins.push({
    firstname: "Admin",
    lastname: "Test",
    email: "test@test.com",
    password: testPassword,
  });

  for (let i = 1; i < 5; i++) {
    const j = i + 1;
    admins.push({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: "admin" + j + "@ha.dev",
      password: password,
    });
  }

  await Admin.bulkCreate(admins);
  console.log("[Database] Admin seeder executed successfully.");
};
