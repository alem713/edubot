const app = document.getElementById('app');

// База данных ВУЗов (Демо-данные)
const universities = [
    { name: "Astana IT University", min: 105 },
    { name: "SDU University", min: 100 },
    { name: "КазНУ им. Аль-Фараби", min: 115 },
    { name: "AUES (Энергетический)", min: 85 },
    { name: "ЕНУ им. Гумилева", min: 95 }
];

function showSection(section) {
    app.innerHTML = '';
    
    if (section === 'ai') {
        app.innerHTML = `
            <div class="card">
                <h2>🤖 Голосовой AI Тьютор</h2>
                <p style="color:#94a3b8">Нажми на микрофон и задай вопрос.</p>
                <div style="position:relative; margin-top:20px;">
                    <textarea id="voiceInput" rows="4" placeholder="Я слушаю..."></textarea>
                    <button onclick="startVoice()" style="position:absolute; bottom:10px; right:10px; border-radius:50%; width:45px; height:45px; background:#ef4444; border:none; color:white; cursor:pointer; box-shadow:0 0 10px rgba(239,68,68,0.5);">
                        <i class="fas fa-microphone"></i>
                    </button>
                </div>
                <button class="primary-btn" onclick="aiResponse()">Отправить вопрос</button>
                <div id="aiOut" class="result-box" style="display:none"></div>
            </div>`;
    } 
    
    else if (section === 'ent') {
        // Достаем сохраненный балл из памяти (Local Storage)
        let saved = localStorage.getItem('myScore') || '';
        
        app.innerHTML = `
            <div class="card">
                <h2>📊 Анализатор Грантов</h2>
                <p>Введи свои баллы ЕНТ:</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <input type="number" id="s1" placeholder="История (20)">
                    <input type="number" id="s2" placeholder="Чтение (10)">
                    <input type="number" id="s3" placeholder="Мат.грам (10)">
                    <input type="number" id="s4" placeholder="Профиль 1 (50)">
                    <input type="number" id="s5" placeholder="Профиль 2 (50)">
                </div>
                <button class="primary-btn" onclick="checkGrant()">Рассчитать шансы</button>
                <div id="grantResult" class="result-box" style="display:none; text-align:left"></div>
            </div>`;
    } 
    
    else if (section === 'courses') {
        app.innerHTML = `
            <div class="card">
                <h2>📚 Прогресс обучения</h2>
                <div class="course-item">
                    <h3>💻 Информатика: Python</h3>
                    <div style="background:#334155; height:8px; border-radius:4px; margin:10px 0;">
                        <div style="background:#22c55e; width:70%; height:100%; border-radius:4px;"></div>
                    </div>
                    <small>Пройдено 70%</small>
                </div>
                <div class="course-item">
                    <h3>📐 Математика: Интегралы</h3>
                    <div style="background:#334155; height:8px; border-radius:4px; margin:10px 0;">
                        <div style="background:#f59e0b; width:30%; height:100%; border-radius:4px;"></div>
                    </div>
                    <small>Пройдено 30%</small>
                </div>
            </div>`;
    }
}

// --- ФУНКЦИЯ: ГОЛОСОВОЙ ВВОД ---
function startVoice() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Голосовой ввод работает только в Google Chrome!");
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "ru-RU";
    document.getElementById('voiceInput').placeholder = "Говорите сейчас...";
    
    recognition.onresult = function(event) {
        document.getElementById('voiceInput').value = event.results[0][0].transcript;
    };
    recognition.start();
}

function aiResponse() {
    const text = document.getElementById('voiceInput').value;
    const out = document.getElementById('aiOut');
    out.style.display = 'block';
    out.innerText = `AI Думает над вопросом: "${text}"... \n(Здесь будет ответ от нейросети)`;
}

// --- ФУНКЦИЯ: РАСЧЕТ ГРАНТОВ ---
function checkGrant() {
    const score = (+document.getElementById('s1').value) + 
                  (+document.getElementById('s2').value) + 
                  (+document.getElementById('s3').value) + 
                  (+document.getElementById('s4').value) + 
                  (+document.getElementById('s5').value);
    
    // Сохраняем в память браузера!
    localStorage.setItem('myScore', score);

    let html = `<h3>Твой балл: ${score} / 140</h3><hr style="opacity:0.2; margin:10px 0;">`;
    
    universities.forEach(uni => {
        const pass = score >= uni.min;
        const color = pass ? '#4ade80' : '#f87171';
        const icon = pass ? '✅' : '❌';
        html += `<div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                    <span>${uni.name}</span>
                    <span style="color:${color}; font-weight:bold">${icon} (мин. ${uni.min})</span>
                 </div>`;
    });

    const res = document.getElementById('grantResult');
    res.style.display = 'block';
    res.innerHTML = html;
}
