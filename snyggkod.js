/*
 * Fetches the data
 * Typically this is a request to an endpoint which returns the data. But for this example it's hard coded.
 */
function fetchData() {
  return [
    {
      name: 'Martin Bonander',
      role: 'Project manager',
      experience: 15,
      city: 'Karlstad',
    },
    {
      name: 'Johan Nordli',
      role: 'Developer',
      experience: 12,
      city: 'Göteborg',
    },
    {
      name: 'Rasmus Björklund',
      role: ['Project manager', 'Developer'],
      experience: 4,
      city: 'Örebro',
    },
    {
      name: 'Robin Wikingsson',
      role: ['Architect', 'Developer'],
      experience: 8,
      city: 'Örebro',
    },
    {
      name: 'Jonas Gällman',
      role: 'Developer',
      experience: 13,
      city: 'Alicante',
    },
    {
      name: 'Felicia Strandberg',
      role: 'Developer',
      experience: 0,
      city: 'Stockholm',
    },
  ];
}

/*
 * Finds if the current user is a Developer or not
 * Uses the .find() function to check if a user with multiple roles is a Developer
 */
function isDeveloper({ role }) {
  if (Array.isArray(role)) {
    return role.find((role) => role.includes('Developer'));
  }

  return role.includes('Developer');
}

/*
 * Gets all users that have a role of Developer
 * Then creates a new array using the .map() function to extract the neccessary information
 */
function getDevelopers(data) {
  const developers = data.filter(({ role }) => isDeveloper({ role }));

  return developers.map(({ name, role, experience }) => ({
    name,
    role: Array.isArray(role) ? role.join(', ') : role,
    experience,
  }));
}

// Gets all users with an experience equal or higher than what is sent to the function
function getSeniors({ users, years }) {
  return users
    .filter((user) => user.experience >= years)
    .map((user) => ({ name: user.name, experience: user.experience }));
}

/*
 * Fetches the data
 * Send data to the functions in different formats, one as a simple parameter and one as a object destructing parameter
 */
function fetchUsers() {
  const data = fetchData();

  const developers = getDevelopers(data);
  const seniors = getSeniors({ users: data, years: 8 });

  return {
    developers,
    seniors,
  };
}

// Call the main function called fetchUsers
console.log(fetchUsers());
