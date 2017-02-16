export function load(query) {
  console.log(query);
  return fetch(query).then(response => response.json());
}
