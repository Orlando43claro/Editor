document.addEventListener("DOMContentLoaded", () => {
    const htmlTab = document.getElementById('html-tab');
    const cssTab = document.getElementById('css-tab');
    const jsTab = document.getElementById('js-tab');
    
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const jsEditor = document.getElementById('js-editor');
    
    const previewBtn = document.getElementById('preview-btn');
    const previewFrame = document.getElementById('preview-frame');
    
    function switchTab(tab, editor) {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.editor').forEach(e => e.classList.remove('active'));
        tab.classList.add('active');
        editor.classList.add('active');
    }

    htmlTab.addEventListener('click', () => switchTab(htmlTab, htmlEditor));
    cssTab.addEventListener('click', () => switchTab(cssTab, cssEditor));
    jsTab.addEventListener('click', () => switchTab(jsTab, jsEditor));

    previewBtn.addEventListener('click', () => {
        const htmlCode = document.getElementById('html-code').value;
        const cssCode = `<style>${document.getElementById('css-code').value}</style>`;
        const jsCode = `<script>${document.getElementById('js-code').value}<\/script>`;
        const previewContent = htmlCode + cssCode + jsCode;
        
        previewFrame.srcdoc = previewContent;
        previewFrame.classList.remove('hidden');
    });
});
