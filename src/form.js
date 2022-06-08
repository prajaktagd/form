class Form {
  #fields;
  #currentIndex;

  constructor(...fields) {
    this.#fields = fields;
    this.#currentIndex = 0;
  }

  #getCurrentField() {
    return this.#fields[this.#currentIndex];
  }

  getCurrentLabel() {
    return this.#getCurrentField.getLabel();
  }

  isFormFilled() {
    return this.#fields.every((field) => field.isFilled());
  }

  fillCurrentField(response) {
    const currentField = this.#getCurrentField();
    if (!currentField.isValid(response)) {
      throw new Error('Invalid Response');
    }
    currentField.fill(response);
    this.#currentIndex++;
  }

  getResponses() {
    return this.#fields.reduce((responses, field) => {
      const { name, response } = field.getResponse();
      responses[name] = response;
      return responses;
    }, {});
  }
}

module.exports = { Form };
