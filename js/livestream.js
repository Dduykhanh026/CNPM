// Livestream Management - Giao diện livestream một chiều
class LivestreamManager {
    constructor() {
        this.currentUser = null;
        this.isTeacher = false;
        this.isStreaming = false;
        this.isMicOn = true;
        this.isCameraOn = true;
        this.isPlaying = true;
        this.isMuted = false;
        this.isFullscreen = false;
        this.currentTab = 'chat';
        this.messages = [];
        this.viewers = [];
        this.likes = 0;
        this.viewerCount = 0;
        
        this.init();
    }

    init() {
        this.loadUserData();
        this.cacheDom();
        this.setupEventListeners();
        this.loadStreamData();
        this.loadMessages();
        this.loadViewers();
        this.renderChat();
        this.startViewerCount();
    }

    loadUserData() {
        const userStr = localStorage.getItem('currentUser');
        if (!userStr) {
            window.location.href = 'index.html';
            return;
        }
        this.currentUser = JSON.parse(userStr);
        this.isTeacher = this.currentUser.role === 'teacher';
    }

    cacheDom() {
        this.streamTitle = document.getElementById('stream-title');
        this.viewerCountEl = document.getElementById('viewer-count');
        this.teacherControls = document.getElementById('teacher-controls');
        this.micControl = document.getElementById('mic-control');
        this.cameraControl = document.getElementById('camera-control');
        this.endStreamBtn = document.getElementById('end-stream-btn');
        this.videoPlayer = document.getElementById('video-player');
        this.playPauseBtn = document.getElementById('play-pause-btn');
        this.volumeBtn = document.getElementById('volume-btn');
        this.fullscreenBtn = document.getElementById('fullscreen-btn');
        this.sidebarTabs = document.querySelectorAll('.sidebar-tab');
        this.sidebarContent = document.getElementById('sidebar-content');
        this.chatInputArea = document.getElementById('chat-input-area');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.likeBtn = document.getElementById('like-btn');
    }

    setupEventListeners() {
        // Teacher controls
        if (this.isTeacher && this.teacherControls) {
            this.teacherControls.style.display = 'flex';
            
            if (this.micControl) {
                this.micControl.addEventListener('click', () => this.toggleMic());
            }
            
            if (this.cameraControl) {
                this.cameraControl.addEventListener('click', () => this.toggleCamera());
            }
            
            if (this.endStreamBtn) {
                this.endStreamBtn.addEventListener('click', () => this.endStream());
            }
        }

        // Video controls
        if (this.playPauseBtn) {
            this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }

        if (this.volumeBtn) {
            this.volumeBtn.addEventListener('click', () => this.toggleMute());
        }

        if (this.fullscreenBtn) {
            this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        // Sidebar tabs
        this.sidebarTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Chat
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }

        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        if (this.likeBtn) {
            this.likeBtn.addEventListener('click', () => this.toggleLike());
        }
    }

    loadStreamData() {
        // Mock data - trong thực tế sẽ lấy từ URL params hoặc API
        const urlParams = new URLSearchParams(window.location.search);
        const streamId = urlParams.get('id') || 'stream-001';
        
        // Mock stream data
        const streamData = {
            'stream-001': {
                title: 'Livestream Toán - Đại số',
                teacher: 'Nguyễn Văn A',
                subject: 'Toán',
                startTime: new Date()
            },
            'stream-002': {
                title: 'Livestream Vật Lý - Dao động',
                teacher: 'Trần Thị B',
                subject: 'Vật Lý',
                startTime: new Date()
            }
        };

        const stream = streamData[streamId] || streamData['stream-001'];
        if (this.streamTitle) {
            this.streamTitle.textContent = stream.title;
        }
    }

    loadMessages() {
        // Mock messages
        this.messages = [
            {
                id: 'MSG-001',
                sender: 'Nguyễn Văn B',
                senderId: 'STU-001',
                content: 'Thầy ơi, em chào thầy!',
                time: '14:05',
                isOwn: false
            },
            {
                id: 'MSG-002',
                sender: 'Trần Thị C',
                senderId: 'STU-002',
                content: 'Em có câu hỏi về bài tập hôm qua ạ',
                time: '14:06',
                isOwn: false
            },
            {
                id: 'MSG-003',
                sender: 'Lê Văn D',
                senderId: 'STU-003',
                content: 'Bài giảng rất hay ạ!',
                time: '14:07',
                isOwn: false
            }
        ];
    }

    loadViewers() {
        // Mock viewers
        this.viewers = [
            { id: 'STU-001', name: 'Nguyễn Văn B', isActive: true },
            { id: 'STU-002', name: 'Trần Thị C', isActive: true },
            { id: 'STU-003', name: 'Lê Văn D', isActive: true },
            { id: 'STU-004', name: 'Phạm Thị E', isActive: true },
            { id: 'STU-005', name: 'Hoàng Văn F', isActive: false }
        ];

        // Add current user if not teacher
        if (!this.isTeacher && this.currentUser) {
            const exists = this.viewers.some(v => v.id === this.currentUser.id);
            if (!exists) {
                this.viewers.push({
                    id: this.currentUser.id || 'CURRENT',
                    name: this.currentUser.name || 'Bạn',
                    isActive: true
                });
            }
        }
    }

