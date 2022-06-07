const isValidName = (name) => /^[a-zA-Z]{5,}$/.test(name);
const isValidDate = (date) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(date);
const isValidMobNo = (mobNo) => /^[0-9]{10}$/.test(mobNo);
const isNotEmpty = (input) => input !== '';

const formFields = [
  {
    field: 'name',
    label: 'Please enter your name: ',
    validate: isValidName
  },
  {
    field: 'DOB',
    label: 'Please enter your DOB(YYYY-MM-DD): ',
    validate: isValidDate
  },
  {
    field: 'hobbies',
    label: 'Please enter your hobbies: ',
    validate: isNotEmpty
  },
  {
    field: 'mobileNo',
    label: 'Please enter your mobile number: ',
    validate: isValidMobNo
  },
  {
    field: 'addressLine1',
    label: 'Please enter address line 1: ',
    validate: isNotEmpty
  },
  {
    field: 'addressLine2',
    label: 'Please enter address line 2: ',
    validate: isNotEmpty
  },
];

exports.formFields = formFields;
