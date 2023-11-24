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
    const userIq = parseInt(getQueryParam('score'), 10); // Получаем значение IQ из параметров URL
    const userName = getQueryParam('name'); // Получаем имя пользователя из параметров URL

    const userPercentile = calculatePercentile(userIq);
    const smarterThanPercent = (100 - userPercentile).toFixed(2);

    const userNameElement = document.getElementById('user-name');
    const iqScoreElement = document.getElementById('iq-score');
    const messageElement = document.getElementById('user-message'); // Убедитесь, что у вас есть элемент с ID 'user-message'

    userNameElement.textContent = decodeURIComponent(userName); // Устанавливаем имя пользователя
    iqScoreElement.textContent = userIq; // Устанавливаем IQ пользователя

    const message = `Вы принадлежите к ${userPercentile.toFixed(2)}% людей мира. Вы умнее, чем ${smarterThanPercent}% населения.`;
   
    document.getElementById('iq-level-indicator').textContent = message;
  }
  displayResults(); // Вызываем функцию displayResults
});

