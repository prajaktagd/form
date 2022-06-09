#! /bin/bash

INPUT="Prince\n2001-07-19\ndrawing,sketching\n9876543210\nDixi\nNashik"
EXPECTED='{"name":"Prince","dob":{"year":2001,"month":7,"day":19},"hobbies":["drawing","sketching"],"mobileNo":"9876543210","address":"Dixi\nNashik"}'

node "./fillForm.js" <<< "${INPUT}" &> /dev/null
echo -n "${EXPECTED}" > "./test/expectedForm.json"
diff "./form.json" "./test/expectedForm.json" > /dev/null

EXITCODE=$?
STATUS="FAIL"
if [[ ${EXITCODE} -eq 0 ]]
then
  STATUS="PASS"
fi

echo -e "fillForm\n\v${STATUS}"
