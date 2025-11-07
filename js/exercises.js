// Exercises Management
class ExercisesManager {
    constructor() {
        this.exercises = [
            {
                id: 1,
                title: 'Bài tập Đại số - Chương 1',
                subject: 'Toán',
                type: 'trắc nghiệm',
                questions: 20,
                duration: 30,
                difficulty: 'Trung bình',
                completed: false,
                score: null
            },
            {
                id: 2,
                title: 'Bài tập Dao động điều hòa',
                subject: 'Vật Lý',
                type: 'tự luận',
                questions: 5,
                duration: 45,
                difficulty: 'Khó',
                completed: true,
                score: 85
            },
            {
                id: 3,
                title: 'Bài tập Hóa học hữu cơ',
                subject: 'Hóa Học',
                type: 'trắc nghiệm',
                questions: 25,
                duration: 35,
                difficulty: 'Dễ',
                completed: false,
                score: null
            },
            {
                id: 4,
                title: 'Bài tập Giải tích',
                subject: 'Toán',
                type: 'tự luận',
                questions: 8,
                duration: 60,
                difficulty: 'Khó',
                completed: true,
                score: 92
            },
            {
                id: 5,
                title: 'Bài tập Hình học không gian',
                subject: 'Toán',
                type: 'tự luận',
                questions: 10,
                duration: 50,
                difficulty: 'Khó',
                completed: false,
                score: null
            },
            {
                id: 6,
                title: 'Bài tập Điện từ học',
                subject: 'Vật Lý',
                type: 'trắc nghiệm',
                questions: 30,
                duration: 40,
                difficulty: 'Trung bình',
                completed: true,
                score: 78
            },
            {
                id: 7,
                title: 'Bài tập Axit và Bazơ',
                subject: 'Hóa Học',
                type: 'trắc nghiệm',
                questions: 20,
                duration: 30,
                difficulty: 'Dễ',
                completed: false,
                score: null
            },
            {
                id: 8,
                title: 'Bài tập Lượng giác',
                subject: 'Toán',
                type: 'tự luận',
                questions: 12,
                duration: 55,
                difficulty: 'Trung bình',
                completed: true,
                score: 88
            },
            {
                id: 9,
                title: 'Bài tập Sóng cơ và sóng âm',
                subject: 'Vật Lý',
                type: 'trắc nghiệm',
                questions: 25,
                duration: 35,
                difficulty: 'Trung bình',
                completed: false,
                score: null
            },
            {
                id: 10,
                title: 'Bài tập Cân bằng hóa học',
                subject: 'Hóa Học',
                type: 'tự luận',
                questions: 6,
                duration: 45,
                difficulty: 'Khó',
                completed: true,
                score: 90
            },
            {
                id: 11,
                title: 'Bài tập Tích phân',
                subject: 'Toán',
                type: 'tự luận',
                questions: 15,
                duration: 65,
                difficulty: 'Khó',
                completed: false,
                score: null
            },
            {
                id: 12,
                title: 'Bài tập Quang học',
                subject: 'Vật Lý',
                type: 'trắc nghiệm',
                questions: 28,
                duration: 38,
                difficulty: 'Trung bình',
                completed: true,
                score: 82
            },
            {
                id: 13,
                title: 'Bài tập Điện hóa học',
                subject: 'Hóa Học',
                type: 'trắc nghiệm',
                questions: 22,
                duration: 32,
                difficulty: 'Dễ',
                completed: false,
                score: null
            },
            {
                id: 14,
                title: 'Bài tập Xác suất',
                subject: 'Toán',
                type: 'trắc nghiệm',
                questions: 24,
                duration: 40,
                difficulty: 'Trung bình',
                completed: true,
                score: 85
            },
            {
                id: 15,
                title: 'Bài tập Nhiệt động lực học',
                subject: 'Vật Lý',
                type: 'tự luận',
                questions: 7,
                duration: 50,
                difficulty: 'Khó',
                completed: false,
                score: null
            },
            {
                id: 16,
                title: 'Bài tập Kim loại',
                subject: 'Hóa Học',
                type: 'trắc nghiệm',
                questions: 26,
                duration: 36,
                difficulty: 'Trung bình',
                completed: true,
                score: 87
            },
            {
                id: 17,
                title: 'Bài tập Phương trình vi phân',
                subject: 'Toán',
                type: 'tự luận',
                questions: 9,
                duration: 60,
                difficulty: 'Khó',
                completed: false,
                score: null
            },
            {
                id: 18,
                title: 'Bài tập Vật lý hạt nhân',
                subject: 'Vật Lý',
                type: 'trắc nghiệm',
                questions: 20,
                duration: 30,
                difficulty: 'Dễ',
                completed: true,
                score: 91
            },
            {
                id: 19,
                title: 'Bài tập Polime',
                subject: 'Hóa Học',
                type: 'tự luận',
                questions: 5,
                duration: 40,
                difficulty: 'Trung bình',
                completed: false,
                score: null
            },
            {
                id: 20,
                title: 'Bài tập Số phức',
                subject: 'Toán',
                type: 'tự luận',
                questions: 11,
                duration: 50,
                difficulty: 'Trung bình',
                completed: true,
                score: 86
            },
            {
                id: 21,
                title: 'Bài tập Động lực học',
                subject: 'Vật Lý',
                type: 'trắc nghiệm',
                questions: 30,
                duration: 42,
                difficulty: 'Trung bình',
                completed: false,
                score: null
            },
            {
                id: 22,
                title: 'Bài tập Cấu trúc nguyên tử',
                subject: 'Hóa Học',
                type: 'trắc nghiệm',
                questions: 24,
                duration: 35,
                difficulty: 'Dễ',
                completed: true,
                score: 93
            }
        ];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadExercises();
    }

