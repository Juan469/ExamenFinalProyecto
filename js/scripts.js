document.addEventListener('DOMContentLoaded', () => {
    // =====================================
    // ⚙️ Menú de Navegación Toggle
    // =====================================
    const navToggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            navList.classList.toggle('open');
            navToggle.classList.toggle('open');
            // Cambia el aria-expanded para accesibilidad
            const isOpen = navList.classList.contains('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Cerrar menú al hacer clic en un enlace (solo en móvil)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) { // Cierra solo si es una pantalla pequeña
                    navList.classList.remove('open');
                    navToggle.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', false);
                }
            });
        });
    }

    // =====================================
    // ⚙️ Mostrar/Ocultar Contenido de Tarjetas
    // =====================================
    const showContentButtons = document.querySelectorAll('.show-content-btn');

    showContentButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const targetId = event.target.dataset.target;
            const fullContentDiv = document.getElementById(targetId);

            if (fullContentDiv) {
                // Oculta todos los otros contenidos expandidos
                document.querySelectorAll('.full-content.visible').forEach(content => {
                    if (content.id !== targetId) { // No ocultar el que se va a mostrar
                        content.classList.remove('visible');
                        // Restaurar texto del botón "Ver Tutorial/Patrón"
                        const parentCard = content.closest('.tutorial-card') || content.closest('.pattern-card');
                        if (parentCard) {
                            const btn = parentCard.querySelector('.show-content-btn');
                            if (btn) {
                                // Determinar si es tutorial o patrón para el texto del botón
                                const isTutorial = parentCard.classList.contains('tutorial-card');
                                btn.textContent = isTutorial ? 'Ver Tutorial' : 'Ver Patrón';
                            }
                        }
                    }
                });

                // Muestra u oculta el contenido actual
                fullContentDiv.classList.toggle('visible');
                const isVisible = fullContentDiv.classList.contains('visible');
                event.target.textContent = isVisible ?
                    (fullContentDiv.closest('.tutorial-card') ? 'Ocultar Tutorial' : 'Ocultar Patrón') :
                    (fullContentDiv.closest('.tutorial-card') ? 'Ver Tutorial' : 'Ver Patrón');
            }
        });
    });

    // =====================================
    // ⚙️ Funcionalidad de Búsqueda y Filtro (Tutoriales y Patrones)
    // =====================================
    const searchTutorialInput = document.getElementById('searchTutorial');
    const categoryTutorialSelect = document.getElementById('categoryTutorial');
    const tutorialGrid = document.getElementById('tutorialGrid');
    const tutorialCards = document.querySelectorAll('.tutorial-card');

    const searchPatternInput = document.getElementById('searchPattern');
    const difficultyPatternSelect = document.getElementById('difficultyPattern');
    const patternGrid = document.getElementById('patternGrid');
    const patternCards = document.querySelectorAll('.pattern-card');

    function filterCards(cards, searchInput, categorySelect) {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedCategory = categorySelect.value;

        cards.forEach(card => {
            const title = card.dataset.title ? card.dataset.title.toLowerCase() : '';
            const category = card.dataset.category || card.dataset.difficulty || 'all'; // Maneja categorías o dificultades

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex'; // O 'block' o 'grid-item' según tu CSS
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchTutorialInput && categoryTutorialSelect && tutorialGrid) {
        searchTutorialInput.addEventListener('input', () => filterCards(tutorialCards, searchTutorialInput, categoryTutorialSelect));
        categoryTutorialSelect.addEventListener('change', () => filterCards(tutorialCards, searchTutorialInput, categoryTutorialSelect));
        // Llama al filtro inicial para asegurar que todo se muestre correctamente al cargar
        filterCards(tutorialCards, searchTutorialInput, categoryTutorialSelect);
    }

    if (searchPatternInput && difficultyPatternSelect && patternGrid) {
        searchPatternInput.addEventListener('input', () => filterCards(patternCards, searchPatternInput, difficultyPatternSelect));
        difficultyPatternSelect.addEventListener('change', () => filterCards(patternCards, searchPatternInput, difficultyPatternSelect));
        // Llama al filtro inicial para asegurar que todo se muestre correctamente al cargar
        filterCards(patternCards, searchPatternInput, difficultyPatternSelect);
    }

    // =====================================
    // 🖼️ Galería y Lightbox
    // =====================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox .close-btn');

    if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxCaption && closeBtn) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (event) => {
                const imgSrc = item.querySelector('img').src;
                const imgAlt = item.querySelector('img').alt; // Usar alt para accesibilidad
                const captionText = item.querySelector('figcaption').textContent;

                lightboxImg.src = imgSrc;
                lightboxImg.alt = imgAlt;
                lightboxCaption.textContent = captionText;
                lightbox.classList.add('active'); // Usa una clase para controlar la visibilidad
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            lightboxImg.src = ''; // Limpiar la imagen para ahorrar memoria
            lightboxCaption.textContent = '';
        });

        // Cerrar lightbox haciendo clic fuera de la imagen
        lightbox.addEventListener('click', (event) => {
            if (event.target === lightbox) {
                lightbox.classList.remove('active');
                lightboxImg.src = '';
                lightboxCaption.textContent = '';
            }
        });

        // Cerrar lightbox con la tecla ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                lightboxImg.src = '';
                lightboxCaption.textContent = '';
            }
        });
    }

    // =====================================
    // ✉️ Validación de Formulario de Contacto
    // =====================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageTextarea = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formMessage = document.getElementById('formMessage');

    function validateForm() {
        let isValid = true;

        // Validar Nombre
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'El nombre es obligatorio.';
            nameInput.classList.add('invalid');
            isValid = false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('invalid');
        }

        // Validar Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'El email es obligatorio.';
            emailInput.classList.add('invalid');
            isValid = false;
        } else if (!emailPattern.test(emailInput.value.trim())) {
            emailError.textContent = 'Por favor, introduce un email válido.';
            emailInput.classList.add('invalid');
            isValid = false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
        }

        // Validar Mensaje
        if (messageTextarea.value.trim() === '') {
            messageError.textContent = 'El mensaje es obligatorio.';
            messageTextarea.classList.add('invalid');
            isValid = false;
        } else {
            messageError.textContent = '';
            messageTextarea.classList.remove('invalid');
        }

        return isValid;
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar el envío por defecto del formulario

            if (validateForm()) {
                // Simular envío exitoso
                formMessage.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                formMessage.style.display = 'block';

                // Limpiar formulario
                contactForm.reset();

                // Ocultar mensaje después de unos segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.textContent = '';
                }, 5000);

            } else {
                formMessage.textContent = 'Por favor, corrige los errores en el formulario.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
            }
        });

        // Limpiar mensajes de error al escribir
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim() !== '') {
                nameError.textContent = '';
                nameInput.classList.remove('invalid');
            }
        });
        emailInput.addEventListener('input', () => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() !== '' && emailPattern.test(emailInput.value.trim())) {
                emailError.textContent = '';
                emailInput.classList.remove('invalid');
            }
        });
        messageTextarea.addEventListener('input', () => {
            if (messageTextarea.value.trim() !== '') {
                messageError.textContent = '';
                messageTextarea.classList.remove('invalid');
            }
        });
    }
}); 