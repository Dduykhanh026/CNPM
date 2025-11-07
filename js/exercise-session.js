class ExerciseSessionPage {
    constructor() {
        this.pageType = document.body.dataset.exerciseType || 'quiz';
        this.exerciseData = null;
        this.currentQuestion = 1;
        this.init();
    }

    init() {
        const stored = localStorage.getItem('currentExercise');

        if (!stored) {
            this.redirectToExercises();
            return;
        }

        try {
            this.exerciseData = JSON.parse(stored);
        } catch (error) {
            console.error('Không thể đọc thông tin bài tập:', error);
            this.redirectToExercises();
            return;
        }

        if (!this.exerciseData || !this.exerciseData.id) {
            this.redirectToExercises();
            return;
        }

        this.updateMetaInfo();
        this.populateQuestionNavigation();
        this.updateCurrentQuestion();
    }

    redirectToExercises() {
        window.location.href = 'exercises.html';
    }

    updateMetaInfo() {
        const { title, subject, difficulty, type, duration, questions } = this.exerciseData;
        document.title = `${title} - Nền Tảng Học Trực Tuyến`;

        this.setText('exercise-title', title);
        this.setText('exercise-subject-badge', subject);
        this.updateDifficultyBadge(difficulty);
        this.updateTypeBadge(type);
        this.setText('exercise-meta-duration', `${duration} phút`);
        this.setText('exercise-meta-questions', `${questions} câu`);

        const instructions = document.getElementById('session-instructions');
        if (instructions) {
            if (this.pageType === 'written') {
                instructions.textContent = 'Trình bày lời giải chi tiết, rõ ràng. Hãy sử dụng ký hiệu toán học chuẩn và nêu rõ các bước lý luận.';
            } else {
                instructions.textContent = 'Chọn đáp án đúng cho từng câu hỏi. Bạn có thể chuyển đổi giữa các câu thông qua danh sách bên trái.';
            }
        }

        this.setText('current-question-type', this.capitalizeFirst(type));
    }

    setText(id, value) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value;
        }
    }

    updateDifficultyBadge(difficulty) {
        const badge = document.getElementById('exercise-difficulty-badge');
        if (!badge) return;

        badge.textContent = difficulty;
        badge.classList.remove('badge-success', 'badge-warning', 'badge-danger');

        if (difficulty === 'Dễ') {
            badge.classList.add('badge-success');
        } else if (difficulty === 'Trung bình') {
            badge.classList.add('badge-warning');
        } else {
            badge.classList.add('badge-danger');
        }
    }

    updateTypeBadge(type) {
        const badge = document.getElementById('exercise-type-badge');
        if (!badge) return;

        badge.textContent = this.capitalizeFirst(type);
    }

    populateQuestionNavigation() {
        const navContainer = document.getElementById('question-nav');
        if (!navContainer) return;

        navContainer.innerHTML = '';
        const totalQuestions = Number(this.exerciseData.questions) || 0;
        const maxQuestions = Math.min(totalQuestions, 50);

        for (let i = 1; i <= maxQuestions; i++) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `question-nav-item${i === 1 ? ' active' : ''}`;
            button.textContent = i.toString().padStart(2, '0');
            button.addEventListener('click', () => {
                this.currentQuestion = i;
                this.updateCurrentQuestion();
                this.updateActiveNav(button);
            });
            navContainer.appendChild(button);
        }

        if (totalQuestions > 50) {
            const moreInfo = document.createElement('p');
            moreInfo.className = 'question-nav-more';
            moreInfo.textContent = `... còn ${totalQuestions - 50} câu hỏi khác`; 
            navContainer.parentElement.appendChild(moreInfo);
        }
    }

    updateActiveNav(activeButton) {
        const buttons = document.querySelectorAll('.question-nav-item');
        buttons.forEach(btn => btn.classList.remove('active'));
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    updateCurrentQuestion() {
        this.setText('current-question-number', `Câu ${this.currentQuestion}`);

        const placeholder = document.getElementById('question-placeholder-text');
        if (placeholder) {
            const baseText = this.pageType === 'written'
                ? 'Hãy trình bày lời giải chi tiết cho câu hỏi này. Đừng quên nêu rõ phương pháp và bước giải.'
                : 'Chọn đáp án chính xác cho câu hỏi này. Đọc kỹ đề trước khi lựa chọn.';
            placeholder.textContent = `${baseText} (Mô phỏng câu ${this.currentQuestion}).`;
        }

        const typeLabel = document.getElementById('current-question-type');
        if (typeLabel) {
            typeLabel.textContent = this.capitalizeFirst(this.exerciseData.type);
        }
    }

    capitalizeFirst(text = '') {
        if (!text) return '';
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Đảm bảo người dùng đã đăng nhập thông qua NavigationManager
    if (!localStorage.getItem('currentUser')) {
        window.location.href = 'index.html';
        return;
    }

    new ExerciseSessionPage();
});

