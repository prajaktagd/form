// deepEqual 

const areBothArrays = function (element1, element2) {
  return Array.isArray(element1) && Array.isArray(element2);
};

const deepEqual = function (list1, list2) {
  if (!areBothArrays(list1, list2)) {
    return list1 === list2;
  }
  if (list1.length !== list2.length) {
    return false;
  }
  for (let index = 0; index < list1.length; index++) {
    if (!deepEqual(list1[index], list2[index])) {
      return false;
    }
  }
  return true;
};

exports.deepEqual = deepEqual;
