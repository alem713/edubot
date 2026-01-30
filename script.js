const mainApp = document.getElementById('app');

function showSection(name) {
    if (name === 'ai') {
        mainApp.innerHTML = `
            <div class="card">
                <h2>🤖 AI Помощник по ДЗ</h2>
                <p>Введи задание, и я помогу найти решение.</p>
                <textarea id="taskInput" placeholder="Например: Реши уравнение x²-5x+6=0"></textarea>
                <button class="primary-btn" onclick="askAI()">Решить задачу</button>
                <p id="aiOutput" style="margin-top:20px; color:#94a3b8;"></p>
            </div>
        `;
    } else if (name === 'ent') {
        mainApp.innerHTML = `
            <div class="card">
                <h2>🧮 Калькулятор ЕНТ</h2>
                <input type="number" id="h1" placeholder="История Казахстана (max 20)">
                <input type="number" id="h2" placeholder="Мат. грамотность (max 10)">
                <input type="number" id="h3" placeholder="Грамотность чтения (max 10)">
                <input type="number" id="h4" placeholder="Профильный предмет 1 (max 50)">
                <input type="number" id="h5" placeholder="Профильный предмет 2 (max 50)">
                <button class="primary-btn" onclick="calcENT()">Посчитать баллы</button>
                <h2 id="result" style="margin-top:20px; color:#6366f1;"></h2>
            </div>
        `;
    } else if (name === 'courses') {
        mainApp.innerHTML = `
            <div class="card">
                <h2>📚 Мини-курсы</h2>
                <div style="text-align: left; margin-top: 20px;">
                    <div style="padding:15px; background:#1e293b; border-radius:10px; margin-bottom:10px;">🔥 ЕНТ 2026: Математика</div>
                    <div style="padding:15px; background:#1e293b; border-radius:10px; margin-bottom:10px;">📖 Грамотность: Лайфхаки</div>
                    <div style="padding:15px; background:#1e293b; border-radius:10px; margin-bottom:10px;">🧪 Химия/Биология: База</div>
                </div>
            </div>
        `;
    }
}

function calcENT() {
    const scores = [
        +document.getElementById('h1').value || 0,
        +document.getElementById('h2').value || 0,
        +document.getElementById('h3').value || 0,
        +document.getElementById('h4').value || 0,
        +document.getElementById('h5').value || 0
    ];
    const total = scores.reduce((a, b) => a + b, 0);
    document.getElementById('result').innerText = `Итог: ${total} / 140`;
}

function askAI() {
    const out = document.getElementById('aiOutput');
    out.innerText = "Edumaster анализирует задание... Пожалуйста, подождите.";
    setTimeout(() => {
        out.innerText = "Готово! Для решения этого уравнения используйте теорему Виета: корни 2 и 3.";
    }, 1500);
}
