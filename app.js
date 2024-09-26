let currentType = 'html'; // Por defecto, HTML
let codeMirror;

// Inicializar CodeMirror
function initCodeMirror() {
    codeMirror = CodeMirror.fromTextArea(document.getElementById('code'), {
        lineNumbers: true,
        mode: 'htmlmixed', // Modo para HTML, CSS y JavaScript
        theme: 'default',
        matchBrackets: true,
        autoCloseBrackets: true,
        lineWrapping: true,
    });
}

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

// Cambiar el tipo de código
function changeCodeType(type) {
    currentType = type;

    // Cargar el código correspondiente
    switch (type) {
        case 'html':
            codeMirror.setValue(localStorage.getItem('htmlCode') || '');
            codeMirror.setOption('mode', 'htmlmixed'); // Modo para HTML
            break;
        case 'css':
            codeMirror.setValue(localStorage.getItem('cssCode') || '');
            codeMirror.setOption('mode', 'css'); // Modo para CSS
            break;
        case 'js':
            codeMirror.setValue(localStorage.getItem('jsCode') || '');
            codeMirror.setOption('mode', 'javascript'); // Modo para JavaScript
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

// Guardar proyecto
document.getElementById('save-button').addEventListener('click', () => {
    const projectData = {
        htmlCode: localStorage.getItem('htmlCode') || '',
        cssCode: localStorage.getItem('cssCode') || '',
        jsCode: localStorage.getItem('jsCode') || ''
    };
    const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Cargar proyecto
document.getElementById('load-button').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = event => {
                const projectData = JSON.parse(event.target.result);
                localStorage.setItem('htmlCode', projectData.htmlCode);
                localStorage.setItem('cssCode', projectData.cssCode);
                localStorage.setItem('jsCode', projectData.jsCode);
                updatePreview();
                changeCodeType(currentType); // Actualizar vista del editor
            };
            reader.readAsText(file);
        }
    };
    input.click();
});

// Evento para cambiar el tipo de código al hacer clic en los botones
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        changeCodeType(tab.dataset.type);
    });
});

// Inicializar CodeMirror al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initCodeMirror();
    // Cargar el código desde localStorage al inicio
    changeCodeType(currentType);
});
