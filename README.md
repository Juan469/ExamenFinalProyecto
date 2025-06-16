# MUNDO-CROCHET
Una plataforma inspiradora para amantes de las manualidades, donde podrás descubrir tutoriales, patrones descargables, explorar una galería de proyectos terminados y conectar con una comunidad creativa.

## 🚀 Características

* **Tutoriales Interactivos:** Guías paso a paso para una variedad de manualidades, con opciones para expandir contenido y ver videos incrustados.
* **Patrones Descargables:** Acceso a patrones gratuitos para costura, punto de cruz, amigurumi y más.
* **Galería Inspiradora:** Una colección visual de proyectos terminados, con una funcionalidad de lightbox para ver imágenes en detalle.
* **Filtros y Búsqueda:** Funcionalidad para buscar y filtrar tutoriales/patrones por categoría y dificultad.
* **Formulario de Contacto:** Un formulario sencillo para que los usuarios puedan enviar preguntas o comentarios.
* **Diseño Responsivo:** Adaptado para una experiencia óptima en dispositivos móviles, tablets y escritorios.
* **Estilos Armoniosos:** Una paleta de colores cuidadosamente seleccionada para una estética agradable y coherente.
* **Iconografía Clara:** Uso de Font Awesome para iconos significativos y un logo personalizado en el header.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica del contenido.
* **CSS3:** Estilos y diseño responsivo, incluyendo Flexbox y Grid.
    * Variables CSS para una gestión de colores eficiente.
    * Media Queries para adaptabilidad a diferentes tamaños de pantalla.
* **JavaScript (ES6+):**
    * Funcionalidad de menú de navegación móvil (hamburguesa).
    * Gestión dinámica del `padding-top` del `main` para evitar que el header fijo/sticky corte el contenido.
    * Toggle para expandir/colapsar el contenido detallado de tutoriales y patrones.
    * Funcionalidad de búsqueda y filtrado dinámico.
    * Sistema de Lightbox para la galería de imágenes.
    * Validación básica de formulario de contacto.
* **Font Awesome:** Biblioteca de iconos vectoriales para elementos visuales.
* **Landbot:** Plataforma para la creación de chatbots conversacionales, utilizada para mejorar la interacción con el usuario (ej. soporte, FAQs).

## 📦 Estructura del Proyecto
/MUNDO.CROCHET
│
├── index.html             # Página principal
├── /css
│   └── styles.css         # Estilos personalizados
├── /js
│   └── script.js          # Lógica JS básica (interacción, validación)
├── /assets
│   ├── /img               # Imágenes del producto/marca
│   └── /fonts             # (Opcional) Tipografías externas
├── README.md              # Descripción del proyecto (para GitHub)
└── .gitignore             # (Opcional) Ignorar archivos innecesarios




## ⚙️ Configuración y Ejecución

Este es un proyecto puramente frontend. No requiere de un servidor backend o configuraciones complejas.

1.  **Clonar el repositorio (si estás usando Git):**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd manualidades-fantasticas
    ```
2.  **Descargar los archivos:** Si no usas Git, simplemente descarga el archivo ZIP del repositorio y descomprímelo.
3.  **Abrir en el navegador:** Abre el archivo `index.html` directamente en tu navegador web preferido.

    ```bash
    # Ejemplo para abrir en VS Code (si tienes la extensión "Live Server")
    # Clic derecho en index.html -> Open with Live Server
    ```

## 📝 Uso

Navega a través de las secciones utilizando la barra de navegación.

* **Tutoriales y Patrones:** Utiliza los campos de búsqueda y los selectores de categoría/dificultad para filtrar el contenido. Haz clic en "Ver Más" para expandir los detalles.
* **Galería:** Haz clic en cualquier imagen para abrirla en una vista de Lightbox ampliada.
* **Contacto:** Rellena el formulario para enviar un mensaje.

## 🤝 Contribuciones

Si deseas contribuir a este proyecto, por favor, sigue estos pasos:

1.  Haz un "fork" de este repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nombre-de-tu-caracteristica`).
3.  Realiza tus cambios y commitea (`git commit -m 'feat: Añade nueva característica'`).
4.  Push a tu rama (`git push origin feature/nombre-de-tu-caracteristica`).
5.  Abre un Pull Request.


## 🚀 Cómo Empezar (Uso Local)

Para explorar "El Mundo de los Amigurumis" en tu máquina local, sigue estos sencillos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/tu-usuario/el-mundo-de-los-amigurumis.git](https://github.com/tu-usuario/el-mundo-de-los-amigurumis.git)
    ```
    *(Asegúrate de reemplazar `tu-usuario` por tu nombre de usuario de GitHub real si ya lo tienes en tu cuenta)*.
2.  **Navega al directorio del proyecto:**
    ```bash
    cd el-mundo-de-los-amigurumis
    ```
3.  **Asegúrate de tener la carpeta `images` y todos los archivos de imagen** mencionados en el código HTML dentro de ella, al mismo nivel que `index.html`.
4.  **Abre el archivo `index.html`** en tu navegador web preferido.

¡Listo! Ya puedes explorar "El Mundo de los Amigurumis" y empezar a tejer tus propias creaciones.



