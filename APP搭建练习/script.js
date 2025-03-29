function feelingLucky() {
    const searchInput = document.querySelector('.search-input').value;
    const luckyURL = `https://www.google.com/search?q=${encodeURIComponent(searchInput)}&btnI=I%27m+Feeling+Lucky`;
    window.location.href = luckyURL;
}

// 随机emoji弹出功能
const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', 
               '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗', 
               '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥',
               '🌟', '⭐', '💫', '✨', '🔥', '💯', '💕', '💞', '💓', '💗'];

document.addEventListener('mousemove', function(e) {
    // 限制emoji生成的频率，每30px移动生成一个
    if (Math.random() > 0.9) {
        createEmoji(e.pageX, e.pageY);
    }
});

// 页面加载后预加载声音
window.addEventListener('load', function() {
    // 尝试预加载所有声音
    for (let i = 1; i <= 5; i++) {
        const sound = document.getElementById(`click-sound-${i}`);
        if (sound) {
            sound.load();
            console.log(`声音 ${i} 已预加载`);
        }
    }
    
    // 测试播放声音（由于浏览器策略，这里可能不会成功，但在点击时会成功）
    const testSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-light-button-2580.mp3');
    testSound.volume = 0.3;
    testSound.play().then(() => {
        console.log('测试声音播放成功');
    }).catch(error => {
        console.log('测试声音播放失败（预期）:', error);
        console.log('这是正常的，请点击页面的任何位置来播放声音');
    });
});

// 鼠标点击声音反馈
document.addEventListener('click', function(e) {
    // 在点击位置创建一个视觉指示器，确认点击被处理
    createClickIndicator(e.pageX, e.pageY);
    playRandomClickSound();
});

// 创建点击指示器
function createClickIndicator(x, y) {
    const indicator = document.createElement('div');
    indicator.style.position = 'absolute';
    indicator.style.left = `${x - 5}px`;
    indicator.style.top = `${y - 5}px`;
    indicator.style.width = '10px';
    indicator.style.height = '10px';
    indicator.style.borderRadius = '50%';
    indicator.style.backgroundColor = 'rgba(66, 133, 244, 0.5)';
    indicator.style.pointerEvents = 'none';
    indicator.style.transition = 'all 0.3s ease-out';
    indicator.style.zIndex = '9999';
    
    document.body.appendChild(indicator);
    
    // 动画效果
    setTimeout(() => {
        indicator.style.transform = 'scale(3)';
        indicator.style.opacity = '0';
    }, 10);
    
    // 移除元素
    setTimeout(() => {
        document.body.removeChild(indicator);
    }, 300);
}

// 播放随机点击声音
function playRandomClickSound() {
    // 随机选择一个声音文件
    const soundNumber = Math.floor(Math.random() * 5) + 1;
    const sound = document.getElementById(`click-sound-${soundNumber}`);
    
    if (!sound) {
        console.error(`找不到音频元素: click-sound-${soundNumber}`);
        return;
    }
    
    // 重置音频，以便连续点击时可以播放
    sound.currentTime = 0;
    
    // 设置音量
    sound.volume = 0.4;
    
    // 创建一个视觉指示表明正在尝试播放声音
    console.log(`正在尝试播放声音 ${soundNumber}`);
    
    // 播放声音
    const playPromise = sound.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log(`声音 ${soundNumber} 播放成功`);
        }).catch(error => {
            console.error(`声音播放失败: ${error.message}`);
            
            // 尝试使用备用方法播放声音
            const backupSound = new Audio();
            backupSound.src = sound.querySelector('source').src;
            backupSound.volume = 0.4;
            backupSound.play().catch(err => {
                console.error('备用播放方法也失败:', err);
            });
        });
    }
}

function createEmoji(x, y) {
    // 创建一个emoji元素
    const emoji = document.createElement('div');
    // 随机选择一个emoji
    emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    // 设置emoji的样式
    emoji.style.position = 'absolute';
    emoji.style.left = `${x}px`;
    emoji.style.top = `${y}px`;
    emoji.style.fontSize = '20px';
    emoji.style.pointerEvents = 'none'; // 使emoji不影响鼠标事件
    emoji.style.userSelect = 'none'; // 禁止选择
    emoji.style.transition = 'all 1s ease';
    emoji.style.opacity = '1';
    emoji.style.transform = 'translateY(0)';
    
    // 将emoji添加到文档中
    document.body.appendChild(emoji);
    
    // 随机移动方向
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = -Math.random() * 100;
    
    // 设置动画效果
    setTimeout(() => {
        emoji.style.opacity = '0';
        emoji.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 50);
    
    // 移除元素
    setTimeout(() => {
        document.body.removeChild(emoji);
    }, 1000);
} 