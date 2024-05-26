const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { Compound } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const compoundsData = [];
    const csvFilePath = path.resolve(__dirname, "../compound.csv");

    console.log("CSV File Path:", csvFilePath);

    if (!fs.existsSync(csvFilePath)) {
      console.error("CSV file does not exist:", csvFilePath);
      return Promise.reject(new Error("CSV file does not exist"));
    }

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (data) => {
          console.log("Read data:", data);
          compoundsData.push({
            CompoundName: data.CompoundName,
            CompoundDescription: data.CompoundDescription,
            strImageSource: data.strImageSource,
            strImageAttribution: data.strImageAttribution,
            dateModified: new Date(data.dateModified),
          });
        })
        .on("end", async () => {
          try {
            console.log("Finished reading CSV file");
            console.log("Compounds data to insert:", compoundsData);
            await queryInterface.bulkInsert("Compounds", compoundsData, {});
            console.log("Data successfully seeded!");
            resolve();
          } catch (error) {
            console.error("Error seeding data:", error);
            reject(error);
          }
        })
        .on("error", (error) => {
          console.error("Error reading CSV file:", error);
          reject(error);
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Compounds", null, {});
  },
};
