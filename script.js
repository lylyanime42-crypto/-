// ============================================
// لعبة ظروف الزمان والمكان
// ============================================

// متغيرات اللعبة
let currentLevel = '';
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let gameActive = false;

// الأسئلة - المستوى الأول (سهل) - أسئلة عن المكان
const easyQuestions = [
    {
        type: 'ظروف المكان',
        question: 'أين الكرة في الصورة؟',
        image: 'images/ball-position.png',
        options: [
            { text: 'فوق', icon: '⬆️', correct: true },
            { text: 'تحت', icon: '⬇️', correct: false },
            { text: 'بجانب', icon: '➡️', correct: false }
        ]
    },
    {
        type: 'ظروف المكان',
        question: 'أين القطة؟',
        image: 'images/cat-position.png',
        options: [
            { text: 'داخل', icon: '📦', correct: true },
            { text: 'خارج', icon: '🚪', correct: false },
            { text: 'أمام', icon: '👀', correct: false }
        ]
    },
    {
        type: 'ظروف المكان',
        question: 'أين الشمس في السماء؟',
        image: 'images/sun-position.png',
        options: [
            { text: 'فوق', icon: '☀️', correct: true },
            { text: 'تحت', icon: '⬇️', correct: false },
            { text: 'بجانب', icon: '➡️', correct: false }
        ]
    },
    {
        type: 'ظروف المكان',
        question: 'أين السمكة؟',
        image: 'images/fish-position.png',
        options: [
            { text: 'في الماء', icon: '💧', correct: true },
            { text: 'على الأرض', icon: '🌍', correct: false },
            { text: 'في الهواء', icon: '☁️', correct: false }
        ]
    },
    {
        type: 'ظروف المكان',
        question: 'أين الطائر؟',
        image: 'images/bird-position.png',
        options: [
            { text: 'على الشجرة', icon: '🌳', correct: true },
            { text: 'تحت الأرض', icon: '⬇️', correct: false },
            { text: 'في البيت', icon: '🏠', correct: false }
        ]
    }
];

// الأسئلة - المستوى الثاني (متوسط) - أسئلة عن الزمان
const mediumQuestions = [
    {
        type: 'ظروف الزمان',
        question: 'متى تشرق الشمس؟',
        image: 'images/morning.png',
        options: [
            { text: 'صباحاً', icon: '🌅', correct: true },
            { text: 'مساءً', icon: '🌙', correct: false },
            { text: 'ليلاً', icon: '🌃', correct: false }
        ]
    },
    {
        type: 'ظروف الزمان',
        question: 'متى تنام الأطفال؟',
        image: 'images/night.png',
        options: [
            { text: 'ليلاً', icon: '😴', correct: true },
            { text: 'صباحاً', icon: '🌅', correct: false },
            { text: 'ظهراً', icon: '☀️', correct: false }
        ]
    },
    {
        type: 'ظروف الزمان',
        question: 'متى يكون الطقس حاراً؟',
        image: 'images/summer.png',
        options: [
            { text: 'صيفاً', icon: '🏖️', correct: true },
            { text: 'شتاءً', icon: '❄️', correct: false },
            { text: 'خريفاً', icon: '🍂', correct: false }
        ]
    },
    {
        type: 'ظروف الزمان',
        question: 'متى تتساقط الثلوج؟',
        image: 'images/winter.png',
        options: [
            { text: 'شتاءً', icon: '❄️', correct: true },
            { text: 'صيفاً', icon: '🏖️', correct: false },
            { text: 'ربيعاً', icon: '🌸', correct: false }
        ]
    },
    {
        type: 'ظروف الزمان',
        question: 'متى تأكل الأطفال الغداء؟',
        image: 'images/noon.png',
        options: [
            { text: 'ظهراً', icon: '🍽️', correct: true },
            { text: 'صباحاً', icon: '🥐', correct: false },
            { text: 'ليلاً', icon: '🌙', correct: false }
        ]
    }
];

