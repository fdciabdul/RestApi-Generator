#!/usr/bin/env node

import inquirer from 'inquirer';
import { exec } from 'child_process';
import { generateServer, generateRouter, generateConfig, generateModel } from './lib/fileGenerators.js';

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'moduleSystem',
      message: 'Choose your module system:',
      choices: ['ES6', 'CommonJS'],
    },
    {
      type: 'list',
      name: 'database',
      message: 'Select your database:',
      choices: ['MySQL', 'PostgreSQL', 'SQLite', 'MSSQL'],
    },
    {
      type: 'confirm',
      name: 'sample',
      message: 'Want to create sample model?',
    },
    {
      type: 'confirm',
      name: 'installNpm',
      message: 'Do you want to install npm packages now?',
    }
  ]);

  generateServer(answers);
  generateRouter(answers);
  generateConfig(answers);
  generateModel(answers);

  if (answers.installNpm) {
    installNpmPackages();
  }
}

function installNpmPackages() {
  console.log('Installing npm packages...');
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
}

main();
