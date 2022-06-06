const { FormRecord } = require('./formRecord.js');

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

const readInput = (formRecord) => {
  process.stdin.setEncoding('utf8');

  const labels = formRecord.generateLabels();
  let index = 0;
  process.stdout.write(labels[index]);

  process.stdin.on('data', (chunk) => {
    const field = formRecord.getFieldOf(index);
    const input = chunk.trimEnd();
    if (isValidInputFor(input, field)) {
      formRecord.addInput(field, input);
      index++;
    }
    if (formRecord.hasExceeded(index)) {
      return;
    }
    process.stdout.write(labels[index]);
  });

  process.stdin.on('end', () => {
    formRecord.writeToJSON();
    console.log('Thank You');
  });
};

const main = () => {
  const fields = ['name', 'DOB', 'hobbies'];
  const formRecord = new FormRecord(fields);
  readInput(formRecord);
};

main();
