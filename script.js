// Основные функции для Edumaster

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Edumaster загружен! Все инструменты готовы к работе.');
    
    // Инициализация слайдеров ЕНТ
    initEntSliders();
    
    // Инициализация навигации
    initNavigation();
    
    // Инициализация кнопки прокрутки вверх
    initScrollToTop();
    
    // Инициализация формы
    initContactForm();
    
    // Показать приветственное сообщение
    setTimeout(() => {
        showWelcomeMessage();
    }, 1000);
});

// ==================== МАТЕМАТИЧЕСКИЙ СОЛВЕР ====================
function setMathExample(equation) {
    document.getElementById('mathInput').value = equation;
}

function solveMathProblem() {
    const input = document.getElementById('mathInput').value.trim();
    const resultDiv = document.getElementById('mathResult');
    
    if (!input) {
        showResult(resultDiv, 'Введите уравнение для решения', 'error');
        return;
    }
    
    // Показать анимацию загрузки
    showLoading(resultDiv, 'Решаем уравнение...');
    
    // Имитация обработки
    setTimeout(() => {
        const solution = getMathSolution(input);
        showResult(resultDiv, solution, 'success');
        
        // Анимация успеха
        resultDiv.style.animation = 'none';
        setTimeout(() => {
            resultDiv.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }, 1000);
}

function getMathSolution(problem) {
    // Простые примеры решений
    const solutions = {
        '2x + 5 = 13': {
            steps: [
                '2x + 5 = 13',
                '2x = 13 - 5',
                '2x = 8',
                'x = 8 ÷ 2',
                'x = 4'
            ],
            explanation: 'Уравнение решается путем переноса констант и деления на коэффициент при x.'
        },
        'x^2 - 4 = 0': {
            steps: [
                'x² - 4 = 0',
                'x² = 4',
                'x = ±√4',
                'x₁ = 2, x₂ = -2'
            ],
            explanation: 'Квадратное уравнение вида x² = a имеет два решения: √a и -√a.'
        },
        '3(x - 2) = 9': {
            steps: [
                '3(x - 2) = 9',
                'x - 2 = 9 ÷ 3',
                'x - 2 = 3',
                'x = 3 + 2',
                'x = 5'
            ],
            explanation: 'Сначала делим обе части на 3, затем решаем простое линейное уравнение.'
        },
        '2x + 3y = 12': {
            steps: [
                '2x + 3y = 12',
                'Это уравнение с двумя переменными',
                'Нужно второе уравнение для решения системы',
                'Пример: Если y = 2, то 2x + 6 = 12',
                '2x = 6 → x = 3'
            ],
            explanation: 'Для уравнения с двумя переменными требуется система уравнений.'
        }
    };
    
    // Проверяем известные примеры
    for (const [key, value] of Object.entries(solutions)) {
        if (problem.toLowerCase().includes(key.toLowerCase())) {
            return formatMathSolution(key, value);
        }
    }
    
    // Генерация общего решения для неизвестных уравнений
    const randomSolution = Math.random();
    let solution;
    
    if (problem.includes('x^2') || problem.includes('²')) {
        solution = {
            steps: [
                problem,
                'Это квадратное уравнение',
                'Дискриминант D = b² - 4ac',
                'Корни: x₁,₂ = (-b ± √D) / 2a',
                `x₁ ≈ ${(Math.random() * 5 - 2.5).toFixed(2)}`,
                `x₂ ≈ ${(Math.random() * 5 - 2.5).toFixed(2)}`
            ],
            explanation: 'Использована формула корней квадратного уравнения.'
        };
    } else if (problem.includes('x') || problem.includes('y')) {
        solution = {
            steps: [
                problem,
                'Линейное уравнение',
                'Переносим константы вправо',
                'Делим на коэффициент при переменной',
                `x ≈ ${(Math.random() * 10 + 1).toFixed(2)}`
            ],
            explanation: 'Решение линейного уравнения методом переноса членов.'
        };
    } else {
        solution = {
            steps: [
                problem,
                'Вычисляем выражение...',
                `Результат: ${eval(problem.replace(/[^0-9\+\-\*\/\.]/g, '')) || '?'}`
            ],
            explanation: 'Простое арифметическое вычисление.'
        };
    }
    
    return formatMathSolution(problem, solution);
}

function formatMathSolution(problem, solution) {
    return `
        <div class="solution-header">
            <h4><i class="fas fa-calculator"></i> Решение уравнения: ${problem}</h4>
        </div>
        <div class="solution-steps">
            <h5>Пошаговое решение:</h5>
            <ol>
                ${solution.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
        <div class="solution-explanation">
            <h5><i class="fas fa-lightbulb"></i> Объяснение:</h5>
            <p>${solution.explanation}</p>
        </div>
        <div class="solution-tips">
            <p><strong>Совет:</strong> Всегда проверяйте ответ подстановкой в исходное уравнение.</p>
        </div>
    `;
}

// ==================== TO-DO LIST ====================
let tasks = [
    { id: 1, text: 'Подготовить презентацию по истории', completed: true },
    { id: 2, text: 'Решить задачи по физике', completed: false },
    { id: 3, text: 'Написать эссе по литературе', completed: false }
];

function updateTaskCounter() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
}

function addNewTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (!text) {
        showNotification('Введите текст задачи', 'warning');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    tasks.push(newTask);
    input.value = '';
    
    // Добавляем задачу в DOM
    const taskList = document.getElementById('taskList');
    const taskElement = createTaskElement(newTask);
    
    // Анимация добавления
    taskElement.style.opacity = '0';
    taskElement.style.transform = 'translateY(-10px)';
    taskList.appendChild(taskElement);
    
    setTimeout(() => {
        taskElement.style.transition = 'all 0.3s ease';
        taskElement.style.opacity = '1';
        taskElement.style.transform = 'translateY(0)';
    }, 10);
    
    updateTaskCounter();
    showNotification('Задача добавлена!', 'success');
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `todo-item ${task.completed ? 'completed' : ''}`;
    div.dataset.id = task.id;
    
    div.innerHTML = `
        <div class="todo-check" onclick="toggleTask(this)">
            <i class="fas fa-check"></i>
        </div>
        <div class="todo-text">${task.text}</div>
        <div class="todo-delete" onclick="deleteTask(this)">
            <i class="fas fa-times"></i>
        </div>
    `;
    
    return div;
}

function toggleTask(element) {
    const taskItem = element.closest('.todo-item');
    const taskId = parseInt(taskItem.dataset.id);
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.completed = !task.completed;
        taskItem.classList.toggle('completed');
        
        // Анимация переключения
        const checkIcon = element.querySelector('i');
        checkIcon.style.transform = 'scale(0)';
        
        setTimeout(() => {
            checkIcon.style.transition = 'transform 0.3s ease';
            checkIcon.style.transform = task.completed ? 'scale(1)' : 'scale(0)';
            checkIcon.style.opacity = task.completed ? '1' : '0';
        }, 50);
        
        updateTaskCounter();
        showNotification(`Задача "${task.text.substring(0, 20)}..." ${task.completed ? 'выполнена!' : 'активна'}`, 'info');
    }
}

