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

  getAddress() {
    const addressLine1 = this.#inputs['address line 1'];
    const addressLine2 = this.#inputs['address line 2'];
    return `${addressLine1}\n${addressLine2}`;
  }

  writeToJSON() {
    const record = {};
    record.name = this.#inputs.name;
    record.DOB = parseDate(this.#inputs.DOB);
    record.hobbies = parseHobbies(this.#inputs.hobbies);
    record.mobileNo = this.#inputs['mobile no'];
    record.address = this.getAddress();
    fs.writeFileSync('./formRecord.json', JSON.stringify(record), 'utf8');
  }
}

exports.FormRecord = FormRecord;
