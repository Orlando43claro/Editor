document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const editors = document.querySelectorAll('.editor');
    const runButton = document.getElementById('run');
    const previewSection = document.getElementById('preview');
    const iframe = previewSection.querySelector('iframe');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            editors.forEach(editor => {
                editor.classList.remove('active');
                if (editor.id === target) {
                    editor.classList.add('active');
                }
            });
        });
    });

    runButton.addEventListener('click', () => {
        const html = document.querySelector('#html-editor textarea').value;
        const css = document.querySelector('#css-editor textarea').value;
        const js = document.querySelector('#js-editor textarea').value;

        const content = `
            <style>${css}</style>
            ${html}
            <script>${js}<\/script>
        `;

        iframe.srcdoc = content;
        previewSection.classList.remove('hidden');
    });
});
