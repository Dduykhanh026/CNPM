// Payment Management
class PaymentManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const topupForm = document.getElementById('topup-form');
        if (topupForm) {
            topupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTopup();
            });
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
            alert(`Đang chuyển đến trang thanh toán ${methodName}...\n(Trong ứng dụng thực tế, sẽ tích hợp với cổng thanh toán)`);
            // In real app, redirect to payment gateway
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