// الأسئلة - المستوى الثالث (متقدم) - أسئلة مختلطة
const hardQuestions = [
    {
        type: 'أسئلة مختلطة',
        question: 'اختر الكلمة التي تدل على المكان: "الكتاب على الطاولة"',
        image: 'images/book-table.png',
        options: [
            { text: 'على', icon: '📍', correct: true },
            { text: 'الكتاب', icon: '📚', correct: false },
            { text: 'الطاولة', icon: '🪑', correct: false }
        ]
    },
    {
        type: 'أسئلة مختلطة',
        question: 'اختر الكلمة التي تدل على الزمان: "أذهب إلى المدرسة صباحاً"',
        image: 'images/school-morning.png',
        options: [
            { text: 'صباحاً', icon: '🌅', correct: true },
            { text: 'المدرسة', icon: '🏫', correct: false },
            { text: 'أذهب', icon: '🚶', correct: false }
        ]
    },
    {
        type: 'أسئلة مختلطة',
        question: 'أين يعيش السمك؟',
        image: 'images/fish-habitat.png',
        options: [
            { text: 'في البحر', icon: '🌊', correct: true },
            { text: 'في الغابة', icon: '🌲', correct: false },
            { text: 'في السماء', icon: '☁️', correct: false }
        ]
    },
    {
        type: 'أسئلة مختلطة',
        question: 'متى تأكل الطيور؟',
        image: 'images/birds-eating.png',
        options: [
            { text: 'في الصباح والمساء', icon: '🐦', correct: true },
            { text: 'ليلاً فقط', icon: '🌙', correct: false },
            { text: 'مرة واحدة في السنة', icon: '📅', correct: false }
        ]
    },
    {
        type: 'أسئلة مختلطة',
        question: 'أين تنمو الزهور؟',
        image: 'images/flowers-garden.png',
        options: [
            { text: 'في الحديقة', icon: '🌺', correct: true },
            { text: 'في البيت', icon: '🏠', correct: false },
            { text: 'في المدرسة', icon: '🏫', correct: false }
        ]
    }
];

// دالة بدء اللعبة
function startGame(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    score = 0;
    gameActive = true;

    // اختيار الأسئلة حسب المستوى
    if (level === 'easy') {
        questions = easyQuestions;
    } else if (level === 'medium') {
        questions = mediumQuestions;
    } else if (level === 'hard') {
        questions = hardQuestions;
    }

    // تحديث عدد الأسئلة
    document.getElementById('totalQuestions').textContent = questions.length;

    // إخفاء شاشة البداية وإظهار شاشة اللعبة
    showScreen('gameScreen');

    // تحميل السؤال الأول
    loadQuestion();
}

// دالة تحميل السؤال
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endGame();
        return;
    }

    const question = questions[currentQuestionIndex];

    // تحديث رقم السؤال
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;

    // تحديث نوع السؤال
    document.getElementById('questionType').textContent = question.type;

    // تحديث نص السؤال
    document.getElementById('questionText').textContent = question.question;

    // تحديث صورة السؤال
    document.getElementById('questionImage').src = question.image;
    document.getElementById('questionImage').alt = question.question;

    // تحديث الخيارات
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn option-' + currentLevel;
        button.innerHTML = `
            <span class="option-icon">${option.icon}</span>
            <span class="option-text">${option.text}</span>
        `;
        button.onclick = () => checkAnswer(button, option.correct, index);
        optionsContainer.appendChild(button);
    });

    // تحديث شريط التقدم
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // تحديث رسالة الشخصية المرشدة
    updateCharacterMessage('اختر الإجابة الصحيحة!');
}

