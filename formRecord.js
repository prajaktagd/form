const parseDate = (dateString) => {
  const date = dateString.split('-');
  return {
    year: +date[0],
    month: +date[1],
    day: +date[2]
  };
};

const parseHobbies = (hobbiesString) => hobbiesString.split(',');

const getAddress = (inputs) => `${inputs.addressLine1}\n${inputs.addressLine2}`;

const parseEachInput = (inputs) => {
  const record = {};
  record.name = inputs.name;
  record.DOB = parseDate(inputs.DOB);
  record.hobbies = parseHobbies(inputs.hobbies);
  record.mobileNo = inputs.mobileNo;
  record.address = getAddress(inputs);
  return record;
};

class FormRecord {
  #fields;
  #inputs;
  #index;

  constructor(fields) {
    this.#fields = fields;
    this.#index = 0;
    this.#inputs = {};
  }

  incrementIndex() {
    this.#index++;
  }

  hasExceeded() {
    return this.#index >= this.#fields.length;
  }

  getLabel() {
    return this.#fields[this.#index].label;
  }

  addInput(input) {
    const currentField = this.#fields[this.#index].field;
    this.#inputs[currentField] = input;
  }

  isValidInput(input) {
    return this.#fields[this.#index].isValid(input);
  }

  parseToJSON() {
    return parseEachInput(this.#inputs);
  }
}

exports.FormRecord = FormRecord;
