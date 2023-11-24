document.addEventListener('DOMContentLoaded', function() {
  const startTestBtn = document.querySelector('.start-test-btn');
  const testInfoContainer = document.querySelector('.test-info-container');
  const testQuestions = document.getElementById('test-questions');
  const currentQuestionNumberEl = document.getElementById('current-question-number');
  const prevQuestionBtn = document.getElementById('prev-question-btn');
  const nextQuestionBtn = document.getElementById('next-question-btn');
  
  let currentQuestionIndex = 1;
  let score = 30;

  const questions = [
    {
      questionText: "Выберите недостающую фигуру",
      questionImage: "img/test/question1.svg",
      answers: [
        { label: 'A', image: "img/test/answer1_a.svg", isCorrect: false },
        { label: 'B', image: "img/test/answer1_b.svg", isCorrect: true },
        { label: 'C', image: "img/test/answer1_c.svg", isCorrect: false },
        { label: 'D', image: "img/test/answer1_d.svg", isCorrect: false },
        { label: 'E', image: "img/test/answer1_e.svg", isCorrect: false },
        { label: 'F', image: "img/test/answer1_f.svg", isCorrect: false }
      ]
    },
    {
      questionText: "Выберите недостающую фигуру",
      questionImage: "img/test/question2.svg",
      answers: [
        { label: 'A', image: "img/test/answer2_a.svg", isCorrect: false },
        { label: 'B', image: "img/test/answer2_b.svg", isCorrect: true },
        { label: 'C', image: "img/test/answer2_c.svg", isCorrect: false },
        { label: 'D', image: "img/test/answer2_d.svg", isCorrect: false },
        { label: 'E', image: "img/test/answer2_e.svg", isCorrect: false },
        { label: 'F', image: "img/test/answer2_f.svg", isCorrect: false }
      ]
    },
    
    
  ];

  function loadQuestion(index) {
    const question = questions[index - 1];
    document.querySelector('.question-block h2').textContent = question.questionText;
    const questionImageEl = document.querySelector('.question-images img');
    questionImageEl.src = question.questionImage;
    questionImageEl.alt = question.questionText;

    const answersContainer = document.querySelector('.answers');
    answersContainer.innerHTML = '';

    question.answers.forEach(answer => {
      const answerButton = document.createElement('button');
      answerButton.className = 'answer-btn';
      answerButton.innerHTML = `<img src="${answer.image}" alt="Ответ ${answer.label}"><span class="answer-label">${answer.label}</span>`;
      answerButton.onclick = () => checkAnswer(answer.isCorrect);
      answersContainer.appendChild(answerButton);
    });

    currentQuestionNumberEl.textContent = `${index}/${questions.length}`;
    prevQuestionBtn.style.display = index === 1 ? 'none' : 'inline-block';
  }

  function checkAnswer(isCorrect) {
    if (isCorrect) {
      score += 3;
      
    } else {
      
    }
    nextQuestion();
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
      currentQuestionIndex++;
      loadQuestion(currentQuestionIndex);
    } else {
      finishTest();
    }
  }

 function finishTest() {
// Скрываем блок вопросов
  testQuestions.style.display = 'none';

  // Показываем форму для заполнения
  document.getElementById('result-form').style.display = 'block';

  // Вычисляем итоговый результат теста
  document.getElementById('test-result').value = score; // Используем score, а не correctAnswersCount
}

// Обработчик для кнопки отправки результатов
function submitResults() {
  // Получаем данные из формы
  const userName = document.getElementById('user-name').value;
  const userEmail = document.getElementById('user-email').value;
  const userGender = document.getElementById('user-gender').value;
  const userBirthYear = document.getElementById('user-birthdate').value.split('-')[0]; // Извлекаем только год
  const userEducation = document.getElementById('user-education').value;
  const educationLevel = document.getElementById('education-level').value;
  const testResult = document.getElementById('test-result').value; // Убедитесь, что это поле заполняется в процессе теста

  // Проверяем, что все поля заполнены
  if (!userName || !userEmail || !userGender || !userBirthYear || !userEducation || !educationLevel) {
    alert('Пожалуйста, заполните все поля.');
    return false; // Прерываем дальнейшее выполнение
  }

  // Валидация Email
  if (!validateEmail(userEmail)) {
    alert('Введите корректный Email.');
    return false; // Прерываем дальнейшее выполнение
  }
// Правильно
  saveResult({
    name: userName,
     userBirthdate: userBirthYear, 
    score: score,
    date: new Date().toLocaleString()
  });

 window.location.href = `results.html?name=${encodeURIComponent(userName)}&score=${encodeURIComponent(testResult)}&year=${encodeURIComponent(userBirthYear)}`;

}

function saveResult(result) {
  // Получаем текущий список результатов или создаем новый, если он еще не существует
  const results = JSON.parse(localStorage.getItem('testResults')) || [];
  results.push(result);
  
  // Ограничиваем количество результатов до 20
  const latestResults = results.slice(-20);

  
  // Сохраняем обновленный список результатов
  localStorage.setItem('testResults', JSON.stringify(latestResults));
}


document.addEventListener('DOMContentLoaded', function() {
  displayResults();
});

function displayResults() {
  // Загружаем результаты из localStorage
  const results = JSON.parse(localStorage.getItem('testResults')) || [];
  
  // Сортируем результаты по дате
  results.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Создаем HTML для списка результатов
  const listContainer = document.querySelector('.results-list-container');
  listContainer.innerHTML = ''; // Очищаем текущий список
  results.forEach(result => {
    listContainer.innerHTML += `<div class="result-item">${result.name} - IQ ${result.score} <span>${result.date}</span></div>`;
  });
}




document.getElementById('submit-result-btn').addEventListener('click', submitResults);
document.getElementById('user-details-form').addEventListener('submit', function(event) {
  event.preventDefault();
  submitResults();
});


// Функция валидации Email
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}



// Добавляем обработчик для формы
document.getElementById('user-details-form').onsubmit = submitResults;

  startTestBtn.addEventListener('click', () => {
    testInfoContainer.style.display = 'none';
    testQuestions.style.display = 'block';
    loadQuestion(currentQuestionIndex);
  });

  prevQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 1) {
      currentQuestionIndex--;
      loadQuestion(currentQuestionIndex);
    }
  });

  nextQuestionBtn.addEventListener('click', nextQuestion);
});
document.getElementById('submit-result-btn').addEventListener('click', function() {
  const finalScore = document.getElementById('test-result').value;

});
