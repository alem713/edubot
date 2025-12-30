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
// Выбор класса
// Выбор класса - переход на страницу курсов
function selectGrade(grade) {
    // Проверяем, авторизован ли пользователь
    const user = JSON.parse(localStorage.getItem('edumaster_current_user'));
    
    if (!user) {
        if (confirm('Для просмотра курсов нужно войти в систему. Войти сейчас?')) {
            login();
        }
        return false;
    }
    
    // Сохраняем выбранный класс в профиле пользователя
    user.grade = grade;
    localStorage.setItem('edumaster_current_user', JSON.stringify(user));
    
    // Перенаправляем на страницу курсов
    window.location.href = `courses/courses.html?grade=${grade}`;
    
    return true;
}
    
    // Показать курсы для выбранного класса
    const courses = {
        1: ['Чтение', 'Письмо', 'Счет', 'Окружающий мир'],
        2: ['Математика', 'Русский язык', 'Литература'],
        3: ['Математика', 'Русский', 'Окружающий мир'],
        4: ['Все основные предметы', 'Подготовка к средней школе'],
        5: ['Алгебра начало', 'География', 'Биология'],
        6: ['Алгебра', 'Геометрия', 'Биология'],
        7: ['Физика начало', 'Химия начало', 'Алгебра'],
        8: ['Геометрия', 'Физика', 'Химия', 'Алгебра'],
        9: ['Подготовка к ОГЭ', 'Физика', 'Химия', 'Математика'],
        10: ['Углубленная математика', 'Физика', 'Химия', 'Биология'],
        11: ['Подготовка к ЕГЭ', 'Все предметы']
    };
    
    const gradeCourses = courses[grade] || ['Общие курсы'];
    
    let message = `🎓 Выбран ${grade} класс!\n\n📚 Доступные курсы:\n`;
    gradeCourses.forEach(course => {
        message += `• ${course}\n`;
    });
    
    message += `\nХотите начать курс по математике?`;
    
    if (confirm(message)) {
        startCourse('математика');
    }
}
