function requestPeople() {
  // Data that usually comes from a restapi
  return { people: [ 
    {
      country: 'Sweden', 
      name: 'Rasmus',
      postCode: 65345,
    }, 
    {
      country: 'China', 
      name: 'Johan',
      postCode: 12352
    }, 
    {
      country: 'Spain', 
      name: 'Samuel',
      postCode: 44432
    }
  ]};
}

function isEuropean(person) {
  const country = person.country;

  if (country === 'Sweden') {
    return true;
  } else if (country === 'Spain') {
    return true;
  } else {
    return false;
  }
}

function getCityByPostcode(postCode) {
  let city = '';
  if (postCode === 65345) {
    city = 'Karlstad';
    return city;
  } else {
    throw new Error(`No city found of postcode: ${postCode}`);
  }
}

function sortByName(personA, personB) {
  if (personA.name.toLowerCase() < personB.name.toLowerCase()) {
    return -1;
  } else if (personA.name.toLowerCase() > personB.name.toLowerCase()) {
    return 1
  } else {
    return 0;
  }
}

/**
 * Return an array of people in Europe sorted by name
 * Every person in the array will look like this:
 * {
 *    name: 'A name',
 *    adress: { country: 'A country', city: 'A city' (or undefined), postCode: A postcode }
 * }
 **/
function main() {
  const response = requestPeople();

  // If response and people is not null
  if (response !== null && response.people !== null) {
    let people = [];
    const length = response.people.length;
    let count = 0;

    while (length > count) {
      const person = response.people[count];

      if (isEuropean(person)) {
        if (response.people[count].country === 'Sweden') {
          people.push({
            name: person.name,
            adress: {
              country: person.country,
              city: getCityByPostcode(person.postCode),
              postCode: person.postCode
            }
          });
        } else {
          people.push({
            name: person.name,
            adress: {
              country: person.country,
              postCode: person.postCode
            }
          });
        }
      }

      count = count + 1;
    }

    const sortedPeople = people.sort(sortByName);

    return sortedPeople;
  } else {
    return [];
  }
}

console.log(main());
