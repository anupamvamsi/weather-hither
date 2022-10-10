require('./styles/style.css');

// const content = document.querySelector('.content');

const icon = document.querySelector('.weather-icon');
const temp = document.querySelector('.weather-temp');
const place = document.querySelector('.weather-place');

const input = document.querySelector('.weather-search');

// PROMISE - THEN - CATCH
// const data = fetch(
//   'https://api.openweathermap.org/data/2.5/weather?q=Hyderabad,in&appid=YOUR_API_KEYunits=metric',
//   { mode: 'cors' }
// )
//   .then((response) => response.json())
//   .then((response) => response)
//   .catch((error) => error);

// data.then((value) => {
//   console.log(value);
//   content.textContent += value.id;
// });

// ASYNC - AWAIT
async function dataFetcher() {
  const placeSearch = input.value || 'Nuuk';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${placeSearch}&APPID=YOUR_API_KEY&units=metric`,
      { mode: 'cors' }
    );

    if (response.ok) {
      const responseJSON = await response.json();

      temp.textContent = `${responseJSON.main.temp}\u00B0C`;
      icon.src = `http://openweathermap.org/img/wn/${responseJSON.weather[0].icon}@4x.png`;

      place.textContent = `${responseJSON.name}, ${responseJSON.sys.country}`;

      input.value = '';
    } else {
      input.value = '';
      throw response;
    }
  } catch (error) {
    const errorJSON = await error.json();
    temp.textContent = `ERROR: ${errorJSON.message} `;
    icon.src = '';

    place.textContent = '';
  }
}

dataFetcher();

input.addEventListener('change', dataFetcher);
