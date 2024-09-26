// Variables para manejar el tipo de código
let currentType = 'html'; // Por defecto, HTML

// Función para actualizar la vista previa en tiempo real
function updatePreview() {
    const htmlCode = localStorage.getItem('htmlCode') || '';
    const cssCode = localStorage.getItem('cssCode') || '';
    const jsCode = localStorage.getItem('jsCode') || '';

    const iframe = document.getElementById('preview');
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`
        <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
            </body>
        </html>
    `);
    doc.close();
}

// Función para cambiar el tipo de código
function changeCodeType(type) {
    currentType = type;
    const codeArea = document.getElementById('code');
    
    // Cargar el código correspondiente
    switch (type) {
        case 'html':
            codeArea.value = localStorage.getItem('htmlCode') || '';
            break;
        case 'css':
            codeArea.value = localStorage.getItem('cssCode') || '';
            break;
        case 'js':
            codeArea.value = localStorage.getItem('jsCode') || '';
            break;
    }
    
    // Resaltar el botón activo
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.type === type) {
            tab.classList.add('active');
        }
    });
}

// Manejar el evento de cambio de tema
document.getElementById('theme-selector').addEventListener('change', (event) => {
    document.body.className = event.target.value === 'dark' ? 'dark' : '';
    updatePreview(); // Actualizar vista previa al cambiar de tema
});

// Descargar archivos
document.getElementById('download-button').addEventListener('click', () => {
    const htmlCode = localStorage.getItem('htmlCode') || '';
    const cssCode = localStorage.getItem('cssCode') || '';
    const jsCode = localStorage.getItem('jsCode') || '';

    const files = [
        { name: 'index.html', content: htmlCode },
        { name: 'styles.css', content: cssCode },
        { name: 'script.js', content: jsCode },
    ];

    files.forEach(file => {
        const blob = new Blob([file.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});

// Almacenar el código y actualizar vista previa
document.getElementById('code').addEventListener('input', (event) => {
    switch (currentType) {
        case 'html':
            localStorage.setItem('htmlCode', event.target.value);
            break;
        case 'css':
            localStorage.setItem('cssCode', event.target.value);
            break;
        case 'js':
            localStorage.setItem('jsCode', event.target.value);
            break;
    }
    updatePreview();
});

// Asignar el evento de clic a los botones
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => changeCodeType(tab.dataset.type));
});

// Inicializa el editor y vista previa
changeCodeType(currentType);
updatePreview();