// Live Class Management - Trao đổi nhóm với nhiều học sinh
class LiveClassManager {
    constructor() {
        this.currentUser = null;
        this.currentGroup = 'class-12a1';
        this.isMicOn = true;
        this.isCameraOn = true;
        this.isScreenSharing = false;
        this.isCCOn = false;
        this.selectedStudents = [];
        this.participants = [];
        this.messages = [];
        this.attachedFiles = [];
        this.availableStudents = []; // Danh sách học sinh có thể thêm
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.cacheDom();
        this.setupEventListeners();
        this.loadParticipants();
        this.loadMessages();
        this.checkUserRole();
    }

    loadUserData() {
        const userStr = localStorage.getItem('currentUser');
        if (!userStr) {
            window.location.href = 'index.html';
            return;
        }
        this.currentUser = JSON.parse(userStr);
    }

    cacheDom() {
        this.groupSelect = document.getElementById('group-select');
        this.participantList = document.getElementById('participant-list');
        this.mainVideoArea = document.getElementById('main-video-area');
        this.micBtn = document.getElementById('mic-btn');
        this.cameraBtn = document.getElementById('camera-btn');
        this.screenShareBtn = document.getElementById('screen-share-btn');
        this.ccBtn = document.getElementById('cc-btn');
        this.endCallBtn = document.getElementById('end-call-btn');
        this.addStudentBtn = document.getElementById('add-student-btn');
        this.removeStudentBtn = document.getElementById('remove-student-btn');
        this.teacherControlsSection = document.getElementById('teacher-controls-section');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.attachBtn = document.getElementById('attach-btn');
        this.fileAttachment = document.getElementById('file-attachment');
        this.filePreviewContainer = document.getElementById('file-preview-container');
        
        // Modals
        this.addStudentModal = document.getElementById('add-student-modal');
        this.removeStudentModal = document.getElementById('remove-student-modal');
        this.addStudentForm = document.getElementById('add-student-form');
        this.studentSearchInput = document.getElementById('student-search-input');
        this.studentSearchResults = document.getElementById('student-search-results');
        this.studentRemoveList = document.getElementById('student-remove-list');
    }

    checkUserRole() {
        if (this.currentUser && this.currentUser.role === 'teacher') {
            if (this.teacherControlsSection) {
                this.teacherControlsSection.style.display = 'block';
            }
        }
    }

    setupEventListeners() {
        // Group selector
        if (this.groupSelect) {
            this.groupSelect.addEventListener('change', (e) => {
                this.currentGroup = e.target.value;
                this.loadParticipants();
                this.loadMessages();
            });
        }

        // Control buttons
        if (this.micBtn) {
            this.micBtn.addEventListener('click', () => this.toggleMic());
        }

        if (this.cameraBtn) {
            this.cameraBtn.addEventListener('click', () => this.toggleCamera());
        }

        if (this.screenShareBtn) {
            this.screenShareBtn.addEventListener('click', () => this.toggleScreenShare());
        }

        if (this.ccBtn) {
            this.ccBtn.addEventListener('click', () => this.toggleCC());
        }

        if (this.endCallBtn) {
            this.endCallBtn.addEventListener('click', () => this.endCall());
        }

        // Student management (teacher only)
        if (this.addStudentBtn) {
            this.addStudentBtn.addEventListener('click', () => this.showAddStudentModal());
        }

        if (this.removeStudentBtn) {
            this.removeStudentBtn.addEventListener('click', () => this.showRemoveStudentModal());
        }

        // Chat
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            this.chatInput.addEventListener('input', (e) => {
                // Auto-resize textarea
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
            });
        }

        if (this.attachBtn) {
            this.attachBtn.addEventListener('click', () => {
                if (this.fileAttachment) {
                    this.fileAttachment.click();
                }
            });
        }

        if (this.fileAttachment) {
            this.fileAttachment.addEventListener('change', (e) => {
                this.handleFileAttachment(e);
            });
        }

        // Modal close buttons
        const addStudentModalClose = document.getElementById('add-student-modal-close');
        const removeStudentModalClose = document.getElementById('remove-student-modal-close');
        const cancelAddStudent = document.getElementById('cancel-add-student');
        const cancelRemoveStudent = document.getElementById('cancel-remove-student');

