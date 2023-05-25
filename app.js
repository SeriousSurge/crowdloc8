window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const backgroundColor = urlParams.get('RGB');
    const code = urlParams.get('code');

    if (backgroundColor) {
        document.body.style.backgroundColor = '#' + backgroundColor;
        setTextColorContrast(backgroundColor);
    }

    if (code) {
        const codeElement = document.createElement('div');
        codeElement.textContent = code;
        document.body.appendChild(codeElement);
    }
});

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
}

function calculateBrightness(r, g, b) {
    return Math.sqrt(r * r * 0.299 + g * g * 0.587 + b * b * 0.114);
}
