const isValidName = (name) => /^[a-zA-Z]{5,}$/.test(name);
const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}/.test(date);
const isValidMobNo = (mobNo) => /^\d{10}$/.test(mobNo);
const isNotEmpty = (input) => input !== '';

const identity = (value) => value;
const splitByCommas = (text) => text.split(',');
const joinBylines = (lines) => lines.join('\n');

const parseDate = (dateString) => {
  const date = dateString.split('-');
  return {
    year: +date[0],
    month: +date[1],
    day: +date[2]
  };
};

const formFields = [
  {
    name: 'name',
    prompt: 'Please enter your name: ',
    validate: isValidName,
    parse: identity
  },
  {
    name: 'dob',
    prompt: 'Please enter your DOB(YYYY-MM-DD): ',
    validate: isValidDate,
    parse: parseDate
  },
  {
    name: 'hobbies',
    prompt: 'Please enter your hobbies: ',
    validate: isNotEmpty,
    parse: splitByCommas
  },
  {
    name: 'mobileNo',
    prompt: 'Please enter your mobile number: ',
    validate: isValidMobNo,
    parse: identity
  },
  {
    name: 'address',
    prompt: ['Please enter address line 1: ', 'Please enter address line 2'],
    validate: isNotEmpty,
    parse: joinBylines
  }
];

exports.formFields = formFields;
