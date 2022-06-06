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
    const record = {};
    record.name = this.#inputs.name;
    record.DOB = parseDate(this.#inputs.DOB);
    record.hobbies = parseHobbies(this.#inputs.hobbies);
    fs.writeFileSync('./formRecord.json', JSON.stringify(record), 'utf8');
  }
}

exports.FormRecord = FormRecord;
