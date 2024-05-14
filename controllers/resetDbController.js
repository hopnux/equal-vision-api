async function resetDb(req, res) {
  await require("../createDatabaseTables")();
  await require("../seeders/adminSeeder")();
  await require("../seeders/userSeeder")();
  await require("../seeders/categorySeeder")();
  await require("../seeders/artistSeeder")();
  await require("../seeders/productSeeder")();
  await require("../seeders/orderSeeder")();

  return res.json("msg: Database reset successful!");
}

module.exports = {
  resetDb,
};
