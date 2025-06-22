// Tailwind 配置（需放在所有 DOM 操作前）
tailwind.config = {
  theme: {
    extend: {
      colors: { primary: "#3B82F6", secondary: "#10B981" },
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",
        button: "8px",
      },
    },
  },
};

// 导航交互与移动端菜单
document.addEventListener("DOMContentLoaded", function() {
  // 滚动时更新导航激活状态
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");
  
  function setActiveLink() {
    let currentSection = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute("id");
      }
    });
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }
  
  window.addEventListener("scroll", setActiveLink);
  setActiveLink();
  
  // 移动端菜单交互
  const menuButton = document.querySelector(".md\\:hidden");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeButton = mobileMenu.querySelector("button");
  const mobileLinks = mobileMenu.querySelectorAll("a");
  
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
  
  closeButton.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "";
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      document.body.style.overflow = "";
    });
  });
});

// 粒子动画系统
document.addEventListener("DOMContentLoaded", function() {
  const container = document.getElementById("particles-container");
  const logo = document.getElementById("game-logo");
  
  if (!container || !logo) return; // 确保元素存在
  
  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    
    // 随机粒子大小
    const size = Math.random() * 10 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // 基于 logo 位置计算初始坐标
    const logoRect = logo.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const startX = Math.random() * logoRect.width + (logoRect.left - containerRect.left);
    const startY = Math.random() * logoRect.height + (logoRect.top - containerRect.top);
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    
    // 随机运动轨迹
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 50;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);
    
    // 随机动画时长
    const duration = Math.random() * 2 + 2;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
    
    // 动画结束后移除粒子
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
  
  // 初始化创建粒子
  for (let i = 0; i < 20; i++) {
    setTimeout(createParticle, Math.random() * 2000);
  }
  
  // 定期创建新粒子
  setInterval(createParticle, 300);
});

// 卡片翻转功能
document.addEventListener("DOMContentLoaded", function() {
  const cards = document.querySelectorAll(".card");
  
  cards.forEach(card => {
    const frontButton = card.querySelector(".card-front button");
    const backButton = card.querySelector(".card-back button");
    
    if (frontButton && backButton) { // 确保按钮存在
      frontButton.addEventListener("click", () => {
        card.classList.add("flipped");
      });
      
      backButton.addEventListener("click", () => {
        card.classList.remove("flipped");
      });
    }
  });
});

// 表单交互与验证
document.addEventListener("DOMContentLoaded", function() {
  const checkbox = document.getElementById("subscribe");
  const indicator = document.querySelector(".checkbox-indicator");
  const form = document.getElementById("contact-form");
  
  if (checkbox && indicator && form) { // 确保元素存在
    // 复选框状态切换
    checkbox.addEventListener("change", function() {
      if (this.checked) {
        indicator.classList.remove("hidden");
      } else {
        indicator.classList.add("hidden");
      }
    });
    
    // 表单提交处理
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // 获取表单字段
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;
      
      // 验证必填字段
      if (!name || !email || !message) {
        alert("请填写所有带 * 标记的必填字段");
        return;
      }
      
      // 显示加载状态
      submitButton.innerHTML = "提交中...";
      submitButton.disabled = true;
      
      // 模拟异步提交
      setTimeout(() => {
        alert("感谢您的反馈！我们会尽快回复您。");
        form.reset();
        indicator.classList.add("hidden");
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 1500);
    });
  }
});


  // script.js - 角色关联折叠面板交互逻辑
  document.addEventListener("DOMContentLoaded", function() {
    // 折叠面板交互逻辑
    function initCharacterToggles() {
      const container = document.getElementById('characters-related');
      if (!container) return;
      
      // 使用事件委托处理所有折叠按钮点击
      container.addEventListener('click', function(e) {
        const button = e.target.closest('.toggle-button');
        if (!button) return;
        
        // 找到对应的折叠面板组件
        const toggleContainer = button.closest('.related-characters-toggle');
        const contentPanel = toggleContainer.nextElementSibling;
        const arrowIcon = button.querySelector('.arrow-icon');
        const textSpan = button.querySelector('span');
        
        if (contentPanel && arrowIcon && textSpan) {
          // 切换内容显示状态
          contentPanel.classList.toggle('hidden');
          
          // 更新按钮图标和文字
          if (contentPanel.classList.contains('hidden')) {
            arrowIcon.className = 'arrow-icon ri-arrow-down-s-line';
            textSpan.textContent = '展开';
          } else {
            arrowIcon.className = 'arrow-icon ri-arrow-up-s-line';
            textSpan.textContent = '收起';
          }
        }
      });
    }
    
    // 初始化所有交互组件
    function initComponents() {
      initCharacterToggles();
      console.log('角色关联折叠面板初始化完成');
    }
    
    // 执行初始化
    initComponents();
  });