    startViewerCount() {
        // Simulate viewer count
        this.viewerCount = this.viewers.filter(v => v.isActive).length;
        if (this.viewerCountEl) {
            this.viewerCountEl.textContent = this.viewerCount;
        }

        // Update every 5 seconds (simulate)
        setInterval(() => {
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            this.viewerCount = Math.max(1, this.viewerCount + change);
            if (this.viewerCountEl) {
                this.viewerCountEl.textContent = this.viewerCount;
            }
        }, 5000);
    }

    toggleMic() {
        this.isMicOn = !this.isMicOn;
        if (this.micControl) {
            const icon = this.micControl.querySelector('i');
            if (this.isMicOn) {
                icon.classList.remove('fa-microphone-slash');
                icon.classList.add('fa-microphone');
                this.micControl.classList.add('active');
            } else {
                icon.classList.remove('fa-microphone');
                icon.classList.add('fa-microphone-slash');
                this.micControl.classList.remove('active');
            }
        }
        console.log('Microphone:', this.isMicOn ? 'ON' : 'OFF');
    }

    toggleCamera() {
        this.isCameraOn = !this.isCameraOn;
        if (this.cameraControl) {
            const icon = this.cameraControl.querySelector('i');
            if (this.isCameraOn) {
                icon.classList.remove('fa-video-slash');
                icon.classList.add('fa-video');
                this.cameraControl.classList.add('active');
            } else {
                icon.classList.remove('fa-video');
                icon.classList.add('fa-video-slash');
                this.cameraControl.classList.remove('active');
            }
        }
        console.log('Camera:', this.isCameraOn ? 'ON' : 'OFF');
    }

    endStream() {
        if (confirm('Bạn có chắc chắn muốn kết thúc livestream?')) {
            alert('Đã kết thúc livestream (mô phỏng).');
            window.location.href = 'dashboard.html';
        }
    }

    togglePlayPause() {
        this.isPlaying = !this.isPlaying;
        if (this.playPauseBtn) {
            const icon = this.playPauseBtn.querySelector('i');
            if (this.isPlaying) {
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
            } else {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
            }
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.volumeBtn) {
            const icon = this.volumeBtn.querySelector('i');
            if (this.isMuted) {
                icon.classList.remove('fa-volume-up');
                icon.classList.add('fa-volume-mute');
            } else {
                icon.classList.remove('fa-volume-mute');
                icon.classList.add('fa-volume-up');
            }
        }
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        if (this.fullscreenBtn) {
            const icon = this.fullscreenBtn.querySelector('i');
            if (this.isFullscreen) {
                icon.classList.remove('fa-expand');
                icon.classList.add('fa-compress');
                if (this.videoPlayer) {
                    this.videoPlayer.requestFullscreen?.();
                }
            } else {
                icon.classList.remove('fa-compress');
                icon.classList.add('fa-expand');
                document.exitFullscreen?.();
            }
        }
    }

    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Update tab buttons
        this.sidebarTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Show/hide chat input
        if (this.chatInputArea) {
            this.chatInputArea.style.display = tabName === 'chat' ? 'block' : 'none';
        }

        // Render content
        if (tabName === 'chat') {
            this.renderChat();
        } else if (tabName === 'viewers') {
            this.renderViewers();
        }
    }

    renderChat() {
        if (!this.sidebarContent) return;

        this.sidebarContent.innerHTML = `
            <div class="chat-messages" id="chat-messages">
                ${this.messages.map(msg => {
                    const isOwn = msg.isOwn || (msg.senderId === (this.currentUser.id || 'CURRENT'));
                    const initials = msg.sender.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                    return `
                        <div class="chat-message">
                            <div class="message-header">
                                <div class="message-avatar">${initials}</div>
                                <span class="message-sender">${msg.sender}</span>
                                <span class="message-time">${msg.time}</span>
                            </div>
                            <div class="message-content">${msg.content}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;

        // Scroll to bottom
        const chatMessages = document.getElementById('chat-messages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    renderViewers() {
        if (!this.sidebarContent) return;

        this.sidebarContent.innerHTML = `
            <div class="viewers-list">
                ${this.viewers.map(viewer => {
                    const initials = viewer.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                    return `
                        <div class="viewer-item">
                            <div class="viewer-avatar">${initials}</div>
                            <div class="viewer-name">${viewer.name}</div>
                            ${viewer.isActive ? '<span style="color: #4CAF50; font-size: 12px;">●</span>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    sendMessage() {
        const messageText = this.chatInput?.value.trim();
        if (!messageText) return;

        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const newMessage = {
            id: `MSG-${Date.now()}`,
            sender: this.currentUser.name || 'Bạn',
            senderId: this.currentUser.id || 'CURRENT',
            content: messageText,
            time: timeStr,
            isOwn: true
        };

        this.messages.push(newMessage);
        this.renderChat();

        // Clear input
        if (this.chatInput) {
            this.chatInput.value = '';
        }

        console.log('Đã gửi tin nhắn:', newMessage);
    }

    toggleLike() {
        if (this.likeBtn) {
            const icon = this.likeBtn.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.likeBtn.classList.add('liked');
                this.likes++;
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.likeBtn.classList.remove('liked');
                this.likes = Math.max(0, this.likes - 1);
            }
        }
    }
}

// Global instance
let livestreamManager;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    livestreamManager = new LivestreamManager();
});

