// Данные пользователя
let currentUser = null;
let tasks = JSON.parse(localStorage.getItem('edumaster_tasks')) || [];

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    loadTasks();
    setupEventListeners();
});

// Загрузка данных пользователя
function loadUserData() {
    const savedUser = localStorage.getItem('edumaster_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUI();
    }
}

// Обновление интерфейса
function updateUI() {
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    
    if (authButtons && userMenu) {
        if (currentUser) {
            authButtons.style.display = 'none';
            userMenu.style.display = 'flex';
            document.getElementById('userName').textContent = currentUser.name;
            document.getElementById('userAvatar').textContent = 
                currentUser.name.charAt(0).toUpperCase();
        } else {
            authButtons.style.display = 'flex';
            userMenu.style.display = 'none';
        }
    }
}

// Загрузка задач
function loadTasks() {
    const taskList = document.getElementById('taskList');
    if (!taskList) return;
    
    if (!tasks.length) {
        taskList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--gray-color);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📝</div>
                <h3>Нет задач</h3>
                <p>Добавьте свою первую задачу</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    tasks.forEach((task, index) => {
        html += `
        <div class="task-item">
            <div style="width: 20px; height: 20px; border: 2px solid #ddd; 
                       border-radius: 4px; cursor: pointer; 
                       ${task.completed ? 'background: #4CAF50; color: white; text-align: center;' : ''}"
                 onclick="toggleTask(${index})">
                ${task.completed ? '✓' : ''}
            </div>
            <div style="flex: 1;">
                <div style="font-weight: 600; ${task.completed ? 'text-decoration: line-through;' : ''}">
                    ${task.title}
                </div>
                <div style="font-size: 0.875rem; color: var(--gray-color); margin-top: 0.25rem;">
                    📅 ${task.deadline ? new Date(task.deadline).toLocaleDateString('ru-RU') : 'Без срока'} | 
                    🎯 ${task.priority}
                </div>
            </div>
            <button onclick="deleteTask(${index})" style="background: none; border: none; 
                   color: #ff4444; cursor: pointer; font-size: 1.2rem;">
                ×
            </button>
        </div>`;
    });
    
    taskList.innerHTML = html;
}

// Добавить задачу
function addNewTask() {
    if (!currentUser) {
        alert('Сначала войдите в систему');
        return;
    }
    
    const title = prompt('Название задачи:');
    if (!title) return;
    
    const deadline = prompt('Дедлайн (гггг-мм-дд):');
    const priority = prompt('Приоритет (низкий/средний/высокий):', 'средний');
    
    const task = {
        id: Date.now(),
        title: title,
        deadline: deadline || null,
        priority: priority || 'средний',
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    localStorage.setItem('edumaster_tasks', JSON.stringify(tasks));
    loadTasks();
    alert('Задача добавлена!');
}

// Отметить задачу выполненной
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('edumaster_tasks', JSON.stringify(tasks));
    loadTasks();
}

