const { FormRecord } = require('./formRecord.js');

const isValidName = (name) => /^[a-zA-Z]{5,}$/.test(name);
const isValidDate = (date) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date);
const isValidMobNo = (mobNo) => /^[0-9]{10}$/.test(mobNo);
const isNotEmpty = (input) => input !== '';

const isValidInputFor = (field, input) => {
  if (field === 'name') {
    return isValidName(input);
  }
  if (field === 'DOB') {
    return isValidDate(input);
  }
  if (field === 'mobile no') {
    return isValidMobNo(input);
  }
  return isNotEmpty(input);
};

const addValidInput = (chunk, formRecord) => {
  const field = formRecord.currentField();
  const input = chunk.trimEnd();
  if (isValidInputFor(field, input)) {
    formRecord.addInput(input);
    formRecord.incrementIndex();
  }
};

const readInput = (formRecord) => {
  process.stdin.setEncoding('utf8');
  process.stdout.write(formRecord.currentLabel());

  process.stdin.on('data', (chunk) => {
    addValidInput(chunk, formRecord);
    if (formRecord.hasExceeded()) {
      return;
    }
    process.stdout.write(formRecord.currentLabel());
  });

  process.stdin.on('end', () => {
    formRecord.writeToJSON();
    console.log('Thank You');
  });
};

const main = () => {
  const fields = ['name', 'DOB', 'hobbies', 'mobile no', 'address line 1',
    'address line 2'];
  const formRecord = new FormRecord(fields);
  formRecord.generateLabels();
  readInput(formRecord);
};

main();