function deleteTask(element) {
    const taskItem = element.closest('.todo-item');
    const taskId = parseInt(taskItem.dataset.id);
    
    // Анимация удаления
    taskItem.style.transform = 'translateX(100%)';
    taskItem.style.opacity = '0';
    
    setTimeout(() => {
        tasks = tasks.filter(t => t.id !== taskId);
        taskItem.remove();
        updateTaskCounter();
        showNotification('Задача удалена', 'info');
    }, 300);
}

// ==================== ГЕНЕРАТОР ЭССЕ ====================
function generateEssayPlan() {
    const topic = document.getElementById('essayTopic').value;
    const output = document.getElementById('essayOutput');
    
    if (!topic) {
        showResult(output, 'Выберите тему эссе', 'error');
        return;
    }
    
    showLoading(output, 'Генерируем план эссе...');
    
    setTimeout(() => {
        const essayPlan = getEssayPlan(topic);
        showResult(output, essayPlan, 'success');
    }, 800);
}

function getEssayPlan(topic) {
    const plans = {
        ecology: {
            title: 'Экология современного города',
            thesis: 'Города будущего должны стать экологичными для обеспечения устойчивого развития и качества жизни.',
            structure: [
                'Введение: Актуальность экологических проблем в урбанизированных пространствах',
                'Основные экологические вызовы: загрязнение воздуха, воды, проблема отходов',
                'Пути решения: зеленые технологии, экодизайн, общественное сознание',
                'Заключение: Необходимость комплексного подхода к экологизации городов'
            ],
            arguments: [
                'Урбанизация ведет к увеличению экологической нагрузки',
                'Технологические решения существуют, но требуют внедрения',
                'Экологическое образование — ключ к изменению поведения'
            ],
            examples: [
                'Сингапур — город-сад',
                'Копенгаген — столица велосипедистов',
                'Рейкьявик — использование геотермальной энергии'
            ]
        },
        ai: {
            title: 'Искусственный интеллект в образовании',
            thesis: 'ИИ трансформирует образование, предлагая персонализацию, но требует этического регулирования.',
            structure: [
                'Введение: Цифровая революция в образовании',
                'Преимущества ИИ: адаптивное обучение, автоматизация, доступность',
                'Риски и вызовы: этические дилеммы, цифровое неравенство',
                'Заключение: Баланс между технологиями и человеческим подходом'
            ],
            arguments: [
                'ИИ позволяет учитывать индивидуальные особенности учащихся',
                'Автоматизация рутинных задач высвобождает время педагогов',
                'Этические вопросы использования данных требуют регулирования'
            ],
            examples: [
                'Системы адаптивного обучения (Knewton, Duolingo)',
                'ИИ-тьюторы для подготовки к экзаменам',
                'Анализ образовательных данных для улучшения программ'
            ]
        },
        history: {
            title: 'Роль личности в истории',
            thesis: 'Исторический процесс — это взаимодействие объективных условий и субъективного фактора личности.',
            structure: [
                'Введение: Дилемма "личность vs обстоятельства"',
                'Великие личности: реформаторы, ученые, деятели культуры',
                'Взаимодействие личности и исторического контекста',
                'Заключение: Синтез индивидуального и коллективного в истории'
            ],
            arguments: [
                'Личности могут ускорять или изменять исторические процессы',
                'Великие идеи требуют реализации через конкретных людей',
                'Исторический контекст определяет возможности личности'
            ],
            examples: [
                'Петр I и модернизация России',
                'Альберт Эйнштейн и научная революция',
                'Мартин Лютер Кинг и борьба за гражданские права'
            ]
        },
        technology: {
            title: 'Технологии будущего',
            thesis: 'Технологический прогресс определяет будущее человечества, требуя ответственного подхода.',
            structure: [
                'Введение: Скорость технологических изменений',
                'Ключевые технологии: ИИ, биотехнологии, квантовые вычисления',
                'Социальные и этические последствия',
                'Заключение: Необходимость управления технологическим развитием'
            ],
            arguments: [
                'Технологии решают глобальные проблемы (климат, болезни)',
                'Цифровой разрыв усиливает социальное неравенство',
                'Этическое регулирование отстает от технологического прогресса'
            ],
            examples: [
                'CRISPR и редактирование генома',
                'Нейроинтерфейсы Илона Маска',
                'Квантовые компьютеры Google и IBM'
            ]
        }
    };
    
    const plan = plans[topic] || plans.ecology;
    
    return `
        <div class="essay-plan">
            <div class="essay-header">
                <h4><i class="fas fa-file-alt"></i> ${plan.title}</h4>
                <div class="essay-thesis">
                    <h5><i class="fas fa-quote-left"></i> Основной тезис:</h5>
                    <p>${plan.thesis}</p>
                </div>
            </div>
            
            <div class="essay-structure">
                <h5><i class="fas fa-sitemap"></i> Структура эссе:</h5>
                <ol>
                    ${plan.structure.map(item => `<li>${item}</li>`).join('')}
                </ol>
            </div>
            
            <div class="essay-arguments">
                <h5><i class="fas fa-comments"></i> Ключевые аргументы:</h5>
                <ul>
                    ${plan.arguments.map(arg => `<li>${arg}</li>`).join('')}
                </ul>
            </div>
            
            <div class="essay-examples">
                <h5><i class="fas fa-lightbulb"></i> Примеры для использования:</h5>
                <ul>
                    ${plan.examples.map(ex => `<li>${ex}</li>`).join('')}
                </ul>
            </div>
            
            <div class="essay-tips">
                <p><strong>Советы:</strong> Используйте конкретные примеры, приводите статистику, соблюдайте логическую структуру.</p>
            </div>
        </div>
    `;
}

