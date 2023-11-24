function saveResult(result) {
  // Получаем текущий список результатов или создаем новый, если он еще не существует
  const results = JSON.parse(localStorage.getItem('testResults')) || [];
  // Добавляем новый результат в начало массива
  results.unshift(result);

  // Ограничиваем количество результатов до 20
  if (results.length > 20) {
    results.length = 20; // Обрезаем массив до последних 20 результатов
  }

  // Сохраняем обновленный список результатов
  localStorage.setItem('testResults', JSON.stringify(results));
}

// При загрузке страницы отображаем результаты

document.addEventListener('DOMContentLoaded', displayResults);

function displayResults() {
  const resultsListContainer = document.querySelector('.results-list-container');
  if (resultsListContainer) {
    const results = JSON.parse(localStorage.getItem('testResults')) || [];
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    resultsListContainer.innerHTML = ''; // Очищаем текущий список

    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';

      // Выбираем случайное изображение флага
      const randomIndex = Math.floor(Math.random() * photos.length);
      const photo = photos[randomIndex];

      const imgElement = document.createElement('img');
      imgElement.src = photo.path;
      imgElement.alt = photo.country;
      imgElement.className = 'country-flag';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.textContent = ` ${result.name}  `;


      const scoreDiv = document.createElement('div');
      scoreDiv.className = 'score';
      scoreDiv.textContent = `Результат IQ теста - ${result.score}`;

      const dateDiv = document.createElement('div');
      dateDiv.className = 'date';
      dateDiv.textContent = result.date;
       // Убедитесь, что result.date содержит правильную дату и время

      resultItem.appendChild(imgElement);
      resultItem.appendChild(nameDiv);
      resultItem.appendChild(scoreDiv);
resultItem.appendChild(dateDiv);




      resultsListContainer.prepend(resultItem); // Добавляем в начало контейнера
    });
  }
}


// Вызываем функцию отображения результатов при загрузке страницы

const photos = [
  { country: 'United Arab Emirates', path: 'img/country-flags/ae.svg' },
  { country: 'Germany', path: 'img/country-flags/ar.svg' },
   { country: 'Kazachstan', path: 'img/country-flags/kz.svg' },
    { country: 'Turkey', path: 'img/country-flags/iq.svg' },
     { country: 'Azerbaizhan', path: 'img/country-flags/tr.svg' },
      { country: 'Russia', path: 'img/country-flags/de.svg' },
       { country: 'Kanada', path: 'img/country-flags/cz.svg' },
       { country: 'Armenia', path: 'img/country-flags/am.svg' },
       { country: 'Brazilia', path: 'img/country-flags/br.svg' },
        { country: 'Argentina', path: 'img/country-flags/ar.svg' },
         { country: 'United Kingdom of Great Britain and Northern Ireland ', path: 'img/country-flags/gb.svg' },
          { country: 'Georgia ', path: 'img/country-flags/ge.svg' },
           { country: 'Poland', path: 'img/country-flags/id.svg' },
            { country: 'Israil', path: 'img/country-flags/il.svg' },
             { country: 'India', path: 'img/country-flags/ar.svg' },
               { country: 'Italy', path: 'img/country-flags/it.svg' },
                 { country: 'Kirgistan', path: 'img/country-flags/kg.svg' },
                   { country: 'Latvia', path: 'img/country-flags/lv.svg' },
                      
                         { country: 'Sweden', path: 'img/country-flags/se.svg' },
                            { country: 'USA', path: 'img/country-flags/us.svg' },
                               { country: 'Uzbekistan', path: 'img/country-flags/uz.svg' },



  // и так далее для всех стран или критериев
];