// دالة التحقق من الإجابة
function checkAnswer(button, isCorrect, optionIndex) {
    if (!gameActive) return;

    gameActive = false;

    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        button.classList.add('correct');
        score += 10;
        updateCharacterMessage('🎉 إجابة صحيحة! أحسنت!');
        playSound('correct');
        showResultScreen(true);
    } else {
        button.classList.add('incorrect');
        updateCharacterMessage('❌ إجابة خاطئة! حاول مرة أخرى!');
        playSound('incorrect');
        
        // إظهار الإجابة الصحيحة
        buttons.forEach((btn, index) => {
            if (questions[currentQuestionIndex].options[index].correct) {
                btn.classList.add('correct');
            }
        });

        showResultScreen(false);
    }

    // تحديث النقاط
    document.getElementById('score').textContent = score;
}

// دالة عرض شاشة النتيجة
function showResultScreen(isCorrect) {
    const resultEmoji = document.getElementById('resultEmoji');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');

    if (isCorrect) {
        resultEmoji.textContent = '🎉';
        resultTitle.textContent = 'ممتاز!';
        resultMessage.textContent = 'لقد أجبت بشكل صحيح! +10 نقاط';
    } else {
        resultEmoji.textContent = '😊';
        resultTitle.textContent = 'لا بأس!';
        resultMessage.textContent = 'حاول الانتباه أكثر في المرة القادمة.';
    }

    showScreen('resultScreen');
}

// دالة الانتقال للسؤال التالي
function nextQuestion() {
    currentQuestionIndex++;
    gameActive = true;

    if (currentQuestionIndex >= questions.length) {
        endGame();
    } else {
        showScreen('gameScreen');
        loadQuestion();
    }
}

// دالة إنهاء اللعبة
function endGame() {
    const maxScore = questions.length * 10;
    const percentage = (score / maxScore) * 100;

    document.getElementById('finalScore').textContent = score;
    document.getElementById('maxScore').textContent = maxScore;

    let performanceMessage = '';
    if (percentage === 100) {
        performanceMessage = '🏆 أداء مثالي! أنت عبقري!';
    } else if (percentage >= 80) {
        performanceMessage = '⭐ أداء ممتاز! استمر هكذا!';
    } else if (percentage >= 60) {
        performanceMessage = '👍 أداء جيد! تحسن أكثر!';
    } else {
        performanceMessage = '💪 حاول مرة أخرى وستفعل أفضل!';
    }

    document.getElementById('performanceMessage').textContent = performanceMessage;

    showScreen('endScreen');
    updateCharacterMessage('تهانينا! لقد أكملت اللعبة بنجاح!');
    playSound('success');
}

// دالة إعادة تشغيل اللعبة
function restartGame() {
    currentLevel = '';
    currentQuestionIndex = 0;
    score = 0;
    questions = [];
    gameActive = false;

    document.getElementById('score').textContent = '0';
    document.getElementById('questionNumber').textContent = '1';

    showScreen('startScreen');
    updateCharacterMessage('مرحباً! هل أنت مستعد للعبة؟');
}

// دالة عرض الشاشات
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

// دالة تحديث رسالة الشخصية المرشدة
function updateCharacterMessage(message) {
    document.getElementById('characterMessage').textContent = message;
}

// دالة تشغيل الأصوات
function playSound(type) {
    const sounds = {
        'correct': 'sounds/correct.wav',
        'incorrect': 'sounds/incorrect.wav',
        'welcome': 'sounds/welcome.wav',
        'success': 'sounds/finish.wav',
        'click': 'sounds/correct.wav'
    };

    if (sounds[type]) {
        const audio = new Audio(sounds[type]);
        audio.volume = 0.7; // مستوى الصوت 70%
        audio.play().catch(error => {
            console.log('خطأ في تشغيل الصوت:', error);
        });
    }
}

// تهيئة اللعبة عند التحميل
window.addEventListener('load', () => {
    showScreen('startScreen');
    updateCharacterMessage('مرحباً! هل أنت مستعد للعبة؟');
    playSound('welcome');
});
