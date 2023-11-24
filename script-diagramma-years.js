document.addEventListener('DOMContentLoaded', function() {

function calculatePercentile(iq) {
    const z = (iq - 100) / 15;
    const percentile = (0.5 * (1 + erf(z / Math.sqrt(2))));
    return percentile * 100;
}

function erf(x) {
    // Константы для аппроксимации
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.330274429;
    const p  =  0.3275911;

    const t = 1.0 / (1.0 + p * Math.abs(x));
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return x >= 0 ? y : -y;
}

// Предположим, что это значение IQ пользователя
  function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
function displayResults() {
  // Получаем значение IQ и год рождения из параметров URL
  const userIq = parseInt(getQueryParam('score'), 10);
  const userBirthYear = parseInt(getQueryParam('year'), 10);
  const currentYear = new Date().getFullYear();
  const userAge = currentYear - userBirthYear; // Вычисляем возраст пользователя

  // Вычисляем процентиля пользователя на основе его IQ
  const iqPercentile = calculatePercentile(userIq);
  const iqSmarterThanPercent = (100 - iqPercentile).toFixed(2);

  // Вычисляем процентиля пользователя на основе его возраста
  const agePercentile = calculateAgePercentile(userAge, userIq);
  const ageSmarterThanPercent = (100 - agePercentile).toFixed(2);

  // Заполняем элементы страницы
  const userNameElement = document.getElementById('user-name');
  const iqScoreElement = document.getElementById('iq-score');
  const iqMessageElement = document.getElementById('iq-level-indicator'); // Убедитесь, что есть элемент с таким ID
  const ageMessageElement = document.getElementById('iq-years-indicator'); // Убедитесь, что есть элемент с таким ID

  userNameElement.textContent = decodeURIComponent(getQueryParam('name'));
  iqScoreElement.textContent = userIq;

  const iqMessage = `Вы принадлежите к ${iqPercentile.toFixed(2)}% людей мира. Вы умнее, чем ${iqSmarterThanPercent}% населения.`;
  const ageMessage = `Вы принадлежите к ${agePercentile.toFixed(2)}% людей вашего возраста. Вы умнее, чем ${ageSmarterThanPercent}% людей в вашем возрасте.`;
document.getElementById('iq-level-indicator').textContent = idmessage;
document.getElementById('iq-level-indicator').textContent = agemessage;
  iqMessageElement.textContent = iqMessage;
  ageMessageElement.textContent = ageMessage;
}

  displayResults(); // Вызываем функцию displayResults
});