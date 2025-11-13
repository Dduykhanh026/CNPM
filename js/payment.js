// Payment Management
class PaymentManager {
    constructor() {
        this.balance = 500000; // Số dư ban đầu
        this.purchasedBooks = [
            { id: 1, title: 'Dao động điều hòa', subject: 'Vật Lý', price: 50000, date: '10/12/2024' },
            { id: 2, title: 'Hóa học hữu cơ - Cơ bản', subject: 'Hóa Học', price: 30000, date: '08/12/2024' }
        ];
        // Danh sách tất cả sách có thể mua (loại trừ những sách đã mua)
        const allBooks = [
            { id: 1, title: 'Dao động điều hòa - Video minh họa', subject: 'Vật Lý', type: 'Video', price: 50000 },
            { id: 2, title: 'Hóa học hữu cơ - Cơ bản', subject: 'Hóa Học', type: 'Tài liệu', price: 30000 },
            { id: 3, title: 'Phản ứng hóa học - Video', subject: 'Hóa Học', type: 'Video', price: 40000 },
            { id: 4, title: 'Chuyên đề hình học không gian 12', subject: 'Toán', type: 'Tài liệu', price: 70000 },
            { id: 5, title: 'Chuỗi bài tập luyện thi THPT - Vật lý', subject: 'Vật Lý', type: 'Bài tập', price: 35000 }
        ];
        // Lọc ra những sách chưa mua
        const purchasedIds = this.purchasedBooks.map(b => b.id);
        this.availableBooks = allBooks.filter(book => !purchasedIds.includes(book.id));
        this.init();
    }

    init() {
        this.cacheDom();
        this.setupEventListeners();
        this.updateBalanceDisplay();
        this.renderAvailableBooks();
    }

    cacheDom() {
        this.balanceAmount = document.getElementById('balance-amount');
        this.showTopupBtn = document.getElementById('show-topup-btn');
        this.topupFormContainer = document.getElementById('topup-form-container');
        this.topupForm = document.getElementById('topup-form');
        this.cancelTopupBtn = document.getElementById('cancel-topup-btn');
        this.viewHistoryBtn = document.getElementById('view-history-btn');
        this.booksTable = document.getElementById('books-table');
        this.purchasedTable = document.getElementById('purchased-table');
    }

    setupEventListeners() {
        if (this.showTopupBtn) {
            this.showTopupBtn.addEventListener('click', () => this.showTopupForm());
        }

        if (this.cancelTopupBtn) {
            this.cancelTopupBtn.addEventListener('click', () => this.hideTopupForm());
        }

        if (this.topupForm) {
            this.topupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTopup();
            });
        }

        if (this.viewHistoryBtn) {
            this.viewHistoryBtn.addEventListener('click', () => {
                alert('Lịch sử giao dịch (mô phỏng). Trong ứng dụng thực tế sẽ hiển thị danh sách đầy đủ.');
            });
        }

        if (this.booksTable) {
            this.booksTable.addEventListener('click', (event) => {
                const button = event.target.closest('button[data-book-id]');
                if (!button) return;
                
                const bookId = parseInt(button.dataset.bookId);
                const bookPrice = parseInt(button.dataset.bookPrice);
                const bookTitle = button.dataset.bookTitle;
                
                this.handlePurchaseBook(bookId, bookPrice, bookTitle);
            });
        }
    }

    showTopupForm() {
        if (this.topupFormContainer) {
            this.topupFormContainer.style.display = 'block';
            this.topupFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    hideTopupForm() {
        if (this.topupFormContainer) {
            this.topupFormContainer.style.display = 'none';
            if (this.topupForm) {
                this.topupForm.reset();
                document.getElementById('topup-amount').value = 100000;
            }
        }
    }

    handleTopup() {
        const amount = parseInt(document.getElementById('topup-amount').value);
        const method = document.getElementById('payment-method').value;

        if (amount < 10000) {
            alert('Số tiền nạp tối thiểu là 10,000 VNĐ');
            return;
        }

        const methodName = method === 'vnpay' ? 'VNPay' : 'MoMo';
        
        if (confirm(`Bạn muốn nạp ${this.formatPrice(amount)} VNĐ qua ${methodName}?`)) {
            // Mô phỏng nạp tiền thành công
            this.balance += amount;
            this.updateBalanceDisplay();
            this.hideTopupForm();
            alert(`Đã nạp thành công ${this.formatPrice(amount)} VNĐ vào tài khoản (mô phỏng).\nSố dư hiện tại: ${this.formatPrice(this.balance)} VNĐ`);
        }
    }

    handlePurchaseBook(bookId, bookPrice, bookTitle) {
        // Kiểm tra xem đã mua chưa
        const alreadyPurchased = this.purchasedBooks.some(book => book.id === bookId);
        if (alreadyPurchased) {
            alert('Bạn đã mua sách này rồi!');
            return;
        }

        // Kiểm tra số dư
        if (this.balance < bookPrice) {
            alert(`Số dư không đủ! Bạn cần ${this.formatPrice(bookPrice)} VNĐ nhưng chỉ có ${this.formatPrice(this.balance)} VNĐ.\nVui lòng nạp thêm tiền.`);
            return;
        }

        if (confirm(`Bạn có muốn mua "${bookTitle}" với giá ${this.formatPrice(bookPrice)} VNĐ không?`)) {
            // Trừ tiền
            this.balance -= bookPrice;
            this.updateBalanceDisplay();

            // Thêm vào danh sách đã mua
            const book = this.availableBooks.find(b => b.id === bookId);
            if (book) {
                const today = new Date();
                const dateStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
                this.purchasedBooks.push({
                    id: book.id,
                    title: book.title,
                    subject: book.subject,
                    price: book.price,
                    date: dateStr
                });
                this.renderPurchasedBooks();
            }

            // Xóa khỏi danh sách có thể mua
            this.availableBooks = this.availableBooks.filter(b => b.id !== bookId);
            this.renderAvailableBooks();

            alert(`Đã mua thành công "${bookTitle}"!\nSố dư còn lại: ${this.formatPrice(this.balance)} VNĐ`);
        }
    }

    renderAvailableBooks() {
        if (!this.booksTable) return;

        if (this.availableBooks.length === 0) {
            this.booksTable.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: var(--text-secondary);">
                        Không còn sách nào để mua.
                    </td>
                </tr>
            `;
            return;
        }

        this.booksTable.innerHTML = this.availableBooks.map(book => `
            <tr>
                <td><strong>${book.title}</strong></td>
                <td>${book.subject}</td>
                <td>${book.type}</td>
                <td>${this.formatPrice(book.price)} VNĐ</td>
                <td>
                    <button class="btn btn-sm btn-primary" data-book-id="${book.id}" data-book-price="${book.price}" data-book-title="${book.title}">Mua Ngay</button>
                </td>
            </tr>
        `).join('');
    }

    renderPurchasedBooks() {
        if (!this.purchasedTable) return;

        this.purchasedTable.innerHTML = this.purchasedBooks.map(book => `
            <tr>
                <td>${book.title}</td>
                <td>${book.subject}</td>
                <td>${this.formatPrice(book.price)} VNĐ</td>
                <td>${book.date}</td>
                <td><button class="btn btn-sm btn-primary">Xem</button></td>
            </tr>
        `).join('');
    }

    updateBalanceDisplay() {
        if (this.balanceAmount) {
            this.balanceAmount.textContent = this.formatPrice(this.balance);
        }
    }

    formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
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
    new PaymentManager();
});
