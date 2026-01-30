const app = document.getElementById('app');

function showSection(section) {
    // 1. Сначала очищаем контент
    app.innerHTML = '';
    
    // 2. Создаем новую карточку
    let content = '';
    
    if (section === 'ai') {
        content = `
            <div class="card">
                <h2>🤖 ИИ Помощник</h2>
                <p style="color:#94a3b8; margin-bottom:20px;">Опиши задачу, и я подскажу решение.</p>
                <textarea id="aiInput" rows="4" placeholder="Например: Как найти площадь треугольника?"></textarea>
                <button class="primary-btn" onclick="aiReply()">Спросить</button>
                <div id="aiRes" class="result-box" style="display:none"></div>
            </div>`;
    } else if (section === 'ent') {
        content = `
            <div class="card">
                <h2>🧮 Калькулятор ЕНТ</h2>
                <input type="number" id="s1" placeholder="История Казахстана (max 20)">
                <input type="number" id="s2" placeholder="Мат. грамотность (max 10)">
                <input type="number" id="s3" placeholder="Грамотность чтения (max 10)">
                <input type="number" id="s4" placeholder="Профиль 1 (max 50)">
                <input type="number" id="s5" placeholder="Профиль 2 (max 50)">
                <button class="primary-btn" onclick="calc()">Рассчитать итог</button>
                <div id="entRes" class="result-box" style="display:none"></div>
            </div>`;
    } else if (section === 'courses') {
        content = `
            <div class="card">
                <h2>📚 Библиотека курсов</h2>
                <div style="display:grid; gap:15px; text-align:left;">
                    <div style="background:#0f172a; padding:15px; border-radius:10px; border:1px solid #334155;">
                        <h3 style="margin:0; color:#6366f1">ЕНТ Интенсив</h3>
                        <p style="margin:5px 0 0; color:#94a3b8; font-size:14px;">Подготовка за 3 месяца</p>
                    </div>
                    <div style="background:#0f172a; padding:15px; border-radius:10px; border:1px solid #334155;">
                        <h3 style="margin:0; color:#a855f7">Математика</h3>
                        <p style="margin:5px 0 0; color:#94a3b8; font-size:14px;">5-9 классы: вся база</p>
                    </div>
                </div>
            </div>`;
    }
    
    app.innerHTML = content;
}

function calc() {
    const sum = (+document.getElementById('s1').value) + 
                (+document.getElementById('s2').value) + 
                (+document.getElementById('s3').value) + 
                (+document.getElementById('s4').value) + 
                (+document.getElementById('s5').value);
    
    const box = document.getElementById('entRes');
    box.style.display = 'block';
    box.innerText = `Твой результат: ${sum} из 140`;
}

function aiReply() {
    const box = document.getElementById('aiRes');
    box.style.display = 'block';
    box.innerText = "Edumaster думает... (Здесь будет ответ нейросети)";
    setTimeout(() => {
        box.innerText = "Ответ: Для решения используй формулу S = 1/2 * a * h";
    }, 1500);
}
