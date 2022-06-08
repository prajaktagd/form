const fs = require('fs');
const { Form } = require('./src/form.js');
const { Field } = require('./src/field.js');
const { registerResponse } = require('./src/registerResponse.js');

const writeForm = (form) => {
  fs.writeFileSync('./form.json', JSON.stringify(form), 'utf8');
};

const main = () => {
  const nameField = new Field('name', 'Enter your name');
  const dobField = new Field('dob', 'Enter your DOB');
  const hobbiesField = new Field('hobbies', 'Enter your hobbies');
  const form = new Form(nameField, dobField, hobbiesField);

  process.stdin.setEncoding('utf8');

  console.log(form.getCurrentPrompt());
  process.stdin.on('data', (response) => {
    registerResponse(form, response.trimEnd(), console.log, writeForm);
  });
};

main();
