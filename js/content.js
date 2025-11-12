// Content Management
class ContentManager {
    constructor() {
        this.contents = [
            {
                id: 1,
                title: 'Đại số và Giải tích - Chương 1',
                subject: 'Toán',
                type: 'Bài giảng',
                format: 'video',
                description: 'Học về hàm số, đạo hàm và ứng dụng',
                duration: '45 phút',
                students: 120,
                price: 0,
                rating: 4.5,
                reviews: 28
            },
            {
                id: 2,
                title: 'Dao động điều hòa',
                subject: 'Vật Lý',
                type: 'Video',
                format: 'video',
                description: 'Tìm hiểu về dao động điều hòa và các ứng dụng',
                duration: '35 phút',
                students: 95,
                price: 50000,
                rating: 4.8,
                reviews: 15
            },
            {
                id: 3,
                title: 'Hóa học hữu cơ - Cơ bản',
                subject: 'Hóa Học',
                type: 'Tài liệu',
                format: 'pdf',
                description: 'Tài liệu tổng hợp về hóa học hữu cơ',
                duration: '60 phút',
                students: 88,
                price: 30000,
                rating: 4.7,
                reviews: 22
            },
            {
                id: 4,
                title: 'Bài tập Toán nâng cao',
                subject: 'Toán',
                type: 'Bài tập',
                format: 'exercise',
                description: 'Tuyển tập bài tập toán nâng cao có đáp án',
                duration: '90 phút',
                students: 150,
                price: 0,
                rating: 4.6,
                reviews: 35
            },
            {
                id: 5,
                title: 'Điện từ học',
                subject: 'Vật Lý',
                type: 'Bài giảng',
                format: 'video',
                description: 'Khái niệm về điện từ học và từ trường',
                duration: '50 phút',
                students: 110,
                price: 0,
                rating: 4.4,
                reviews: 19
            },
            {
                id: 6,
                title: 'Phản ứng hóa học',
                subject: 'Hóa Học',
                type: 'Video',
                format: 'video',
                description: 'Các loại phản ứng hóa học và cân bằng phương trình',
                duration: '40 phút',
                students: 92,
                price: 40000,
                rating: 4.9,
                reviews: 31
            },
            {
                id: 7,
                title: 'Hình học không gian',
                subject: 'Toán',
                type: 'Bài giảng',
                format: 'video',
                description: 'Học về hình học không gian và các bài toán liên quan',
                duration: '55 phút',
                students: 135,
                price: 0,
                rating: 4.6,
                reviews: 42
            },
            {
                id: 8,
                title: 'Sóng cơ và sóng âm',
                subject: 'Vật Lý',
                type: 'Video',
                format: 'video',
                description: 'Tìm hiểu về sóng cơ học và sóng âm thanh',
                duration: '38 phút',
                students: 105,
                price: 45000,
                rating: 4.7,
                reviews: 27
            },
            {
                id: 9,
                title: 'Cân bằng hóa học',
                subject: 'Hóa Học',
                type: 'Tài liệu',
                format: 'pdf',
                description: 'Tài liệu về cân bằng hóa học và hằng số cân bằng',
                duration: '70 phút',
                students: 98,
                price: 35000,
                rating: 4.8,
                reviews: 33
            },
            {
                id: 10,
                title: 'Lượng giác cơ bản',
                subject: 'Toán',
                type: 'Bài giảng',
                format: 'video',
                description: 'Học về các hàm lượng giác và công thức',
                duration: '48 phút',
                students: 128,
                price: 0,
                rating: 4.5,
                reviews: 38
            },
            {
                id: 11,
                title: 'Quang học',
                subject: 'Vật Lý',
                type: 'Video',
                format: 'video',
                description: 'Khái niệm về ánh sáng, phản xạ và khúc xạ',
                duration: '42 phút',
                students: 112,
                price: 50000,
                rating: 4.6,
                reviews: 25
            },
            {
                id: 12,
                title: 'Điện hóa học',
                subject: 'Hóa Học',
                type: 'Bài giảng',
                format: 'video',
                description: 'Học về pin điện hóa và điện phân',
                duration: '52 phút',
                students: 87,
                price: 0,
                rating: 4.7,
                reviews: 29
            },
            {
                id: 13,
                title: 'Tích phân và ứng dụng',
                subject: 'Toán',
                type: 'Video',
                format: 'video',
                description: 'Học về tích phân và các ứng dụng trong thực tế',
                duration: '65 phút',
                students: 142,
                price: 55000,
                rating: 4.9,
                reviews: 51
            },
            {
                id: 14,
                title: 'Nhiệt động lực học',
                subject: 'Vật Lý',
                type: 'Tài liệu',
                format: 'pdf',
                description: 'Tài liệu về nhiệt động lực học và định luật',
                duration: '75 phút',
                students: 103,
                price: 40000,
                rating: 4.5,
                reviews: 36
            },
            {
                id: 15,
                title: 'Kim loại và hợp kim',
                subject: 'Hóa Học',
                type: 'Video',
                format: 'video',
                description: 'Tìm hiểu về tính chất và ứng dụng của kim loại',
                duration: '44 phút',
                students: 96,
                price: 45000,
                rating: 4.8,
                reviews: 41
            },
            {
                id: 16,
                title: 'Xác suất và thống kê',
                subject: 'Toán',
                type: 'Bài giảng',
                format: 'video',
                description: 'Học về xác suất, biến ngẫu nhiên và thống kê',
                duration: '58 phút',
                students: 138,
                price: 0,
                rating: 4.7,
                reviews: 44
            },
            {
                id: 17,
                title: 'Vật lý hạt nhân',
                subject: 'Vật Lý',
                type: 'Video',
                format: 'video',
                description: 'Khái niệm về hạt nhân nguyên tử và phản ứng hạt nhân',
                duration: '46 phút',
                students: 89,
                price: 50000,
                rating: 4.6,
                reviews: 32
            },
            {
                id: 18,
                title: 'Polime và vật liệu polime',
                subject: 'Hóa Học',
                type: 'Tài liệu',
                format: 'pdf',
                description: 'Tài liệu về polime và các vật liệu polime',
                duration: '68 phút',
                students: 94,
                price: 35000,
                rating: 4.7,
                reviews: 28
            },
            {
                id: 19,
                title: 'Số phức và ứng dụng',
                subject: 'Toán',
                type: 'Video',
                format: 'video',
                description: 'Học về số phức và các phép toán với số phức',
                duration: '50 phút',
                students: 125,
                price: 48000,
                rating: 4.8,
                reviews: 37
            },
            {
                id: 20,
                title: 'Động lực học chất điểm',
                subject: 'Vật Lý',
                type: 'Bài giảng',
                format: 'video',
                description: 'Học về chuyển động và các định luật Newton',
                duration: '54 phút',
                students: 118,
                price: 0,
                rating: 4.6,
                reviews: 47
            },
            {
                id: 21,
                title: 'Cấu trúc nguyên tử',
                subject: 'Hóa Học',
                type: 'Video',
                format: 'video',
                description: 'Tìm hiểu về cấu trúc nguyên tử và bảng tuần hoàn',
                duration: '41 phút',
                students: 107,
                price: 42000,
                rating: 4.9,
                reviews: 39
            },
            {
                id: 22,
                title: 'Phương trình vi phân',
                subject: 'Toán',
                type: 'Tài liệu',
                format: 'pdf',
                description: 'Tài liệu về phương trình vi phân và nghiệm',
                duration: '80 phút',
                students: 145,
                price: 60000,
                rating: 4.7,
                reviews: 53
            },
            {
                id: 23,
                title: 'Điện xoay chiều',
                subject: 'Vật Lý',
                type: 'Video',
                format: 'video',
                description: 'Học về dòng điện xoay chiều và mạch RLC',
                duration: '56 phút',
                students: 132,
                price: 52000,
                rating: 4.8,
                reviews: 48
            },
            {
                id: 24,
                title: 'Hợp chất hữu cơ',
                subject: 'Hóa Học',
                type: 'Bài giảng',
                format: 'video',
                description: 'Tìm hiểu về các hợp chất hữu cơ cơ bản',
                duration: '49 phút',
                students: 101,
                price: 0,
                rating: 4.6,
                reviews: 34
            },
            {
                id: 25,
                title: 'Khảo sát hàm số',
                subject: 'Toán',
                type: 'Video',
                format: 'video',
                description: 'Học về khảo sát và vẽ đồ thị hàm số',
                duration: '62 phút',
                students: 152,
                price: 58000,
                rating: 4.9,
                reviews: 62
            },
            {
                id: 26,
                title: 'Cơ học lượng tử',
                subject: 'Vật Lý',
                type: 'Tài liệu',
                format: 'pdf',
                description: 'Tài liệu về cơ học lượng tử và nguyên lý',
                duration: '85 phút',
                students: 76,
                price: 70000,
                rating: 4.7,
                reviews: 19
            },
            {
                id: 27,
                title: 'Ancol và phenol',
                subject: 'Hóa Học',
                type: 'Video',
                format: 'video',
                description: 'Tìm hiểu về ancol, phenol và tính chất',
                duration: '43 phút',
                students: 93,
                price: 46000,
                rating: 4.8,
                reviews: 30
            },
            {
                id: 28,
                title: 'Ma trận và định thức',
                subject: 'Toán',
                type: 'Bài giảng',
                format: 'video',
                description: 'Học về ma trận, định thức và các phép toán',
                duration: '59 phút',
                students: 129,
                price: 0,
                rating: 4.5,
                reviews: 45
            }
        ];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.loadContents();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchContent();
                }
            });
        }
    }

    loadContents() {
        const grid = document.getElementById('content-grid');
        if (!grid) return;

        const filtered = this.getFilteredContents();
        grid.innerHTML = filtered.map(content => this.createContentCard(content)).join('');
    }

    getContentById(id) {
        return this.contents.find(content => content.id === id);
    }

    getFilteredContents() {
        if (this.currentFilter === 'all') {
            return this.contents;
        }
        const subjectMap = {
            'math': 'Toán',
            'physics': 'Vật Lý',
            'chemistry': 'Hóa Học'
        };
        return this.contents.filter(c => c.subject === subjectMap[this.currentFilter]);
    }

    createContentCard(content) {
        const priceDisplay = content.price === 0 ? 
            '<span class="badge badge-success">Miễn Phí</span>' : 
            `<span class="badge badge-warning">${this.formatPrice(content.price)} VNĐ</span>`;
        
        return `
            <div class="content-card">
                <div class="content-card-image"></div>
                <div class="content-card-body">
                    <h3 class="content-card-title">${content.title}</h3>
                    <p class="content-card-description">${content.description}</p>
                    <div style="margin-bottom: 15px;">
                        <span class="badge badge-info">${content.subject}</span>
                        <span class="badge badge-success">${content.type}</span>
                        ${priceDisplay}
                    </div>
                    <div class="content-card-footer">
                        <div class="content-meta">
                            <span>⏱️ ${content.duration}</span>
                            <span>👥 ${content.students}</span>
                            <span>⭐ ${content.rating} (${content.reviews})</span>
                        </div>
                        <div class="action-buttons">
                            <button type="button" class="btn btn-sm btn-primary" onclick="viewContent(event, ${content.id})">Xem</button>
                            ${content.price > 0 ? `<button type="button" class="btn btn-sm btn-secondary" onclick="purchaseContent(event, ${content.id})">Mua</button>` : `<button type="button" class="btn btn-sm btn-secondary" onclick="downloadContentById(event, ${content.id})">Tải</button>`}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    filterBySubject(subject) {
        this.currentFilter = subject;
        
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Find and activate the clicked button
        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            if (btn.textContent.trim() === 'Tất Cả' && subject === 'all') {
                btn.classList.add('active');
            } else if (btn.textContent.trim() === 'Toán' && subject === 'math') {
                btn.classList.add('active');
            } else if (btn.textContent.trim() === 'Vật Lý' && subject === 'physics') {
                btn.classList.add('active');
            } else if (btn.textContent.trim() === 'Hóa Học' && subject === 'chemistry') {
                btn.classList.add('active');
            }
        });
        
        this.loadContents();
    }

    searchContent() {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        if (!searchTerm) {
            this.loadContents();
            return;
        }

        const filtered = this.contents.filter(content => 
            content.title.toLowerCase().includes(searchTerm) ||
            content.description.toLowerCase().includes(searchTerm) ||
            content.subject.toLowerCase().includes(searchTerm)
        );

        const grid = document.getElementById('content-grid');
        if (grid) {
            grid.innerHTML = filtered.map(content => this.createContentCard(content)).join('');
        }
    }
}

// Global functions
let contentManager;

function filterBySubject(subject) {
    if (contentManager) {
        contentManager.filterBySubject(subject);
    }
}

function searchContent() {
    if (contentManager) {
        contentManager.searchContent();
    }
}

function viewContent(event, id) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (!contentManager) return;

    const content = contentManager.getContentById(id);
    if (!content) {
        alert('Không tìm thấy nội dung. Vui lòng thử lại.');
        return;
    }

    localStorage.setItem('currentContent', JSON.stringify(content));
    window.location.href = `content-view.html?id=${content.id}`;
}

function purchaseContent(event, id) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    if (confirm('Bạn có muốn mua nội dung này không?')) {
        alert('Đang chuyển đến trang thanh toán...');
        // In real app, redirect to payment page
    }
}

function downloadContentById(event, id) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    alert('Bắt đầu tải nội dung (mô phỏng).');
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
    const userData = JSON.parse(user);
    
    contentManager = new ContentManager();
});