// Удалить задачу
function deleteTask(index) {
    if (confirm('Удалить задачу?')) {
        tasks.splice(index, 1);
        localStorage.setItem('edumaster_tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

// Регистрация
function register() {
    const name = prompt('Ваше имя:');
    if (!name) return;
    
    const email = prompt('Email:');
    if (!email) return;
    
    const password = prompt('Пароль:');
    if (!password) return;
    
    const grade = prompt('Ваш класс (1-11):');
    if (!grade) return;
    
    const user = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        grade: parseInt(grade),
        progress: {
            math: 0,
            physics: 0,
            chemistry: 0,
            biology: 0,
            russian: 0
        },
        createdAt: new Date().toISOString()
    };
    
    // Сохраняем пользователя
    localStorage.setItem('edumaster_current_user', JSON.stringify(user));
    currentUser = user;
    updateUI();
    
    alert(`Добро пожаловать, ${name}!`);
}

// Вход
function login() {
    const email = prompt('Email:');
    const password = prompt('Пароль:');
    
    if (email && password) {
        // В демо-версии просто создаем пользователя
        const user = {
            id: Date.now(),
            name: 'Ученик',
            email: email,
            grade: 5
        };
        
        localStorage.setItem('edumaster_current_user', JSON.stringify(user));
        currentUser = user;
        updateUI();
        alert('Вход выполнен!');
    }
}

// Выход
function logout() {
    if (confirm('Выйти из аккаунта?')) {
        localStorage.removeItem('edumaster_current_user');
        currentUser = null;
        updateUI();
        alert('Вы вышли из системы');
    }
}

// Начать курс
function startCourse(subject) {
    if (!currentUser) {
        alert('Сначала войдите в систему');
        return;
    }
    
    alert(`Начинаем курс "${subject}" для ${currentUser.grade} класса!`);
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId)?.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
// Функция для выбора класса
function selectGrade(grade) {
    // Проверяем, авторизован ли пользователь
    const user = JSON.parse(localStorage.getItem('edumaster_current_user'));
    
    if (!user) {
        // Если не авторизован, показываем красивый алерт
        const result = confirm(`🎓 Для доступа к курсам ${grade} класса нужно войти в систему.\n\nХотите войти сейчас?`);
        if (result) {
            login();
        }
        return;
    }
    
    // Сохраняем выбранный класс
    user.grade = grade;
    localStorage.setItem('edumaster_current_user', JSON.stringify(user));
    
    // Показываем сообщение о выборе
    alert(`✅ Выбран ${grade} класс!\n\n📚 Загружаем курсы...`);
    
    // Переходим на страницу курсов
    // Сначала создадим простую страницу, потом можно будет заменить
    showGradeCourses(grade);
}

// Функция для показа курсов выбранного класса
function showGradeCourses(grade) {
    // Создаем модальное окно с курсами
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Данные курсов для каждого класса
    const coursesData = {
        1: ["🔤 Чтение и письмо", "🔢 Математика для малышей", "🌍 Окружающий мир", "🎨 Творчество"],
        2: ["📖 Русский язык", "➕ Математика", "🎵 Музыка", "🏃‍♂️ Физкультура"],
        3: ["📐 Математика", "📚 Литература", "🔬 Природоведение", "🎭 Искусство"],
        4: ["📊 Математика углубленно", "✍️ Русский язык", "🌎 География", "📜 История"],
        5: ["𝑥 Алгебра начало", "🌿 Биология", "🗺️ География", "📜 История Казахстана"],
        6: ["📐 Геометрия", "⚡ Физика начало", "🧪 Химия начало", "🌍 География мира"],
        7: ["📈 Алгебра", "🔭 Физика", "⚗️ Химия", "💻 Информатика"],
        8: ["📐 Геометрия углубленно", "🔌 Электричество", "🧬 Биология", "💾 Программирование"],
        9: ["🎯 Математика ОГЭ", "🎯 Физика ОГЭ", "🎯 Химия ОГЭ", "🎯 Русский ОГЭ", "🎯 История ОГЭ"],
        10: ["∫ Матанализ", "🌌 Квантовая физика", "🔬 Химия", "💻 Программирование", "🇬🇧 Английский"],
        11: ["🎯 Математика ЕГЭ", "🎯 Физика ЕГЭ", "🎯 Химия ЕГЭ", "🎯 Русский ЕГЭ", "🎯 Английский ЕГЭ"]
    };
    
    const courses = coursesData[grade] || coursesData[5];
    
    modal.innerHTML = `
        <div style="background: white; border-radius: 20px; padding: 2.5rem; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto; animation: slideUp 0.3s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                <h2 style="color: var(--primary-color); font-size: 1.8rem;">
                    🎓 Курсы для ${grade} класса
                </h2>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">
                    ✕
                </button>
            </div>
            
            <div style="margin-bottom: 1.5rem; color: #666;">
                Выберите курс для начала обучения
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${courses.map(course => `
                    <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 12px; cursor: pointer; transition: all 0.3s;"
                         onclick="startCourse('${course.split(' ')[1]}', ${grade})">
                        <div style="display: flex; align-items: center; gap: 15px;">
                            <div style="font-size: 1.5rem;">${course.split(' ')[0]}</div>
                            <div>
                                <div style="font-weight: 600; margin-bottom: 0.25rem;">${course.split(' ').slice(1).join(' ')}</div>
                                <div style="font-size: 0.875rem; color: #666;">Нажмите для начала курса</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #eee; text-align: center;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: #666; color: white; border: none; padding: 0.75rem 2rem; border-radius: 10px; cursor: pointer;">
                    Закрыть
                </button>
            </div>
        </div>
    `;
    
    // Добавляем анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { 
                opacity: 0;
                transform: translateY(30px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(modal);
    
    // Закрытие по клику на фон
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.remove();
        }
    });
}

// Функция начала курса
function startCourse(courseName, grade) {
    alert(`🚀 Начинаем курс "${courseName}" для ${grade} класса!\n\nСкоро здесь будут уроки и задания!`);
    // Можно добавить сохранение прогресса
    localStorage.setItem(`current_course_${grade}`, courseName);
}