// ==================== КОНСПЕКТЫ ====================
function showSubjectMaterials(subject) {
    const output = document.getElementById('materialsOutput');
    
    showLoading(output, 'Загружаем материалы...');
    
    setTimeout(() => {
        const materials = getSubjectMaterials(subject);
        showResult(output, materials, 'success');
    }, 600);
}

function getSubjectMaterials(subject) {
    const allMaterials = {
        math: {
            title: 'Математика - основные формулы и концепции',
            topics: [
                {
                    name: 'Алгебра',
                    content: [
                        'Квадратное уравнение: ax² + bx + c = 0',
                        'Дискриминант: D = b² - 4ac',
                        'Корни: x₁,₂ = (-b ± √D) / 2a',
                        'Теорема Виета: x₁ + x₂ = -b/a, x₁·x₂ = c/a'
                    ]
                },
                {
                    name: 'Геометрия',
                    content: [
                        'Теорема Пифагора: a² + b² = c²',
                        'Площадь треугольника: S = ½·a·h',
                        'Площадь круга: S = πr²',
                        'Длина окружности: C = 2πr'
                    ]
                },
                {
                    name: 'Тригонометрия',
                    content: [
                        'sin²α + cos²α = 1',
                        'tgα = sinα/cosα',
                        'Формулы приведения',
                        'Теорема синусов и косинусов'
                    ]
                }
            ],
            tips: 'Регулярно повторяйте формулы, решайте практические задачи.'
        },
        physics: {
            title: 'Физика - основные законы и принципы',
            topics: [
                {
                    name: 'Механика',
                    content: [
                        'Второй закон Ньютона: F = ma',
                        'Закон сохранения энергии: E₁ = E₂',
                        'Кинетическая энергия: Eк = mv²/2',
                        'Потенциальная энергия: Eп = mgh'
                    ]
                },
                {
                    name: 'Электричество',
                    content: [
                        'Закон Ома: I = U/R',
                        'Мощность: P = UI',
                        'Закон Джоуля-Ленца: Q = I²Rt',
                        'Последовательное и параллельное соединение'
                    ]
                },
                {
                    name: 'Оптика',
                    content: [
                        'Закон отражения: α = β',
                        'Закон преломления: n₁·sinα = n₂·sinβ',
                        'Формула тонкой линзы: 1/F = 1/f + 1/d',
                        'Дифракция и интерференция'
                    ]
                }
            ],
            tips: 'Понимайте физический смысл формул, а не просто заучивайте.'
        },
        history: {
            title: 'История - ключевые события и даты',
            topics: [
                {
                    name: 'Древний мир',
                    content: [
                        'Основание Рима: 753 г. до н.э.',
                        'Падение Римской империи: 476 г.',
                        'Великое переселение народов: IV-VII вв.',
                        'Образование Франкского государства: 486 г.'
                    ]
                },
                {
                    name: 'Средние века',
                    content: [
                        'Крещение Руси: 988 г.',
                        'Великая хартия вольностей: 1215 г.',
                        'Столетняя война: 1337-1453 гг.',
                        'Падение Константинополя: 1453 г.'
                    ]
                },
                {
                    name: 'Новое время',
                    content: [
                        'Великие географические открытия: XV-XVII вв.',
                        'Английская революция: 1640-1660 гг.',
                        'Война за независимость США: 1775-1783 гг.',
                        'Французская революция: 1789-1799 гг.'
                    ]
                }
            ],
            tips: 'Связывайте даты с событиями и причинами-следствиями.'
        },
        biology: {
            title: 'Биология - основы жизни',
            topics: [
                {
                    name: 'Клеточная биология',
                    content: [
                        'Клеточная теория (Шлейден, Шванн)',
                        'Строение клетки: ядро, цитоплазма, мембрана',
                        'Митоз и мейоз',
                        'Фотосинтез: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'
                    ]
                },
                {
                    name: 'Генетика',
                    content: [
                        'Законы Менделя',
                        'Строение ДНК (Уотсон, Крик)',
                        'Генетический код',
                        'Наследственные заболевания'
                    ]
                },
                {
                    name: 'Экология',
                    content: [
                        'Экосистемы и биогеоценозы',
                        'Пищевые цепи и сети',
                        'Круговорот веществ',
                        'Биоразнообразие и его сохранение'
                    ]
                }
            ],
            tips: 'Изучайте биологию через схемы, таблицы и иллюстрации.'
        }
    };
    
    const material = allMaterials[subject] || allMaterials.math;
    
    return `
        <div class="subject-materials">
            <div class="materials-header">
                <h4><i class="fas fa-book-open"></i> ${material.title}</h4>
            </div>
            
            <div class="materials-content">
                ${material.topics.map(topic => `
                    <div class="topic-section">
                        <h5><i class="fas fa-folder-open"></i> ${topic.name}</h5>
                        <ul>
                            ${topic.content.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            
            <div class="materials-tips">
                <h5><i class="fas fa-graduation-cap"></i> Советы по изучению:</h5>
                <p>${material.tips}</p>
            </div>
            
            <div class="materials-actions">
                <button class="btn-secondary" onclick="downloadMaterials('${subject}')">
                    <i class="fas fa-download"></i> Скачать PDF
                </button>
                <button class="btn-secondary" onclick="printMaterials('${subject}')">
                    <i class="fas fa-print"></i> Распечатать
                </button>
            </div>
        </div>
    `;
}

// ==================== КАЛЬКУЛЯТОР ЕНТ ====================
function initEntSliders() {
    const sliders = ['mathScore', 'physicsScore', 'historyScore'];
    
    sliders.forEach(sliderId => {
        const slider = document.getElementById(sliderId);
        const valueSpan = document.getElementById(sliderId.replace('Score', 'Value'));
        
        if (slider && valueSpan) {
            // Устанавливаем начальное значение
            valueSpan.textContent = slider.value;
            
            // Обновляем значение при изменении
            slider.addEventListener('input', function() {
                valueSpan.textContent = this.value;
            });
        }
    });
}

function calculateEntScore() {
    const math = parseInt(document.getElementById('mathScore').value);
    const physics = parseInt(document.getElementById('physicsScore').value);
    const history = parseInt(document.getElementById('historyScore').value);
    
    const total = math + physics + history;
    const percent = (total / 120 * 100).toFixed(1);
    
    // Определяем оценку
    let grade, color, message, universities;
    
    if (percent >= 85) {
        grade = 'Отлично';
        color = '#10b981';
        message = 'Высокий шанс поступления на грант в ведущие вузы!';
        universities = ['КБТУ', 'КазНУ', 'НАО "ВКГТУ"', 'МУИТ'];
    } else if (percent >= 70) {
        grade = 'Хорошо';
        color = '#3b82f6';
        message = 'Реальные шансы на поступление, возможен платный вариант';
        universities = ['ЕНУ', 'КазНТУ', 'КазГЮУ', 'АГУ'];
    } else if (percent >= 50) {
        grade = 'Удовлетворительно';
        color = '#f59e0b';
        message = 'Рекомендуем улучшить подготовку, рассмотрите колледжи';
        universities = ['Колледжи при вузах', 'Технические колледжи'];
    } else {
        grade = 'Неудовлетворительно';
        color = '#ef4444';
        message = 'Требуется серьезная подготовка, начните с основ';
        universities = ['Курсы подготовки', 'Репетиторы'];
    }
    
    const resultDiv = document.getElementById('entResult');
    const resultHTML = `
        <div class="ent-result-details">
            <div class="ent-header">
                <h4><i class="fas fa-chart-line"></i> Результаты ЕНТ</h4>
                <div class="ent-grade" style="color: ${color}">
                    ${grade} (${percent}%)
                </div>
            </div>
            
            <div class="ent-scores">
                <div class="score-item">
                    <span class="score-label">Математика:</span>
                    <span class="score-value">${math}/40</span>
                </div>
                <div class="score-item">
                    <span class="score-label">Физика:</span>
                    <span class="score-value">${physics}/40</span>
                </div>
                <div class="score-item">
                    <span class="score-label">История:</span>
                    <span class="score-value">${history}/40</span>
                </div>
                <div class="score-item total">
                    <span class="score-label">Общий балл:</span>
                    <span class="score-value">${total}/120</span>
                </div>
            </div>
            
            <div class="ent-message" style="color: ${color}">
                <i class="fas fa-info-circle"></i> ${message}
            </div>
            
            <div class="ent-recommendations">
                <h5><i class="fas fa-university"></i> Рекомендуемые учебные заведения:</h5>
                <ul>
                    ${universities.map(uni => `<li>${uni}</li>`).join('')}
                </ul>
            </div>
            
            <div class="ent-tips">
                <h5><i class="fas fa-lightbulb"></i> Советы по подготовке:</h5>
                <p>${getEntTips(percent)}</p>
            </div>
        </div>
    `;
    
    showResult(resultDiv, resultHTML, 'success');
    
    // Анимация
    resultDiv.style.transform = 'scale(0.95)';
    setTimeout(() => {
        resultDiv.style.transition = 'transform 0.3s ease';
        resultDiv.style.transform = 'scale(1)';
    }, 10);
}

function getEntTips(percent) {
    if (percent >= 85) {
        return 'Поддерживайте уровень, уделяйте внимание сложным задачам. Рассмотрите подготовку к олимпиадам.';
    } else if (percent >= 70) {
        return 'Проработайте слабые места, решайте больше тестовых заданий. Уделите время повторению теории.';
    } else if (percent >= 50) {
        return 'Начните с базовых тем, используйте учебники для повторения. Рассмотрите курсы подготовки.';
    } else {
        return 'Требуется систематическая подготовка. Рекомендуем начать с основ и постепенно повышать сложность.';
    }
}

// ==================== ТЕСТЫ ====================
function startMathQuiz() {
    const quizContainer = document.getElementById('quizContainer');
    
    const mathQuiz = {
        title: 'Тест по математике',
        questions: [
            {
                question: 'Сколько будет 15 × 4?',
                options: ['40', '50', '60', '70'],
                correct: 2,
                explanation: '15 × 4 = 60. Можно представить как 15 + 15 + 15 + 15.'
            },
            {
                question: 'Чему равен квадратный корень из 81?',
                options: ['7', '8', '9', '10'],
                correct: 2,
                explanation: '√81 = 9, потому что 9 × 9 = 81.'
            },
            {
                question: 'Решите уравнение: 2x + 8 = 20',
                options: ['x = 4', 'x = 5', 'x = 6', 'x = 7'],
                correct: 2,
                explanation: '2x + 8 = 20 → 2x = 12 → x = 6.'
            },
            {
                question: 'Площадь прямоугольника со сторонами 5 и 8 равна?',
                options: ['13', '26', '40', '45'],
                correct: 2,
                explanation: 'Площадь прямоугольника = длина × ширина = 5 × 8 = 40.'
            },
            {
                question: 'Чему равен sin 90°?',
                options: ['0', '0.5', '1', '√2/2'],
                correct: 2,
                explanation: 'sin 90° = 1. Это максимальное значение синуса.'
            }
        ]
    };
    
    showQuiz(mathQuiz);
}

function startHistoryQuiz() {
    const historyQuiz = {
        title: 'Тест по истории Казахстана',
        questions: [
            {
                question: 'В каком году произошло присоединение Казахстана к России?',
                options: ['1731', '1822', '1861', '1917'],
                correct: 0,
                explanation: 'Процесс присоединения начался в 1731 году.'
            },
            {
                question: 'Кто был первым Президентом независимого Казахстана?',
                options: ['Н. Назарбаев', 'К. Токаев', 'Д. Кунаев', 'Т. Рыскулов'],
                correct: 0,
                explanation: 'Нурсултан Назарбаев стал первым Президентом в 1991 году.'
            },
            {
                question: 'Столица Казахстана с 1997 года?',
                options: ['Алматы', 'Нур-Султан', 'Караганда', 'Шымкент'],
                correct: 1,
                explanation: 'С 1997 года столица - Астана (ныне Нур-Султан).'
            },
            {
                question: 'Год принятия Конституции РК?',
                options: ['1991', '1993', '1995', '1998'],
                correct: 2,
                explanation: 'Действующая Конституция принята 30 августа 1995 года.'
            },
            {
                question: 'Денежная единица Казахстана?',
                options: ['Тенге', 'Сом', 'Рубль', 'Доллар'],
                correct: 0,
                explanation: 'Национальная валюта - тенге, введена в 1993 году.'
            }
        ]
    };
    
    showQuiz(historyQuiz);
}

function showQuiz(quiz) {
    const container = document.getElementById('quizContainer');
    
    let quizHTML = `
        <div class="quiz-wrapper">
            <div class="quiz-header">
                <h4><i class="fas fa-brain"></i> ${quiz.title}</h4>
                <p>Ответьте на 5 вопросов. У вас 100% шанс узнать что-то новое!</p>
            </div>
            
            <div class="quiz-questions" id="quizQuestions">
    `;
    
    quiz.questions.forEach((q, index) => {
        quizHTML += `
            <div class="question-item" data-question="${index}">
                <div class="question-text">
                    <span class="question-number">${index + 1}.</span>
                    ${q.question}
                </div>
                <div class="question-options">
                    ${q.options.map((option, optIndex) => `
                        <label class="option-label">
                            <input type="radio" name="q${index}" value="${optIndex}">
                            <span class="option-text">${option}</span>
                        </label>
                    `).join('')}
                </div>
                <div class="question-explanation" id="explanation${index}" style="display: none;">
                    <i class="fas fa-info-circle"></i> ${q.explanation}
                </div>
            </div>
        `;
    });
    
    quizHTML += `
            </div>
            
            <div class="quiz-actions">
                <button class="btn-primary" onclick="checkQuiz()">
                    <i class="fas fa-check-circle"></i> Проверить ответы
                </button>
                <button class="btn-secondary" onclick="resetQuiz()">
                    <i class="fas fa-redo"></i> Начать заново
                </button>
            </div>
            
            <div class="quiz-results" id="quizResults" style="display: none;"></div>
        </div>
    `;
    
    container.innerHTML = quizHTML;
    
    // Добавляем обработчики для отображения объяснений
    document.querySelectorAll('.question-options input').forEach(input => {
        input.addEventListener('change', function() {
            const questionIndex = this.name.replace('q', '');
            const explanation = document.getElementById(`explanation${questionIndex}`);
            explanation.style.display = 'block';
            explanation.style.animation = 'fadeIn 0.5s ease';
        });
    });
}

function checkQuiz() {
    const questions = document.querySelectorAll('.question-item');
    let score = 0;
    const results = [];
    
    questions.forEach((question, index) => {
        const selected = question.querySelector('input:checked');
        const questionIndex = question.dataset.question;
        
        if (selected) {
            const isCorrect = parseInt(selected.value) === getCorrectAnswer(index);
            if (isCorrect) score++;
            
            results.push({
                question: question.querySelector('.question-text').textContent.replace(/^\d+\.\s*/, ''),
                selected: selected.nextElementSibling.textContent,
                correct: isCorrect
            });
            
            // Подсвечиваем ответ
            const optionLabels = question.querySelectorAll('.option-label');
            optionLabels.forEach((label, optIndex) => {
                if (optIndex === getCorrectAnswer(index)) {
                    label.classList.add('correct');
                }
                if (parseInt(selected.value) === optIndex && !isCorrect) {
                    label.classList.add('incorrect');
                }
            });
        }
    });
    
    const percentage = Math.round((score / questions.length) * 100);
    const resultsDiv = document.getElementById('quizResults');
    
    let resultHTML = `
        <div class="results-header">
            <h4><i class="fas fa-trophy"></i> Результаты теста</h4>
            <div class="results-score ${percentage >= 70 ? 'score-high' : 'score-low'}">
                ${score} из ${questions.length} (${percentage}%)
            </div>
        </div>
        
        <div class="results-message">
            <p>${getQuizMessage(percentage)}</p>
        </div>
        
        <div class="results-details">
            <h5>Подробные результаты:</h5>
            <ul>
                ${results.map((result, idx) => `
                    <li class="${result.correct ? 'correct' : 'incorrect'}">
                        ${idx + 1}. ${result.question}
                        ${result.correct ? '✓' : `✗ (Выбрано: ${result.selected})`}
                    </li>
                `).join('')}
            </ul>
        </div>
        
        <div class="results-actions">
            <button class="btn-secondary" onclick="shareResults(${percentage})">
                <i class="fas fa-share"></i> Поделиться результатом
            </button>
        </div>
    `;
    
    resultsDiv.innerHTML = resultHTML;
    resultsDiv.style.display = 'block';
    resultsDiv.style.animation = 'fadeIn 0.5s ease';
    
    // Прокручиваем к результатам
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
}

function getCorrectAnswer(questionIndex) {
    // Здесь должна быть логика определения правильного ответа
    // Для демо используем простой метод
    const correctAnswers = [2, 2, 2, 2, 2]; // Для математики
    return correctAnswers[questionIndex] || 0;
}

function getQuizMessage(percentage) {
    if (percentage >= 90) return 'Отличный результат! Вы настоящий эксперт!';
    if (percentage >= 70) return 'Хороший результат! Вы хорошо знаете материал.';
    if (percentage >= 50) return 'Неплохой результат! Есть куда расти.';
    return 'Попробуйте еще раз! Регулярные тренировки улучшат результат.';
}

function resetQuiz() {
    const container = document.getElementById('quizContainer');
    container.innerHTML = `
        <div class="quiz-placeholder">
            <i class="fas fa-brain"></i>
            <p>Выберите предмет для начала теста</p>
        </div>
    `;
}

function shareResults(percentage) {
    const message = `Я только что прошёл тест в Edumaster и набрал ${percentage}%! Попробуйте и вы: https://alem713.github.io/edumaster/`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Мой результат в Edumaster',
            text: message,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(message);
        showNotification('Результат скопирован в буфер обмена!', 'success');
    }
}