        if (addStudentModalClose) {
            addStudentModalClose.addEventListener('click', () => this.closeAddStudentModal());
        }

        if (removeStudentModalClose) {
            removeStudentModalClose.addEventListener('click', () => this.closeRemoveStudentModal());
        }

        if (cancelAddStudent) {
            cancelAddStudent.addEventListener('click', () => this.closeAddStudentModal());
        }

        if (cancelRemoveStudent) {
            cancelRemoveStudent.addEventListener('click', () => this.closeRemoveStudentModal());
        }

        // Modal backdrop clicks
        if (this.addStudentModal) {
            this.addStudentModal.addEventListener('click', (e) => {
                if (e.target === this.addStudentModal) {
                    this.closeAddStudentModal();
                }
            });
        }

        if (this.removeStudentModal) {
            this.removeStudentModal.addEventListener('click', (e) => {
                if (e.target === this.removeStudentModal) {
                    this.closeRemoveStudentModal();
                }
            });
        }

        // Student search
        if (this.studentSearchInput) {
            this.studentSearchInput.addEventListener('input', (e) => {
                this.searchStudents(e.target.value);
            });
        }

        // Add student form
        if (this.addStudentForm) {
            this.addStudentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addSelectedStudents();
            });
        }

        // Remove student
        const confirmRemoveBtn = document.getElementById('confirm-remove-student');
        if (confirmRemoveBtn) {
            confirmRemoveBtn.addEventListener('click', () => {
                this.removeSelectedStudents();
            });
        }
    }

    loadParticipants() {
        // Mock data - trong thực tế sẽ lấy từ API
        const groupData = {
            'class-12a1': [
                { id: 'STU-001', name: 'Nguyễn Văn A', role: 'Học sinh', isActive: true },
                { id: 'STU-002', name: 'Trần Thị B', role: 'Học sinh', isActive: true },
                { id: 'STU-003', name: 'Lê Văn C', role: 'Học sinh', isActive: false }
            ],
            'class-12a2': [
                { id: 'STU-004', name: 'Phạm Thị D', role: 'Học sinh', isActive: true },
                { id: 'STU-005', name: 'Hoàng Văn E', role: 'Học sinh', isActive: true }
            ],
            'class-12a3': [
                { id: 'STU-006', name: 'Vũ Thị F', role: 'Học sinh', isActive: true },
                { id: 'STU-007', name: 'Đỗ Văn G', role: 'Học sinh', isActive: true }
            ]
        };

        // Add current user as teacher or student
        const currentUserParticipant = {
            id: this.currentUser.id || 'CURRENT',
            name: this.currentUser.name || 'Bạn',
            role: this.currentUser.role === 'teacher' ? 'Giáo viên' : 'Học sinh',
            isActive: true
        };

        this.participants = [currentUserParticipant, ...(groupData[this.currentGroup] || [])];
        this.renderParticipants();
    }

    renderParticipants() {
        if (!this.participantList) return;

        this.participantList.innerHTML = this.participants.map(participant => {
            const initials = participant.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            return `
                <div class="participant-item">
                    <div class="participant-avatar">${initials}</div>
                    <div class="participant-info">
                        <div class="participant-name">${participant.name}</div>
                        <div class="participant-role">${participant.role}</div>
                    </div>
                    <div class="participant-status ${participant.isActive ? 'active' : ''}"></div>
                </div>
            `;
        }).join('');
    }

    loadMessages() {
        // Mock messages - trong thực tế sẽ lấy từ API
        this.messages = [
            {
                id: 'MSG-001',
                sender: 'Giáo viên',
                senderId: 'TEACHER',
                content: 'Chào mừng các em đến với lớp học trực tuyến hôm nay!',
                time: '14:00',
                isOwn: false
            },
            {
                id: 'MSG-002',
                sender: 'Nguyễn Văn A',
                senderId: 'STU-001',
                content: 'Em chào thầy ạ!',
                time: '14:01',
                isOwn: this.currentUser.role !== 'teacher' && this.currentUser.id === 'STU-001'
            },
            {
                id: 'MSG-003',
                sender: 'Trần Thị B',
                senderId: 'STU-002',
                content: 'Thầy ơi, em có câu hỏi về bài tập hôm qua.',
                time: '14:02',
                isOwn: this.currentUser.role !== 'teacher' && this.currentUser.id === 'STU-002'
            }
        ];

        this.renderMessages();
    }

    renderMessages() {
        if (!this.chatMessages) return;

        this.chatMessages.innerHTML = this.messages.map(msg => {
            const isOwn = msg.isOwn || (msg.senderId === (this.currentUser.id || 'CURRENT'));
            return `
                <div class="chat-message ${isOwn ? 'own' : ''}">
                    <div class="message-sender">${msg.sender}</div>
                    <div class="message-bubble">${msg.content}</div>
                    <div class="message-time">${msg.time}</div>
                </div>
            `;
        }).join('');

        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    toggleMic() {
        this.isMicOn = !this.isMicOn;
        
        if (this.micBtn) {
            if (this.isMicOn) {
                this.micBtn.classList.remove('inactive');
                this.micBtn.classList.add('active');
                this.micBtn.querySelector('i').classList.remove('fa-microphone-slash');
                this.micBtn.querySelector('i').classList.add('fa-microphone');
            } else {
                this.micBtn.classList.remove('active');
                this.micBtn.classList.add('inactive');
                this.micBtn.querySelector('i').classList.remove('fa-microphone');
                this.micBtn.querySelector('i').classList.add('fa-microphone-slash');
            }
        }

        // Mô phỏng - trong thực tế sẽ gọi API để bật/tắt mic
        if (this.isMicOn) {
            console.log('Microphone đã bật');
        } else {
            console.log('Microphone đã tắt');
        }
    }

    toggleCamera() {
        this.isCameraOn = !this.isCameraOn;
        
        if (this.cameraBtn) {
            if (this.isCameraOn) {
                this.cameraBtn.classList.remove('inactive');
                this.cameraBtn.classList.add('active');
                this.cameraBtn.querySelector('i').classList.remove('fa-video-slash');
                this.cameraBtn.querySelector('i').classList.add('fa-video');
            } else {
                this.cameraBtn.classList.remove('active');
                this.cameraBtn.classList.add('inactive');
                this.cameraBtn.querySelector('i').classList.remove('fa-video');
                this.cameraBtn.querySelector('i').classList.add('fa-video-slash');
            }
        }

        // Mô phỏng - trong thực tế sẽ gọi API để bật/tắt camera
        if (this.isCameraOn) {
            console.log('Camera đã bật');
        } else {
            console.log('Camera đã tắt');
        }
    }

    toggleScreenShare() {
        if (!this.isScreenSharing) {
            // Mô phỏng chia sẻ màn hình
            if (confirm('Bạn muốn chia sẻ màn hình? Chọn nội dung muốn chia sẻ:\n1. Toàn màn hình\n2. Cửa sổ ứng dụng\n3. Tab trình duyệt')) {
                this.isScreenSharing = true;
                if (this.screenShareBtn) {
                    this.screenShareBtn.classList.remove('inactive');
                    this.screenShareBtn.classList.add('active');
                }
                if (this.mainVideoArea) {
                    this.mainVideoArea.innerHTML = `
                        <div class="video-placeholder">
                            <i class="fas fa-desktop" style="font-size: 64px; margin-bottom: 16px; opacity: 0.5;"></i>
                            <p>Đang chia sẻ màn hình</p>
                        </div>
                    `;
                }
                alert('Đã bắt đầu chia sẻ màn hình (mô phỏng).');
            }
        } else {
            this.isScreenSharing = false;
            if (this.screenShareBtn) {
                this.screenShareBtn.classList.remove('active');
                this.screenShareBtn.classList.add('inactive');
            }
            if (this.mainVideoArea) {
                this.mainVideoArea.innerHTML = `
                    <div class="video-placeholder">
                        <i class="fas fa-video" style="font-size: 64px; margin-bottom: 16px; opacity: 0.5;"></i>
                        <p>Video sẽ hiển thị ở đây</p>
                    </div>
                `;
            }
            alert('Đã dừng chia sẻ màn hình (mô phỏng).');
        }
    }

    toggleCC() {
        this.isCCOn = !this.isCCOn;
        
        if (this.ccBtn) {
            if (this.isCCOn) {
                this.ccBtn.classList.remove('inactive');
                this.ccBtn.classList.add('active');
                alert('Đã bật phụ đề/transcript (mô phỏng).');
            } else {
                this.ccBtn.classList.remove('active');
                this.ccBtn.classList.add('inactive');
                alert('Đã tắt phụ đề/transcript (mô phỏng).');
            }
        }
    }

    endCall() {
        if (confirm('Bạn có chắc chắn muốn kết thúc lớp học trực tuyến?')) {
            // Mô phỏng kết thúc cuộc gọi
            alert('Đã kết thúc lớp học trực tuyến (mô phỏng).');
            window.location.href = 'dashboard.html';
        }
    }

    showAddStudentModal() {
        if (!this.addStudentModal) return;
        this.addStudentModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        this.selectedStudents = [];
        if (this.studentSearchInput) {
            this.studentSearchInput.value = '';
        }
        if (this.studentSearchResults) {
            this.studentSearchResults.innerHTML = '<p class="text-muted">Nhập tên hoặc email để tìm kiếm học sinh...</p>';
        }
    }

    closeAddStudentModal() {
        if (!this.addStudentModal) return;
        this.addStudentModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    showRemoveStudentModal() {
        if (!this.removeStudentModal) return;
        this.removeStudentModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        this.renderRemoveStudentList();
    }

    closeRemoveStudentModal() {
        if (!this.removeStudentModal) return;
        this.removeStudentModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    searchStudents(query) {
        if (!query || query.trim().length < 2) {
            if (this.studentSearchResults) {
                this.studentSearchResults.innerHTML = '<p class="text-muted">Nhập ít nhất 2 ký tự để tìm kiếm...</p>';
            }
            return;
        }

        // Mock search results - trong thực tế sẽ gọi API
        const allStudents = [
            { id: 'STU-008', name: 'Bùi Thị H', email: 'buithih@example.com' },
            { id: 'STU-009', name: 'Ngô Văn I', email: 'ngovani@example.com' },
            { id: 'STU-010', name: 'Lý Thị K', email: 'lythik@example.com' },
            { id: 'STU-011', name: 'Võ Văn L', email: 'vovanl@example.com' }
        ];

        const filtered = allStudents.filter(student => {
            const searchTerm = query.toLowerCase();
            return student.name.toLowerCase().includes(searchTerm) || 
                   student.email.toLowerCase().includes(searchTerm);
        });

        // Lưu danh sách học sinh tìm được
        this.availableStudents = filtered;

        if (!this.studentSearchResults) return;

        if (filtered.length === 0) {
            this.studentSearchResults.innerHTML = '<p class="text-muted">Không tìm thấy học sinh nào.</p>';
            return;
        }

        this.studentSearchResults.innerHTML = filtered.map(student => {
            const isSelected = this.selectedStudents.includes(student.id);
            const checkboxId = `student-checkbox-${student.id}`;
            return `
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 8px;">
                    <input type="checkbox" id="${checkboxId}" data-student-id="${student.id}" ${isSelected ? 'checked' : ''}>
                    <div style="flex: 1;">
                        <div style="font-weight: 500;">${student.name}</div>
                        <div style="font-size: 13px; color: var(--text-secondary);">${student.email}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Bind checkbox events
        this.studentSearchResults.querySelectorAll('input[type="checkbox"][data-student-id]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.toggleStudentSelection(checkbox.dataset.studentId);
            });
        });
    }

    toggleStudentSelection(studentId) {
        const index = this.selectedStudents.indexOf(studentId);
        if (index > -1) {
            this.selectedStudents.splice(index, 1);
        } else {
            this.selectedStudents.push(studentId);
        }
    }

    addSelectedStudents() {
        if (this.selectedStudents.length === 0) {
            alert('Vui lòng chọn ít nhất một học sinh để thêm.');
            return;
        }

        // Lọc học sinh đã chọn từ danh sách tìm được
        const studentsToAdd = this.availableStudents
            .filter(s => this.selectedStudents.includes(s.id))
            .map(s => ({
                id: s.id,
                name: s.name,
                role: 'Học sinh',
                isActive: true
            }));

        // Kiểm tra xem học sinh đã có trong danh sách chưa
        const existingIds = this.participants.map(p => p.id);
        const newStudents = studentsToAdd.filter(s => !existingIds.includes(s.id));

        if (newStudents.length === 0) {
            alert('Tất cả học sinh đã chọn đã có trong lớp học.');
            return;
        }

        this.participants = [...this.participants, ...newStudents];
        this.renderParticipants();
        this.closeAddStudentModal();
        alert(`Đã thêm ${newStudents.length} học sinh vào lớp học (mô phỏng).`);
    }

    renderRemoveStudentList() {
        if (!this.studentRemoveList) return;

        // Chỉ hiển thị học sinh, không hiển thị giáo viên
        const students = this.participants.filter(p => p.role === 'Học sinh');

        if (students.length === 0) {
            this.studentRemoveList.innerHTML = '<p class="text-muted">Không có học sinh nào trong lớp học.</p>';
            return;
        }

        this.selectedStudents = [];
        this.studentRemoveList.innerHTML = students.map(student => {
            const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            return `
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; margin-bottom: 8px;">
                    <input type="checkbox" data-student-id="${student.id}">
                    <div class="participant-avatar">${initials}</div>
                    <div style="flex: 1;">
                        <div style="font-weight: 500;">${student.name}</div>
                        <div style="font-size: 13px; color: var(--text-secondary);">${student.role}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Bind checkbox events
        this.studentRemoveList.querySelectorAll('input[type="checkbox"][data-student-id]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.toggleStudentSelection(checkbox.dataset.studentId);
            });
        });
    }

    removeSelectedStudents() {
        if (this.selectedStudents.length === 0) {
            alert('Vui lòng chọn ít nhất một học sinh để xóa.');
            return;
        }

        if (confirm(`Bạn có chắc chắn muốn xóa ${this.selectedStudents.length} học sinh khỏi lớp học?`)) {
            this.participants = this.participants.filter(p => 
                !this.selectedStudents.includes(p.id)
            );
            this.renderParticipants();
            this.closeRemoveStudentModal();
            alert(`Đã xóa ${this.selectedStudents.length} học sinh khỏi lớp học (mô phỏng).`);
        }
    }

    handleFileAttachment(event) {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        files.forEach(file => {
            this.attachedFiles.push(file);
            this.renderFilePreview();
        });
    }

    renderFilePreview() {
        if (!this.filePreviewContainer) return;

        this.filePreviewContainer.innerHTML = this.attachedFiles.map((file, index) => {
            const fileSize = (file.size / 1024).toFixed(1);
            return `
                <div class="file-preview">
                    <i class="fas fa-file"></i>
                    <span style="flex: 1;">${file.name} (${fileSize} KB)</span>
                    <span class="file-preview-remove" onclick="liveClassManager.removeFile(${index})">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            `;
        }).join('');
    }

    removeFile(index) {
        this.attachedFiles.splice(index, 1);
        this.renderFilePreview();
    }

    sendMessage() {
        const messageText = this.chatInput?.value.trim();
        if (!messageText && this.attachedFiles.length === 0) {
            return;
        }

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newMessage = {
            id: `MSG-${Date.now()}`,
            sender: this.currentUser.name || 'Bạn',
            senderId: this.currentUser.id || 'CURRENT',
            content: messageText || `[Đã đính kèm ${this.attachedFiles.length} file]`,
            time: timeStr,
            isOwn: true,
            attachments: [...this.attachedFiles]
        };

        this.messages.push(newMessage);
        this.renderMessages();

        // Clear input
        if (this.chatInput) {
            this.chatInput.value = '';
            this.chatInput.style.height = 'auto';
        }

        // Clear attachments
        this.attachedFiles = [];
        this.renderFilePreview();
        if (this.fileAttachment) {
            this.fileAttachment.value = '';
        }

        // Mô phỏng - trong thực tế sẽ gửi tin nhắn qua WebSocket/API
        console.log('Đã gửi tin nhắn:', newMessage);
    }
}

// Global instance
let liveClassManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    liveClassManager = new LiveClassManager();
});

