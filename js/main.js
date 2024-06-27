var menuIcon = document.querySelector('.menu-icon');
var ul = document.querySelector('.ul');

// Adiciona ou remove a classe 'ativo' ao menu e altera o ícone
menuIcon.addEventListener('click', () => {
    if (ul.classList.contains('ativo')) {
        ul.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png';
        menuIcon.setAttribute('aria-expanded', 'false');
    } else {
        ul.classList.add('ativo');
        document.querySelector('.menu-icon img').src = 'img/close.png';
        menuIcon.setAttribute('aria-expanded', 'true');
    }
});

// Fechar o menu ao clicar em um link e rolar suavemente
document.querySelectorAll('.ul a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
        ul.classList.remove('ativo');
        document.querySelector('.menu-icon img').src = 'img/menu.png';
        menuIcon.setAttribute('aria-expanded', 'false');
        
        // Evita o comportamento padrão e rola suavemente
        event.preventDefault();
        const targetId = link.getAttribute('href');
        const targetPosition = document.querySelector(targetId).offsetTop - 90;
        smoothScrollTo(0, targetPosition);
    });
});

// Função de rolagem suave
function smoothScrollTo(endX, endY, duration = 900) {
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1)
            return (distance / 2) * time * time * time * time + from;
        return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
    };

    function scroll() {
        const currentTime = new Date().getTime() - startTime;
        const newX = easeInOutQuart(currentTime, startX, distanceX, duration);
        const newY = easeInOutQuart(currentTime, startY, distanceY, duration);

        if (currentTime < duration) {
            window.scrollTo(newX, newY);
            requestAnimationFrame(scroll);
        } else {
            window.scrollTo(endX, endY);
        }
    }

    requestAnimationFrame(scroll);
}