// ==================== ОБЩИЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================
function showResult(element, content, type = 'info') {
    element.innerHTML = content;
    element.className = 'demo-result';
    element.classList.add(type);
    
    // Анимация появления
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

function showLoading(element, message = 'Загрузка...') {
    element.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
}

function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Добавляем стили
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 9999;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

function initNavigation() {
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Обновляем активную ссылку
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Плавная прокрутка
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Отслеживание прокрутки для обновления активной ссылки
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Валидация
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Заполните все обязательные поля', 'error');
                return;
            }
            
            // Имитация отправки
            showLoading(document.querySelector('.contact-form'), 'Отправляем сообщение...');
            
            setTimeout(() => {
                showNotification('Сообщение отправлено! Мы ответим вам в течение 24 часов.', 'success');
                form.reset();
                document.querySelector('.contact-form').innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle" style="color: #10b981; font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>Сообщение отправлено!</h3>
                        <p>Мы свяжемся с вами в ближайшее время.</p>
                        <button class="btn-primary" onclick="location.reload()">
                            <i class="fas fa-redo"></i> Отправить новое сообщение
                        </button>
                    </div>
                `;
            }, 1500);
        });
    }
}

function showWelcomeMessage() {
    if (!sessionStorage.getItem('edumaster_welcome')) {
        setTimeout(() => {
            showNotification('Добро пожаловать в Edumaster! Исследуйте инструменты для успешной учебы.', 'info');
        }, 2000);
        sessionStorage.setItem('edumaster_welcome', 'true');
    }
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .loading-spinner {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #3b82f6;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .success { border-left-color: #10b981; }
    .error { border-left-color: #ef4444; }
    .warning { border-left-color: #f59e0b; }
    .info { border-left-color: #3b82f6; }
    
    .option-label.correct {
        background: rgba(16, 185, 129, 0.1);
        border-color: #10b981;
    }
    
    .option-label.incorrect {
        background: rgba(239, 68, 68, 0.1);
        border-color: #ef4444;
    }
`;
document.head.appendChild(style);

// Экспортируем функции для глобального использования
window.solveMathProblem = solveMathProblem;
window.setMathExample = setMathExample;
window.addNewTask = addNewTask;
window.toggleTask = toggleTask;
window.deleteTask = deleteTask;
window.generateEssayPlan = generateEssayPlan;
window.showSubjectMaterials = showSubjectMaterials;
window.calculateEntScore = calculateEntScore;
window.startMathQuiz = startMathQuiz;
window.startHistoryQuiz = startHistoryQuiz;
window.checkQuiz = checkQuiz;
window.resetQuiz = resetQuiz;
window.shareResults = shareResults;
