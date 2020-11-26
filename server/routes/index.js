const fs = require("fs");
const path = require("path");

module.exports = app => {
  fs.readdirSync(__dirname + "/api/").forEach(file => {
    const resourceName = file.substr(0, file.indexOf("."));
    app.use(`/api/${resourceName}`, require(`./api/${resourceName}`));
  });
};
