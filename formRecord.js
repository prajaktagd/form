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

const getAddress = (inputs) =>
  `${inputs['address line 1']}\n${inputs['address line 2']}`;

const parseEachInput = (inputs) => {
  const record = {};
  record.name = inputs.name;
  record.DOB = parseDate(inputs.DOB);
  record.hobbies = parseHobbies(inputs.hobbies);
  record.mobileNo = inputs['mobile no'];
  record.address = getAddress(inputs);
  return record;
};

class FormRecord {
  #fields;
  #inputs;

  constructor(fields) {
    this.#fields = fields;
    this.#inputs = {};
  }

  hasExceeded(index) {
    return index >= this.#fields.length;
  }

  getFieldOf(index) {
    return this.#fields[index];
  }

  generateLabels() {
    return this.#fields.map((field) => `Please enter your ${field}: `);
  }

  addInput(field, input) {
    this.#inputs[field] = input;
  }

  writeToJSON() {
    const record = parseEachInput(this.#inputs);
    fs.writeFileSync('./formRecord.json', JSON.stringify(record), 'utf8');
  }
}

exports.FormRecord = FormRecord;
