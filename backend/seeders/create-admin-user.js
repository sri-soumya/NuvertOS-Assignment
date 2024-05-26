const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.User;

const createAdminUser = async () => {
  try {
    const adminUser = await User.findOne({ where: { username: "admin" } });
    if (adminUser) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("adminpassword", saltRounds);

    await User.create({
      username: "admin",
      password: hashedPassword,
      isAdmin: true,
    });

    console.log("Admin user created successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
