const fs = require('fs');

const parseDate = (dateString) => {
  const date = dateString.split('-');
  return {
    year: +date[0],
    month: +date[1],
    day: +date[2]
  };
};

const parseHobbies = (hobbiesString) => hobbiesString.split(',');

const writeToJSON = (inputs) => {
  const record = {};
  record.name = inputs.name;
  record.DOB = parseDate(inputs.DOB);
  record.hobbies = parseHobbies(inputs.hobbies);
  fs.writeFileSync('./formRecord.json', JSON.stringify(record), 'utf8');
};

const generateLabels = (fields) => {
  return fields.map((field) => `Please enter your ${field}: `);
};

const isValidName = (name) => /^[a-zA-Z]{5,}$/.test(name);
const isValidDate = (date) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date);
const areValidHobbies = (hobbies) => hobbies !== '';

const isValidInputFor = (input, field) => {
  if (field === 'name') {
    return isValidName(input);
  }
  if (field === 'DOB') {
    return isValidDate(input);
  }
  return areValidHobbies(input);
};

const readInput = (fields, processInput) => {
  process.stdin.setEncoding('utf8');

  const labels = generateLabels(fields);
  const inputs = {};
  let index = 0;
  process.stdout.write(labels[index]);

  process.stdin.on('data', (chunk) => {
    const field = fields[index];
    const input = chunk.trimEnd();
    if (isValidInputFor(input, field)) {
      inputs[field] = input;
      index++;
    }
    if (index >= fields.length) {
      return;
    }
    process.stdout.write(labels[index]);
  });

  process.stdin.on('end', () => {
    processInput(inputs);
    console.log('Thank You');
  });
};

const main = () => {
  const fields = ['name', 'DOB', 'hobbies'];
  readInput(fields, writeToJSON);
};

main();
