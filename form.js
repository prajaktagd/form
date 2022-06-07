const fs = require('fs');
const { FormRecord } = require('./formRecord.js');
const { formFields } = require('./formFields.js');

const addValidInput = (chunk, formRecord) => {
  const input = chunk.trimEnd();
  if (formRecord.isValidInput(input)) {
    formRecord.addInput(input);
    formRecord.incrementIndex();
  }
};

const readInput = (formRecord) => {
  process.stdin.setEncoding('utf8');
  process.stdout.write(formRecord.getLabel());

  process.stdin.on('data', (chunk) => {
    addValidInput(chunk, formRecord);
    if (formRecord.hasExceeded()) {
      return;
    }
    process.stdout.write(formRecord.getLabel());
  });

  process.stdin.on('end', () => {
    const record = formRecord.parseToJSON();
    fs.writeFileSync('./formRecord.json', JSON.stringify(record), 'utf8');
    console.log('Thank You');
  });
};

const main = () => {
  const formRecord = new FormRecord(formFields);
  readInput(formRecord);
};

main();
