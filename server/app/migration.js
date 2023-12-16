const dbConfig = require("./config/db.config");
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
  user: dbConfig.USER,  
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
});

async function runMigrations() {
  try {
    await client.connect();

    // Read and execute each SQL migration file
    const migrationPath = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationPath);

    for (const file of migrationFiles) {
      const filePath = path.join(migrationPath, file);
      const migrationQuery = fs.readFileSync(filePath, 'utf-8');
      await client.query(migrationQuery);
    }

    console.log('Migrations completed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await client.end();
  }
}

runMigrations();
