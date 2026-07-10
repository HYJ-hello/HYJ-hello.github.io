// 当页面加载完成后，在控制台和页面上显示信息
window.onload = function() {
    console.log('欢迎来到我的Gmeek博客！');
    // 在页面顶部显示一条信息
    const msg = document.createElement('div');
    msg.innerHTML = '🎉 欢迎光临！';
    msg.style.cssText = 'background: #f0f0f0; padding: 10px; text-align: center;';
    document.body.prepend(msg);
};
