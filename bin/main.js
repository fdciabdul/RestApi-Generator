#!/usr/bin/env node

import inquirer from 'inquirer';
import { exec } from 'child_process';
import { generateServer, generateRouter, generateConfig, generateModel, createDirectory } from './lib/fileGenerators.js';

async function main() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'moduleSystem',
      message: 'Pilih sistem modul Anda:',
      choices: ['ES6', 'CommonJS'],
    },
    {
      type: 'list',
      name: 'database',
      message: 'Pilih database Anda:',
      choices: ['MySQL', 'PostgreSQL', 'SQLite', 'MSSQL'],
    },
    {
      type: 'confirm',
      name: 'sample',
      message: 'Ingin membuat model sampel?',
    },
    {
      type: 'confirm',
      name: 'installNpm',
      message: 'Apakah Anda ingin menginstal paket npm sekarang?',
    },
    {
      type: 'input',
      name: 'directoryName',
      message: 'Masukkan nama direktori yang ingin dibuat:',
    }
  ]);

  generateServer(answers);
  generateRouter(answers);
  generateConfig(answers);
  generateModel(answers);
  createDirectory(answers.directoryName);

  if (answers.installNpm) {
    installNpmPackages();
  }
}

function installNpmPackages() {
  console.log('Menginstal paket npm...');
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.error(`Terjadi kesalahan: ${error}`);
      return;
    }
    console.log(stdout);
    console.error(stderr);
  });
}

main();
