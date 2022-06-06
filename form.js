const fs = require('fs');

const writeToJSON = (inputs) => {
  const record = {};
  record.name = inputs.name;
  record.DOB = inputs.DOB.split('-');
  fs.writeFileSync('./formRecord.json', JSON.stringify(record), 'utf8');
};

const generateLabels = (fields) => {
  return fields.map((field) => `Please enter your ${field}: `);
};

const readInput = (fields, processInput) => {
  process.stdin.setEncoding('utf8');

  const labels = generateLabels(fields);
  const inputs = {};
  let index = 0;
  process.stdout.write(labels[index]);
  process.stdin.on('data', (chunk) => {
    inputs[fields[index]] = chunk.trimEnd();
    index++;
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

const fields = ['name', 'DOB', 'hobbies'];
readInput(fields, writeToJSON);

exports.readInput = readInput;

