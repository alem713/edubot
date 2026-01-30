const app = document.getElementById('app');

// База данных проходных баллов (примерная, для демонстрации)
const universityData = [
    { name: "Astana IT University", score: 105, subj: "Informatics" },
    { name: "SDU (Suleyman Demirel)", score: 100, subj: "Informatics" },
    { name: "КазНУ им. Аль-Фараби", score: 115, subj: "Informatics" },
    { name: "ЕНУ им. Гумилева", score: 95, subj: "Informatics" },
    { name: "Satbayev University", score: 85, subj: "Physics" }
];

function showSection(section) {
    app.innerHTML = '';
    let content = '';
    
    if (section === 'ai') {
        content = `
            <div class="card">
                <h2>🤖 ИИ Тьютор + Voice <i class="fas fa-microphone-alt"></i></h2>
                <p style="color:#94a3b8;">Напиши вопрос или нажми на микрофон:</p>
                
                <div style="position:relative;">
                    <textarea id="aiInput" rows="4" placeholder="Спроси меня о физике, математике или истории..."></textarea>
                    <button onclick="startDictation()" style="position:absolute; right:10px; bottom:10px; background:#ef4444; border-radius:50%; width:40px; height:40px; border:none; color:white; cursor:pointer;" title="Голосовой ввод">
                        <i class="fas fa-microphone"></i>
                    </button>
                </div>

                <button class="primary-btn" onclick="aiReply()">Получить ответ</button>
                <div id="aiRes" class="result-box" style="display:none"></div>
            </div>`;
    } else if (section === 'ent') {
        // Загружаем сохраненные данные, если есть
        const savedScore = localStorage.getItem('lastScore') || '';
        
        content = `
            <div class="card">
                <h2>🎓 Аналитика Грантов</h2>
                <p style="color:#94a3b8; margin-bottom:15px;">Узнай свои шансы на поступление</p>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                    <input type="number" id="s_hist" placeholder="История (20)">
                    <input type="number" id="s_read" placeholder="Чтение (10)">
                    <input type="number" id="s_math" placeholder="Мат. грам (10)">
                    <input type="number" id="s_p1" placeholder="Профиль 1 (50)">
                    <input type="number" id="s_p2" placeholder="Профиль 2 (50)">
                </div>

                <button class="primary-btn" onclick="analyzeGrant()">Рассчитать шансы</button>
                <div id="grantRes" class="result-box" style="display:none; text-align:left;"></div>
            </div>`;
    } else if (section === 'courses') {
        content = `
            <div class="card">
                <h2>📚 Умные Курсы</h2>
                <div class="course-item">
                    <h3>🐍 Python для начинающих</h3>
                    <div style="width:100%; background:#334155; height:10px; border-radius:5px; margin:10px 0;">
                        <div style="width:45%; background:#22c55e; height:100%; border-radius:5px;"></div>
                    </div>
                    <p style="font-size:12px;">Прогресс: 45%</p>
                </div>
            </div>`;
    }
    app.innerHTML = content;
}

// --- ФУНКЦИЯ 1: ГОЛОСОВОЙ ВВОД (Web Speech API) ---
function startDictation() {
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = "ru-RU";
        recognition.start();

        document.getElementById('aiInput').placeholder = "Слушаю...";

        recognition.onresult = function(e) {
            document.getElementById('aiInput').value = e.results[0][0].transcript;
            document.getElementById('aiInput').placeholder = "Готово!";
        };

        recognition.onerror = function(e) {
            alert("Ошибка микрофона. Разрешите доступ в браузере.");
        };
    } else {
        alert("Ваш браузер не поддерживает голосовой ввод (попробуйте Chrome).");
    }
}

// --- ФУНКЦИЯ 2: АНАЛИЗАТОР ГРАНТОВ ---
function analyzeGrant() {
    // Собираем баллы
    const inputs = ['s_hist', 's_read', 's_math', 's_p1', 's_p2'];
    let total = 0;
    inputs.forEach(id => total += Number(document.getElementById(id).value));

    // Сохраняем в память браузера (LocalStorage)
    localStorage.setItem('lastScore', total);

    let html = `<h3>Твой балл: <span style="color:#fff; font-size:1.5em">${total}</span></h3><hr style="border-color:#ffffff20">`;
    
    // Алгоритм подбора ВУЗов
    let chances = universityData.map(uni => {
        const diff = total - uni.score;
        let color = diff >= 0 ? '#22c55e' : '#ef4444'; // Зеленый или Красный
        let status = diff >= 0 ? 'Проходишь ✅' : `Не хватает ${Math.abs(diff)} ❌`;
        return `<div style="margin-bottom:10px; display:flex; justify-content:space-between;">
                    <span>${uni.name}</span>
                    <span style="color:${color}; font-weight:bold;">${status}</span>
                </div>`;
    }).join('');

    const box = document.getElementById('grantRes');
    box.style.display = 'block';
    box.innerHTML = html + chances;
}

// Имитация ИИ (для демо версии)
function aiReply() {
    const q = document.getElementById('aiInput').value.toLowerCase();
    const box = document.getElementById('aiRes');
    box.style.display = 'block';
    box.innerText = "Думаю...";
    
    setTimeout(() => {
        if(q.includes("привет")) box.innerText = "Привет! Готов помочь с учебой.";
        else if(q.includes("формул")) box.innerText = "Вот основные формулы: F=ma (Ньютон), E=mc² (Эйнштейн).";
        else box.innerText = "Интересный вопрос! Для детального ответа мне нужно подключение к GPT-4 (в разработке).";
    }, 1000);
}
