const fs = require("fs");
const path = require("path");

// Middleware untuk dynamic Swagger host
const dynamicSwaggerHost = (req, res, next) => {
  // Baca swagger output
  const swaggerPath = path.join(__dirname, "../docs/swagger-output.json");
  let swaggerFile = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

  // Detect host dari request
  const host = req.get("host"); // Ini akan berisi IP/domain dari request
  const protocol = req.protocol; // http atau https

  // Update swagger host dan schemes
  swaggerFile.host = host;
  swaggerFile.schemes = [protocol];

  // Replace swagger file untuk response
  req.swaggerFile = swaggerFile;

  next();
};

module.exports = dynamicSwaggerHost;
