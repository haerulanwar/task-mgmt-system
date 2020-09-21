'use strict'
module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define('task', {
    userId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    location: DataTypes.STRING,
    eventTask: DataTypes.STRING
  }, {})
  task.associate = function (models) {
    // associations can be defined here
  }
  return task
}
