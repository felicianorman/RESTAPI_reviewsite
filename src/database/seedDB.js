const { sequelize } = require("./config");

const seedCompaniesDb = async () => {
  try {
    //DROP table if exist
    await sequelize.query(`DROP TABLE IF EXISTS city;`);
    await sequelize.query(`DROP TABLE IF EXISTS role;`);
    await sequelize.query(`DROP TABLE IF EXISTS user;`);
    await sequelize.query(`DROP TABLE IF EXISTS review;`);
    await sequelize.query(`DROP TABLE IF EXISTS company;`);

    await sequelize.query(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            email TEXT,
            fk_user_role_id TEXT,
            FOREIGN KEY(fk_user_role_id) REFERENCES role(id)
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
            fk_user_role_id TEXT,
            FOREIGN KEY(fk_city_id) REFERENCES city(id)
            FOREIGN KEY(fk_user_role_id) REFERENCES role(id)

        )`),
      await sequelize.query(`
        CREATE TABLE IF NOT EXISTS role (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_role TEXT
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
      `INSERT INTO city (cityname) VALUES ('Stockholm'), ('Gothenburg'), ('Halmstad')`
    );

    await sequelize.query(
      `INSERT INTO company (name, adress, fk_city_id, fk_user_role_id) VALUES
      ('Sax och Fön', 'Drottninggatan 105', (SELECT id FROM city WHERE cityname = 'Stockholm'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
      ('Hårfin', 'Salonggatan 1', (SELECT id FROM city WHERE cityname = 'Stockholm'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
('Peach Stockholm', 'Vasagatan 12', (SELECT id FROM city WHERE cityname = 'Stockholm'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
('Hårfin', 'Salonggatan 1', (SELECT id FROM city WHERE cityname = 'Stockholm'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
('Snap Frisör', 'Odyssens väg  7', (SELECT id FROM city WHERE cityname = 'Halmstad'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
('Haircare', 'Frisörgatan 102', (SELECT id FROM city WHERE cityname = 'Halmstad'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
('Barber Shop', 'Drakvägen 1', (SELECT id FROM city WHERE cityname = 'Göteborg'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
('Håret', 'Mjällgatan 93', (SELECT id FROM city WHERE cityname = 'Stockholm'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
('Kungsholmens Frisör', 'Saxgatan 93', (SELECT id FROM city WHERE cityname = 'Stockholm'), (SELECT id FROM "role" WHERE user_role = 'OWNER')),
('Hair Lady', 'Odengatan 93', (SELECT id FROM city WHERE cityname = 'Stockholm'), (SELECT id FROM "role" WHERE user_role = 'OWNER'))`
    );

    await sequelize.query(`
    INSERT INTO "user" (username, email, password, fk_user_role_id) VALUES('Admin', 'admin@hairdresser.com', 'admin123', 'ADMIN'), ('User1', 'password1', 'user1@mail.com', 'USER), ('User2', 'password2', 'user2@mail.com', 'USER'), ('Hårfin', 'hairdresser1', 'harfin@harfin.se', 'OWNER')

    )
     `);

    await sequelize.query(`
    INSERT INTO review (fk_user_id, fk_company_id, title, description, rating) 
    VALUES(2, 5, 'Helt okej', 'Man får vad man betalar för', 3), (3, 1, 'Hemsk', 'Förstörde mitt hår', 1)

     `);

    await sequelize.query(
      `INSERT INTO "role" (user_role) VALUES ('ADMIN'), ('USER'), ('OWNER');`
    );
  } catch (error) {}
};

seedCompaniesDb();
