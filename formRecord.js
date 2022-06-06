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
  #labels;
  #index;

  constructor(fields) {
    this.#fields = fields;
    this.#index = 0;
    this.#labels = [];
    this.#inputs = {};
  }

  currentLabel() {
    return this.#labels[this.#index];
  }

  currentField() {
    return this.#fields[this.#index];
  }

  incrementIndex() {
    this.#index++;
  }

  hasExceeded() {
    return this.#index >= this.#fields.length;
  }

  generateLabels() {
    this.#labels = this.#fields.map((field) => `Please enter your ${field}: `);
  }

  addInput(input) {
    this.#inputs[this.currentField()] = input;
  }

  writeToJSON() {
    const record = parseEachInput(this.#inputs);
    fs.writeFileSync('./formRecord.json', JSON.stringify(record), 'utf8');
  }
}

exports.FormRecord = FormRecord;
