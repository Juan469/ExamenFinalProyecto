document.addEventListener('DOMContentLoaded', () => {

    // 1. Funcionalidad para mostrar/ocultar tutoriales y patrones con scroll suave y animación
    const showContentButtons = document.querySelectorAll('.show-content-btn');

    showContentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const contentId = button.dataset.id;
            const fullContentDiv = document.getElementById(contentId);
            const parentCard = button.closest('.tutorial-card, .pattern-card'); // Obtener la tarjeta padre

            if (fullContentDiv) {
                fullContentDiv.classList.toggle('visible'); // Controla max-height para animación CSS

                if (fullContentDiv.classList.contains('visible')) {
                    button.textContent = 'Ocultar';
                    fullContentDiv.classList.remove('hidden'); // Asegurarse de que no tenga hidden

                    // Desplazarse suavemente hacia la tarjeta si el contenido se expande y no es completamente visible
                    if (parentCard) {
                        const cardRect = parentCard.getBoundingClientRect();
                        // Solo desplazar si la parte inferior de la tarjeta está fuera de la vista
                        if (cardRect.bottom > window.innerHeight || cardRect.top < 0) {
                             parentCard.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                        }
                    }
                } else {
                    button.textContent = `Ver ${button.dataset.type === 'tutorial' ? 'Tutorial' : 'Patrón'}`;
                    // Opcional: para asegurar que se oculte por completo después de la transición
                    // fullContentDiv.addEventListener('transitionend', () => {
                    //     if (!fullContentDiv.classList.contains('visible')) {
                    //         fullContentDiv.classList.add('hidden');
                    //     }
                    // }, { once: true });
                }
            }
        });
    });

    // 2. Galería interactiva (Lightbox)
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const captionText = document.querySelector('.caption');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxContent.src = item.src;
            captionText.textContent = item.alt;
            document.body.style.overflow = 'hidden'; // Evita scroll en el fondo
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restaura el scroll
    });

    // Cerrar lightbox haciendo clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Cerrar lightbox con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 3. Navegación responsiva (menú hamburguesa)
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        navToggle.classList.toggle('open'); // Para animar la hamburguesa
    });

    // Ocultar el menú cuando se hace clic en un enlace (en móvil)
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                navToggle.classList.remove('open');
            }
        });
    });

    // 4. Funcionalidad de Búsqueda y Filtro (Tutoriales y Patrones)
    function filterItems(itemsSelector, searchInputId, difficultySelectId) {
        const items = document.querySelectorAll(itemsSelector);
        const searchInput = document.getElementById(searchInputId);
        const difficultySelect = document.getElementById(difficultySelectId);

        const applyFilters = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedDifficulty = difficultySelect.value;

            items.forEach(item => {
                const title = item.querySelector('h3').textContent.toLowerCase();
                const description = item.querySelector('p').textContent.toLowerCase();
                const keywords = item.dataset.keywords ? item.dataset.keywords.toLowerCase() : ''; // Obtener las palabras clave del data attribute

                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm) || keywords.includes(searchTerm);
                const itemDifficulty = item.dataset.difficulty;
                const matchesDifficulty = selectedDifficulty === 'all' || itemDifficulty === selectedDifficulty;

                if (matchesSearch && matchesDifficulty) {
                    item.style.display = 'flex'; // Mostrar la tarjeta
                    item.style.animation = 'fadeIn 0.5s ease-out forwards'; // Aplicar animación al mostrar
                    item.style.opacity = 1;
                } else {
                    item.style.display = 'none'; // Ocultar la tarjeta
                    item.style.opacity = 0; // Asegurarse de que esté oculta para la animación
                }
            });
        };

        // Event Listeners para activar el filtro
        searchInput.addEventListener('input', applyFilters); // Dispara en cada entrada de teclado
        difficultySelect.addEventListener('change', applyFilters); // Dispara cuando cambia la selección

        // Aplicar filtros al cargar la página para asegurar la visibilidad inicial correcta
        applyFilters();
    }

    filterItems('.tutorial-card', 'tutorialSearch', 'tutorialDifficulty');
    filterItems('.pattern-card', 'patternSearch', 'patternDifficulty');


    // 5. Botones de Compartir en Redes Sociales
    const shareButtons = document.querySelectorAll('.share-buttons a');

    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace se abra directamente

            // Asegurarse de obtener el título de la tarjeta expandida
            const cardTitleElement = e.target.closest('.full-content').querySelector('h3');
            const cardTitle = cardTitleElement ? cardTitleElement.textContent : 'Un increíble proyecto de amigurumi!'; // Fallback
            const pageUrl = window.location.href; // URL actual de la página

            let shareUrl = '';

            if (button.classList.contains('share-facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(`Mira este tutorial/patrón de amigurumi: ${cardTitle}`)}`;
            } else if (button.classList.contains('share-twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Mira este tutorial/patrón de amigurumi: ${cardTitle}`)}&url=${encodeURIComponent(pageUrl)}`;
            } else if (button.classList.contains('share-whatsapp')) {
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`Mira este tutorial/patrón de amigurumi: ${cardTitle} ${pageUrl}`)}`;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400'); // Abrir en una nueva ventana/pestaña
            }
        });
    });

    // 6. Manejar el envío del formulario de contacto (ejemplo básico)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el envío por defecto del formulario

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Aquí podrías enviar los datos a un servidor (por ejemplo, con Fetch API o XMLHttpRequest)
            alert(`Mensaje enviado!\nNombre: ${name}\nEmail: ${email}\nMensaje: ${message}\n\n(En un sitio real, esto se enviaría a un backend.)`);

            // Limpiar el formulario
            contactForm.reset();
        });
    }

    // Animación de elementos al hacer scroll (para las secciones)
    const animateOnScroll = () => {
        // Seleccionar elementos que queremos animar al hacer scroll
        const elementsToAnimate = document.querySelectorAll(
            '.about-section h2, .about-section p, ' +
            '.contact-section h2, .contact-section p, .contact-form, ' +
            '.tutorial-card, .pattern-card, .gallery-item, ' +
            '.controls-container input, .controls-container select' // Añadidos inputs y selects
        );

        elementsToAnimate.forEach(el => {
            const rect = el.getBoundingClientRect();
            // Si el elemento está en la vista (o casi)
            if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
                // Aplicar animaciones específicas si no están ya visibles y no están ocultas por el filtro
                if (el.style.opacity === '0' || el.style.animationName === 'none') {
                    if (el.classList.contains('tutorial-card') || el.classList.contains('pattern-card') || el.classList.contains('gallery-item')) {
                        if (el.style.display !== 'none') { // Solo animar si no está oculto por el filtro
                            el.style.animation = `fadeIn 0.8s ease-out forwards`;
                            el.style.opacity = 1;
                        }
                    } else if (el.closest('.about-section') || el.closest('.contact-section')) {
                        if (el.tagName === 'H2') {
                            el.style.animation = 'slideInUp 0.8s ease-out forwards';
                            el.style.opacity = 1;
                        } else if (el.tagName === 'P') {
                            el.style.animation = 'fadeIn 0.8s ease-out 0.3s forwards';
                            el.style.opacity = 1;
                        } else if (el.classList.contains('contact-form')) {
                            el.style.animation = 'zoomIn 0.8s ease-out 0.5s forwards';
                            el.style.opacity = 1;
                        }
                    } else if (el.closest('.controls-container')) { // Para los inputs y selects
                        el.style.animation = 'fadeIn 0.8s ease-out forwards';
                        el.style.opacity = 1;
                    }
                }
            } else {
                // Reiniciar el estado para que se animen de nuevo al hacer scroll hacia ellos
                // No resetear elementos que están expandidos (full-content)
                if (!el.classList.contains('full-content') && el.closest('.full-content') === null) {
                    el.style.animation = 'none';
                    el.style.opacity = 0;
                }
            }
        });
    };

    // Añadir el listener para la animación al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    // Ejecutarlo una vez al cargar la página para los elementos visibles inicialmente
    animateOnScroll();

    // Animación para elementos del nav (con retraso)
    const navItems = document.querySelectorAll('.main-nav .nav-list li');
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', `${index * 0.1}s`); // Define la variable CSS --i
    });

});