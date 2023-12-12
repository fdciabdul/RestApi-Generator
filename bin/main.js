#!/usr/bin/env node

const inquirer = require('inquirer');
const { generateServer, generateRouter, generateConfig, generateModel } = require('./fileGenerators');

async function main() {
  const answers = await inquirer.prompt([
    // Add questions for ES6/CommonJS, database type, and npm package installation
  ]);

  // Generate files based on answers
  generateServer(answers);
  generateRouter(answers);
  generateConfig(answers);
  generateModel(answers);

  // Additional logic for npm package installation if required
}

main();
