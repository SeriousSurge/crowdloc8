window.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('formContainer');
    const colorForm = document.getElementById('colorForm');
    const rgbInput = document.getElementById('rgbInput');
    const codeInput = document.getElementById('codeInput');
    const randomButton = document.getElementById('randomButton');
    const shareButton = document.getElementById('shareButton');

    const urlParams = new URLSearchParams(window.location.search);
    const rgbColorParam = urlParams.get('RGB');
    const codeParam = urlParams.get('code');

    if (rgbColorParam && codeParam) {
        updateBackgroundColor(rgbColorParam);
        updateCode(codeParam);
        hideForm();
        showShareButton();
    }

    colorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const rgbColor = rgbInput.value.trim();
        const codeValue = codeInput.value.trim();
        updateBackgroundColor(rgbColor);
        updateCode(codeValue);
        hideForm();
        showShareButton();
        updateURLParams(rgbColor, codeValue);
    });

    randomButton.addEventListener('click', () => {
        const randomRgbColor = generateRandomColor();
        const randomCode = generateRandomCode();
        rgbInput.value = randomRgbColor;
        codeInput.value = randomCode;
        updateBackgroundColor(randomRgbColor);
        updateCode(randomCode);
        hideForm();
        showShareButton();
        updateURLParams(randomRgbColor, randomCode);
    });

    shareButton.addEventListener('click', () => {
        const url = new URL(window.location.href);
        const rgbColor = urlParams.get('RGB');
        const code = urlParams.get('code');
        const shareUrl = `${url}`;
        copyToClipboard(shareUrl);
        alert('URL Copied to Clipboard!');
    });

    function updateBackgroundColor(rgbColor) {
        if (rgbColor) {
            document.body.style.backgroundColor = '#' + rgbColor;
            setTextColorContrast(rgbColor);
        } else {
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        }
    }

    function updateCode(code) {
        const codeElement = document.getElementById('codeElement');
        if (code) {
            if (codeElement) {
                codeElement.textContent = code;
            } else {
                const newCodeElement = document.createElement('div');
                newCodeElement.id = 'codeElement';
                newCodeElement.textContent = code;
                document.body.appendChild(newCodeElement);
            }
        } else {
            if (codeElement) {
                codeElement.remove();
            }
        }
    }

    function setTextColorContrast(backgroundColor) {
        const rgb = hexToRgb(backgroundColor);
        const brightness = calculateBrightness(rgb.r, rgb.g, rgb.b);

        if (brightness > 130) {
            document.body.style.color = 'black';
        } else {
            document.body.style.color = 'white';
        }
    }

    function hexToRgb(hex) {
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }4

    function calculateBrightness(r, g, b) {
        return Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114);
    }

    function generateRandomColor() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return randomColor.padStart(6, '0');
    }

    function generateRandomCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomCode = '';
        for (let i = 0; i < 2; i++) {
            randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomCode;
    }

    function hideForm() {
        formContainer.style.display = 'none';
    }

    function showShareButton() {
        codeContainer.style.display = 'block';
    }

    function updateURLParams(rgbColor, code) {
        const url = new URL(window.location.href);
        const searchParams = new URLSearchParams(url.search);
        searchParams.set('RGB', rgbColor);
        searchParams.set('code', code);
        url.search = searchParams.toString();
        window.history.pushState(null, null, url.toString());
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
});
