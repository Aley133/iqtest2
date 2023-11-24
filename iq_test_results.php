<?php
// Замените эти значения своими реальными данными для подключения к базе данных
$servername = "localhost";
$username = "Aley";
$password = "1234";
$dbname = "iq_test_results";

// Создаем соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверяем соединение
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Проверяем, что это POST-запрос
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Предполагаем, что данные приходят с атрибутами 'user_name' и 'score'
    $user_name = $_POST['user_name'];
    $score = $_POST['score'];

    // Подготавливаем SQL запрос для вставки данных
    $stmt = $conn->prepare("INSERT INTO results (user_name, score) VALUES (?, ?)");
    $stmt->bind_param("si", $user_name, $score);
    
    // Выполняем запрос и проверяем на ошибки
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Закрываем запрос
    $stmt->close();
}

// Закрываем соединение
$conn->close();
?>