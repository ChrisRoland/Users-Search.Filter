const result = document.getElementById('result');
const search = document.getElementById('search');
const listItems = []

fetchUsers()

search.addEventListener('input', (e) => {
  const value = e.target.value;
  const filteredList = listItems.filter((item) => {
    return item.name.first.toLowerCase().includes(value.toLowerCase()) || item.name.last.toLowerCase().includes(value.toLowerCase());
  });
  displayData(filteredList);
});

async function fetchUsers() {
  const res = await fetch('https://randomuser.me/api?results=70');
  const data = await res.json();
  return data;
}

fetchUsers().then(data => {
  listItems.push(...data.results);
  displayData(listItems);
});

function displayData(listItems) {
  result.innerHTML = listItems
    .map((item) => {
      return `
      <li>
        <img src="${item.picture.large}" alt="${item.name.first}">
        <div class="user-info">
          <h4>${item.name.first} ${item.name.last}</h4>
          <p>${item.location.city}, ${item.location.country}</p>
        </div>
      </li>
    `;
    })
    .join('');
}
