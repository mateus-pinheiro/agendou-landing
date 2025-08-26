// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('popup-overlay');
    const popupClose = document.getElementById('popup-close');
    const signupForm = document.getElementById('signup-form');
    const telefoneInput = document.getElementById('telefone');
    
    // Botões que abrem o popup
    const triggerButtons = document.querySelectorAll('a[href="#precos"], .btn-primary');
    
    // Função para abrir o popup
    function openPopup() {
        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previne scroll da página
    }
    
    // Função para fechar o popup
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll da página
        signupForm.reset(); // Limpa o formulário
    }
    
    // Event listeners para abrir o popup
    triggerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Só abre o popup se for um botão de teste grátis
            if (this.textContent.includes('teste') || this.textContent.includes('Quero') || this.textContent.includes('Começar')) {
                e.preventDefault();
                openPopup();
            }
        });
    });
    
    // Event listener para fechar o popup
    popupClose.addEventListener('click', closePopup);
    
    // Fechar popup clicando fora dele
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Fechar popup com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    // Máscara para telefone
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 2) {
                value = value.replace(/(\d{0,2})/, '($1');
            } else if (value.length <= 7) {
                value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
    
    // Validação e envio do formulário
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Validações básicas
        if (!nome || nome.length < 2) {
            alert('Por favor, digite seu nome completo.');
            return;
        }
        
        if (!telefone || telefone.replace(/\D/g, '').length < 10) {
            alert('Por favor, digite um telefone válido com DDD.');
            return;
        }
        
        if (!email || !isValidEmail(email)) {
            alert('Por favor, digite um e-mail válido.');
            return;
        }
        
        // Simula envio do formulário
        const submitButton = signupForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simula delay de envio
        setTimeout(() => {
            alert('Cadastro realizado com sucesso! Em breve entraremos em contato.');
            closePopup();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
    
    // Função para validar e-mail
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Smooth scroll para navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Só faz smooth scroll se não for um botão de popup
            if (!this.textContent.includes('teste') && !this.textContent.includes('Quero') && !this.textContent.includes('Começar')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Animação de entrada para elementos quando entram na viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.step, .audience-item, .benefit-item, .pricing-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Efeito parallax sutil no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-img');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Navbar background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Adicionar efeito hover nos botões CTA
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // Contador animado para o preço (opcional)
    const priceElement = document.querySelector('.amount');
    if (priceElement) {
        const finalPrice = parseInt(priceElement.textContent);
        let currentPrice = 0;
        const increment = finalPrice / 30;

        const priceAnimation = setInterval(() => {
            currentPrice += increment;
            if (currentPrice >= finalPrice) {
                currentPrice = finalPrice;
                clearInterval(priceAnimation);
            }
            priceElement.textContent = Math.floor(currentPrice);
        }, 50);
    }

    // Mobile menu toggle (se necessário no futuro)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // Form validation (para quando adicionar formulários)
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });

    // Lazy loading para imagens (se houver mais imagens)
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Função para tracking de eventos (Google Analytics, etc.)
function trackEvent(eventName, eventData = {}) {
    // Implementar tracking aqui quando necessário
    console.log('Event tracked:', eventName, eventData);

    // Exemplo para Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Adicionar tracking aos botões CTA
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            page_location: window.location.href
        });
    }
});

// Função para mostrar notificações (toast)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
  // ... (seu código atual)

  // === Mobile menu (hambúrguer) ===
  const btn = document.querySelector('.hamburger');
  const nav = document.getElementById('primary-nav');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      btn.classList.toggle('active', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('no-scroll', isOpen);
    });

    // Fecha ao clicar em um link do menu
    nav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      }
    });
  } else {
    console.warn('Hamburger ou nav não encontrados.');
  }
});


