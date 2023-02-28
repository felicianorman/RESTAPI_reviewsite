const { sequelize } = require("./config");
const { companies } = require("../data/company");

const seedCompaniesDb = async () => {
  try {
    //DROP table if exist
    await sequelize.query(`DROP TABLE IF EXISTS company;`);
    await sequelize.query(`DROP TABLE IF EXISTS city;`);
    await sequelize.query(`DROP TABLE IF EXISTS role;`);
    await sequelize.query(`DROP TABLE IF EXISTS user;`);
    await sequelize.query(`DROP TABLE IF EXISTS review;`);

    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            email TEXT
        )`),
      await sequelize.query(`
            CREATE TABLE IF NOT EXISTS city (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cityname TEXT
            )`),
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS company (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            adress TEXT,
            fk_city_id TEXT ,
            FOREIGN KEY(fk_city_id) REFERENCES city(id)
        )`),
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS role (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fk_user_role_id TEXT,
            FOREIGN KEY(fk_user_role_id) REFERENCES user(id)
        )`),
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS review (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fk_user_id TEXT,
            fk_company_id TEXT,
            title TEXT,
            description TEXT,
            rating INTEGER,
            FOREIGN KEY(fk_company_id) REFERENCES company(id),
            FOREIGN KEY(fk_user_id) REFERENCES user(id)

        )`);

    await sequelize.query(
      `INSERT INTO city (cityname) VALUES('Stockholm', 'Gothenburg', 'Halmstad')`
    );

    await sequelize.query(
      `INSERT INTO company (name, adress, city) VALUES('Sax och Fön', 'Drottninggatan 105', (SELECT id FROM city WHERE cityname = 'Stockholm')),
       INSERT INTO company (name, adress, city) VALUES('Hårfin', 'Salonggatan 1', 'Gothenburg', (SELECT id FROM city WHERE cityname = 'Stockholm')),
       INSERT INTO company (name, adress, city) VALUES('Peach Stockholm', 'Vasagatan 12',  (SELECT id FROM city WHERE cityname = 'Stockholm')),
       INSERT INTO company (name, adress, city) VALUES('Snap Frisör', 'Odyssen väg 7', (SELECT id FROM city WHERE cityname = 'Halmstad')),
       INSERT INTO company (name, adress, city) VALUES('Haircare', 'Frisörgatan 102', (SELECT id FROM city WHERE cityname = 'Halmstad')),
       INSERT INTO company (name, adress, city) VALUES('Barber Shop', 'Drakvägen 1', (SELECT id FROM city WHERE cityname = 'Gothenburg')),
       INSERT INTO company (name, adress, city) VALUES('Håret, 'Mjällgatan 93', (SELECT id FROM city WHERE cityname = 'Stockholm' )),
       INSERT INTO company (name, adress, city) VALUES('Kungsholmens Frisör', (SELECT id FROM city WHERE cityname = 'Stockholm')),
       INSERT INTO company (name, adress, city) VALUES('Hair Lady', 'Odengatan 23', (SELECT id FROM city WHERE cityname = 'Stockholm'))`);

    // await sequelize.query(
    //    `INSERT INTO company (name, adress, city) VALUES('Sax och Fön', 'Drottninggatan 105', (SELECT id FROM city WHERE cityname = 'Stockholm')),
    //     INSERT INTO company (name, adress, city) VALUES('Hårfin', 'Salonggatan 1', 'Gothenburg', (SELECT id FROM city WHERE cityname = 'Stockholm')),
    //     INSERT INTO company (name, adress, city) VALUES('Peach Stockholm', 'Vasagatan 12',  (SELECT id FROM city WHERE cityname = 'Stockholm')),
    //     INSERT INTO company (name, adress, city) VALUES('Snap Frisör', 'Odyssen väg 7', (SELECT id FROM city WHERE cityname = 'Halmstad')),
    //     INSERT INTO company (name, adress, city) VALUES('Haircare', 'Frisörgatan 102', (SELECT id FROM city WHERE cityname = 'Halmstad')),
    //     INSERT INTO company (name, adress, city) VALUES('Barber Shop', 'Drakvägen 1', (SELECT id FROM city WHERE cityname = 'Gothenburg')),
    //     INSERT INTO company (name, adress, city) VALUES('Håret, 'Mjällgatan 93', (SELECT id FROM city WHERE cityname = 'Stockholm' )),
    //     INSERT INTO company (name, adress, city) VALUES('Kungsholmens Frisör', (SELECT id FROM city WHERE cityname = 'Stockholm')),
    //     INSERT INTO company (name, adress, city) VALUES('Hair Lady', 'Odengatan 23', (SELECT id FROM city WHERE cityname = 'Stockholm'))`);
  } catch (error) {}
};

seedCompaniesDb();
