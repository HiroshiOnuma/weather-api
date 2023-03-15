'use strict';

const fadeInElements = document.querySelectorAll('.fade-in');
const fadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});

async function dataGet() {
    const response = await fetch('/api/current');
    const json = await response.json();
    console.log(json);
    const currentWeatherContainer = document.querySelector('.current-weather-container');
    const weather = json.weather[0].main;
    const apiWeather = document.querySelector('.current-api-weather');
    const dt = json.dt;
    const date = new Date(dt * 1000);
    const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
    const dateString = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${dayOfWeek}) ${date.getHours()}時${date.getMinutes()}分`;

    const dateTxt = document.querySelector('.date-txt');
    const weatherIcon = document.querySelector('.weather-icon');
    const iconCode = json.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    const iconImg = document.createElement('img');
    iconImg.src = iconUrl;
    const apiTemp = document.querySelector('.current-api-temp');
    const apiTempMax = document.querySelector('.current-api-temp_max');
    const apiTempMin = document.querySelector('.current-api-temp_min');
    const apiHumidity = document.querySelector('.current-api-humidity');

    if (weather === 'Clear') {
        currentWeatherContainer.style.backgroundImage = 'url(./img/sunny.jpg)';
    } else if (weather === 'Clouds') {
        currentWeatherContainer.style.backgroundImage = 'url(./img/cloudy.jpg)';
    } else if (weather === 'Rain') {
        currentWeatherContainer.style.backgroundImage = 'url(./img/rainy.jpg)';
    } else if (weather === 'Snow') {
        currentWeatherContainer.style.backgroundImage = 'url(./img/snowny.jpg)';
    } else if (weather === 'Thunderstorm') {
        currentWeatherContainer.style.backgroundImage = 'url(./img/thunderbolt.jpg)';
    }

    dateTxt.textContent = dateString;
    apiWeather.textContent = `${json.weather[0].description}`;
    weatherIcon.appendChild(iconImg);
    apiTemp.textContent = `${Math.round(json.main.temp)} ℃`;
    apiTempMax.textContent = `${Math.round(json.main.temp_max)} ℃`;
    apiTempMin.textContent = `${Math.round(json.main.temp_min)} ℃`;
    apiHumidity.textContent = `${json.main.humidity}%`;
}

async function data5dayGet() {
    const response = await fetch('/api/forecast');
    const json = await response.json();
    console.log(json);

    for (let i = 0; i < json.list.length; i++) {
        const dt = json.list[i].dt;
        const date = new Date(dt * 1000);
        const dayOfWeek = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];
        const dateString = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日(${dayOfWeek}) ${date.getHours()}時`;
        const forecastLlist = document.querySelector('.forecast-list');
        const iconCode = json.list[i].weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
        const iconImg = document.createElement('img');
        iconImg.src = iconUrl;
        const li = document.createElement('li');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        const span4 = document.createElement('span');
        span1.textContent = dateString;
        span2.textContent = json.list[i].weather[0].description;
        span3.appendChild(iconImg);
        span4.textContent = `${Math.round(json.list[i].main.temp)} ℃`;
        li.appendChild(span1);
        li.appendChild(span2);
        li.appendChild(span3);
        li.appendChild(span4);
        forecastLlist.appendChild(li);
    }
}

dataGet();
data5dayGet();