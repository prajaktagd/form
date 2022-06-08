const fs = require('fs');
const { Form } = require('./src/form.js');
const { Field } = require('./src/field.js');
const { registerResponse } = require('./src/registerResponse.js');

const isValidName = (name) => /^[a-zA-Z]{5,}$/.test(name);
const isValidDate = (date) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date);
const isValidMobNo = (mobNo) => /^[0-9]{10}$/.test(mobNo);
const isNotEmpty = (text) => text !== '';

const writeForm = (form) => {
  fs.writeFileSync('./form.json', JSON.stringify(form), 'utf8');
};

const main = () => {
  const nameField = new Field('name', 'Enter your name', isValidName);
  const dobField = new Field('dob', 'Enter your DOB(yyyy-mm-dd)', isValidDate);
  const hobbiesField = new Field('hobbies', 'Enter your hobbies', isNotEmpty);
  const form = new Form(nameField, dobField, hobbiesField);

  process.stdin.setEncoding('utf8');

  console.log(form.getCurrentPrompt());
  process.stdin.on('data', (response) => {
    registerResponse(form, response.trimEnd(), console.log, writeForm);
  });
};

main();