    loadExercises() {
        const grid = document.getElementById('exercises-grid');
        if (!grid) return;

        const filtered = this.getFilteredExercises();
        grid.innerHTML = filtered.map(ex => this.createExerciseCard(ex)).join('');
    }

    getFilteredExercises() {
        if (this.currentFilter === 'all') {
            return this.exercises;
        }
        const subjectMap = {
            'math': 'Toán',
            'physics': 'Vật Lý',
            'chemistry': 'Hóa Học'
        };
        return this.exercises.filter(e => e.subject === subjectMap[this.currentFilter]);
    }

    createExerciseCard(exercise) {
        const statusBadge = exercise.completed ? 
            `<span class="badge badge-success">Đã Hoàn Thành - ${exercise.score}%</span>` : 
            `<span class="badge badge-warning">Chưa Làm</span>`;
        
        const difficultyColor = exercise.difficulty === 'Dễ' ? 'badge-success' : 
                                exercise.difficulty === 'Trung bình' ? 'badge-warning' : 
                                'badge-danger';

        return `
            <div class="content-card">
                <div class="content-card-image"></div>
                <div class="content-card-body">
                    <h3 class="content-card-title">${exercise.title}</h3>
                    <p class="content-card-description">
                        <span class="badge badge-info">${exercise.subject}</span>
                        <span class="badge ${difficultyColor}">${exercise.difficulty}</span>
                        <span class="badge badge-info">${exercise.type}</span>
                    </p>
                    <div style="margin: 15px 0;">
                        <p><strong>Số câu hỏi:</strong> ${exercise.questions}</p>
                        <p><strong>Thời gian:</strong> ${exercise.duration} phút</p>
                        ${statusBadge}
                    </div>
                    <div class="content-card-footer">
                        <div class="content-meta">
                                <span><i class="${this.getTypeIconClass(exercise.type)}"></i> ${this.formatExerciseType(exercise.type)}</span>
                                <span><i class="fa-solid fa-clock"></i> ${exercise.duration} phút</span>
                        </div>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-primary" onclick="startExercise(${exercise.id})">Làm Bài</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getExerciseById(id) {
        return this.exercises.find(ex => ex.id === id);
    }

    getTypeIconClass(type) {
        const normalized = (type || '').toLowerCase();
        if (normalized.includes('trắc')) {
            return 'fa-solid fa-list-check';
        }
        if (normalized.includes('tự luận')) {
            return 'fa-solid fa-pen-to-square';
        }
        return 'fa-solid fa-book-open';
    }

    formatExerciseType(type) {
        if (!type) return '';
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

    filterBySubject(subject) {
        this.currentFilter = subject;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.loadExercises();
    }
}

// Global functions
let exercisesManager;

function filterBySubject(subject) {
    if (exercisesManager) {
        exercisesManager.filterBySubject(subject);
    }
}

function startExercise(id) {
    if (!exercisesManager) return;

    const exercise = exercisesManager.getExerciseById(id);
    if (!exercise) {
        alert('Không tìm thấy thông tin bài tập. Vui lòng thử lại.');
        return;
    }

    const confirmMessage = `Bạn sắp bắt đầu bài tập "${exercise.title}" (${exercise.type}).\nThời gian làm bài: ${exercise.duration} phút.\nBạn đã sẵn sàng chưa?`;

    if (!confirm(confirmMessage)) {
        return;
    }

    const exerciseData = {
        id: exercise.id,
        title: exercise.title,
        subject: exercise.subject,
        type: exercise.type,
        questions: exercise.questions,
        duration: exercise.duration,
        difficulty: exercise.difficulty
    };

    localStorage.setItem('currentExercise', JSON.stringify(exerciseData));

    const targetPage = exercise.type === 'tự luận' ? 'exercise-written.html' : 'exercise-quiz.html';
    window.location.href = `${targetPage}?id=${exercise.id}`;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    // Update user info will be handled by NavigationManager
    exercisesManager = new ExercisesManager();
});
