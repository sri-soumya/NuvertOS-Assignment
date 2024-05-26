"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Compound extends Model {
    static associate(models) {}
  }
  Compound.init(
    {
      CompoundName: DataTypes.STRING,
      CompoundDescription: DataTypes.TEXT,
      strImageSource: DataTypes.STRING,
      strImageAttribution: DataTypes.STRING,
      dateModified: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Compound",
      timestamps: false,
    }
  );
  return Compound;
};
