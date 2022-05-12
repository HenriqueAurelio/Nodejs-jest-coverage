const { exec } = require("child_process");
process.env.DATABASE_URL = "sqlserver://localhost:1433;initialCatalog=sample;database=tests;integratedSecurity=true;trustServerCertificate=true";
//@TODO transform in syncronous execution to avoid concurrency
exec("yarn db:migrate");

module.exports = {};
