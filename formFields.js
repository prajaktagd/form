const isValidName = (name) => /^[a-zA-Z]{5,}$/.test(name);
const isValidDate = (date) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date);
const isValidMobNo = (mobNo) => /^[0-9]{10}$/.test(mobNo);
const isNotEmpty = (input) => input !== '';

const identity = (value) => value;
const parseHobbies = (hobbiesString) => hobbiesString.split(',');

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
    field: 'name',
    label: 'Please enter your name: ',
    validate: isValidName,
    parse: identity
  },
  {
    field: 'DOB',
    label: 'Please enter your DOB(YYYY-MM-DD): ',
    validate: isValidDate,
    parse: parseDate
  },
  {
    field: 'hobbies',
    label: 'Please enter your hobbies: ',
    validate: isNotEmpty,
    parse: parseHobbies
  },
  {
    field: 'mobileNo',
    label: 'Please enter your mobile number: ',
    validate: isValidMobNo,
    parse: identity
  },
  {
    field: 'addressLine1',
    label: 'Please enter address line 1: ',
    validate: isNotEmpty,
    parse: identity
  },
  {
    field: 'addressLine2',
    label: 'Please enter address line 2: ',
    validate: isNotEmpty,
    parse: identity
  },
];

exports.formFields = formFields;
