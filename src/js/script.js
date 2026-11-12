document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.querySelector('.prompt-input');
    const btnPlus = document.querySelector('.btn-plus');
    const brandTitles = document.querySelectorAll('.app-brand');
    const footerCipher = document.querySelectorAll('.footer-cipher');
    const celibatoLinks = document.querySelectorAll('.link-celibato');
    const relacionamentosLinks = document.querySelectorAll('.link-relacionamentos');
    const agnesLinks = document.querySelectorAll('.link-agnes');
    const agnesPhoto = document.querySelector('.agnes-photo');
    const cipherMorphImg = document.getElementById('cipher-morph-img');
    const converseAgoraBtn = document.querySelector('.btn-converse-agora');
    const appLayout = document.getElementById('app-layout');
    const forms = document.querySelectorAll('form');

    const currentPath = window.location.pathname;
    const isFirstPage = document.querySelector('.hero-section') !== null;

    document.body.classList.remove('glitch-active', 'glitch-intense', 'glitch-extreme');
    if (appLayout) appLayout.classList.remove('glitch-active', 'glitch-intense', 'glitch-extreme');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => e.preventDefault());
    });

    function triggerGlitchAndNavigate(targetUrl) {
        const targetElement = appLayout || document.body;

        if (!targetElement.classList.contains('glitch-active')) {
            targetElement.classList.add('glitch-active');
            document.body.classList.add('glitch-active');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 400);
        }
    }

    function triggerIntenseGlitchAndNavigate(targetUrl) {
        const targetElement = appLayout || document.body;

        if (!targetElement.classList.contains('glitch-intense')) {
            targetElement.classList.add('glitch-intense');
            document.body.classList.add('glitch-intense');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 650);
        }
    }

    function triggerExtremeGlitchAndNavigate(targetUrl) {
        const targetElement = appLayout || document.body;

        if (!targetElement.classList.contains('glitch-extreme')) {
            targetElement.classList.add('glitch-extreme');
            document.body.classList.add('glitch-extreme');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 950);
        }
    }

    if (cipherMorphImg) {
        const stagesAttr = cipherMorphImg.getAttribute('data-stages') || '';
        const stages = stagesAttr.split(',').map(s => s.trim()).filter(Boolean);
        let clickCount = 0;

        cipherMorphImg.addEventListener('click', () => {
            clickCount++;

            if (clickCount <= 3 && stages[clickCount]) {
                cipherMorphImg.classList.remove('micro-glitch');
                void cipherMorphImg.offsetWidth;
                cipherMorphImg.classList.add('micro-glitch');
                cipherMorphImg.src = stages[clickCount];
            } else {
                const target = cipherMorphImg.getAttribute('data-target') || 'proxima-pagina.html';
                triggerExtremeGlitchAndNavigate(target);
            }
        });
    }

    if (converseAgoraBtn) {
        converseAgoraBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerGlitchAndNavigate('prompt.html');
        });
    }

    function getNextPageInOrder() {
        if (isFirstPage || currentPath.includes('index.html')) {
            return { url: 'prompt.html', intense: false };
        }
        if (currentPath.includes('prompt.html')) {
            return { url: 'chat-incel.html', intense: false };
        }
        if (currentPath.includes('chat-incel.html')) {
            return { url: 'chat-relacionamentos.html', intense: false };
        }
        if (currentPath.includes('chat-relacionamentos.html')) {
            return { url: 'chat-agnes.html', intense: false };
        }
        if (currentPath.includes('chat-agnes.html')) {
            const target = agnesPhoto ? (agnesPhoto.getAttribute('data-target') || 'agnes-perfil.html') : 'agnes-perfil.html';
            return { url: target, intense: true };
        }
        return { url: 'index.html', intense: false };
    }

    if (promptInput) {
        function handleSequentialAdvance() {
            const text = promptInput.value.trim();

            if (text === '') {
                promptInput.focus();
                return;
            }

            const nextStep = getNextPageInOrder();
            if (nextStep.intense) {
                triggerIntenseGlitchAndNavigate(nextStep.url);
            } else {
                triggerGlitchAndNavigate(nextStep.url);
            }
        }

        promptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSequentialAdvance();
            }
        });

        if (btnPlus) {
            btnPlus.addEventListener('click', (e) => {
                e.preventDefault();
                handleSequentialAdvance();
            });
        }
    }

    if (agnesPhoto) {
        agnesPhoto.addEventListener('click', () => {
            const target = agnesPhoto.getAttribute('data-target') || 'agnes-perfil.html';
            triggerIntenseGlitchAndNavigate(target);
        });
    }

    brandTitles.forEach(brand => {
        brand.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            triggerGlitchAndNavigate('index.html');
        });
    });

    footerCipher.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const target = link.getAttribute('data-target') || link.getAttribute('href') || 'cipher-card.html';
            triggerGlitchAndNavigate(target);
        });
    });

    celibatoLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            triggerGlitchAndNavigate('chat-incel.html');
        });
    });

    relacionamentosLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            triggerGlitchAndNavigate('chat-relacionamentos.html');
        });
    });

    agnesLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            triggerGlitchAndNavigate('chat-agnes.html');
        });
    });
});