const mainApp = document.getElementById('app');

function showSection(name) {
    if (name === 'ai') {
        mainApp.innerHTML = `
            <div class="card">
                <h2>🤖 Помощник по ДЗ</h2>
                <p>Введи вопрос, и я помогу разобраться.</p>
                <textarea id="taskInput" placeholder="Например: Как решить квадратное уравнение?"></textarea>
                <button class="primary-btn" onclick="askAI()">Получить помощь</button>
                <p id="aiOutput" style="margin-top:20px; color:#94a3b8;"></p>
            </div>`;
    } else if (name === 'ent') {
        mainApp.innerHTML = `
            <div class="card">
                <h2>🧮 Калькулятор ЕНТ</h2>
                <input type="number" id="h1" placeholder="История Казахстана">
                <input type="number" id="h2" placeholder="Мат. грамотность">
                <input type="number" id="h3" placeholder="Грамотность чтения">
                <input type="number" id="h4" placeholder="Профильный 1">
                <input type="number" id="h5" placeholder="Профильный 2">
                <button class="primary-btn" onclick="calcENT()">Посчитать баллы</button>
                <h2 id="result" style="margin-top:20px; color:#6366f1;"></h2>
            </div>`;
    } else if (name === 'courses') {
        mainApp.innerHTML = `
            <div class="card">
                <h2>📚 Мини-курсы</h2>
                <div class="course-item"><b>ЕНТ Интенсив:</b> Подготовка за 3 месяца</div>
                <div class="course-item"><b>Математика:</b> Алгебра и Геометрия</div>
                <div class="course-item"><b>Физика:</b> Понятные законы</div>
            </div>`;
    }
}

function calcENT() {
    const s1 = +document.getElementById('h1').value || 0;
    const s2 = +document.getElementById('h2').value || 0;
    const s3 = +document.getElementById('h3').value || 0;
    const s4 = +document.getElementById('h4').value || 0;
    const s5 = +document.getElementById('h5').value || 0;
    document.getElementById('result').innerText = "Итог: " + (s1+s2+s3+s4+s5) + " / 140";
}

function askAI() {
    const out = document.getElementById('aiOutput');
    out.innerText = "Edumaster думает... (GPT-интеграция в процессе)";
    setTimeout(() => { out.innerText = "Я готов помочь! Напиши конкретное условие задачи."; }, 1200);
}
