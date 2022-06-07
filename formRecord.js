class FormRecord {
  #fields;
  #index;
  #record;

  constructor(fields) {
    this.#fields = fields;
    this.#index = 0;
    this.#record = {};
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
    const fieldData = this.#fields[this.#index];
    this.#record[fieldData.field] = fieldData.parse(input);
  }

  isValidInput(input) {
    return this.#fields[this.#index].validate(input);
  }

  getJSON() {
    const { addressLine1, addressLine2, ...record } = this.#record;
    record.address = `${addressLine1}\n${addressLine2}`;
    return record;
  }
}

exports.FormRecord = FormRecord;
