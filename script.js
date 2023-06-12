// script.js

function getRandomColor() {
  const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16);
  const colorData = ntc.name(randomHex);
  return { name: colorData[1], code: colorData[0] };
}

function setRandomColor() {
  const randomColor = getRandomColor();

  document.getElementById('colorBackground').style.backgroundColor = randomColor.code;
  document.getElementById('colorName1').textContent = randomColor.name;
  document.getElementById('colorName2').textContent = randomColor.code; // Display the hex value here

  const textColor = getTextColor(randomColor.code);
  document.getElementById('colorName1').style.color = textColor;
  document.getElementById('colorName2').style.color = textColor;
}


function getTextColor(backgroundColor) {
  const luminance = calculateLuminance(backgroundColor);
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

function calculateLuminance(color) {
  const rgb = chroma(color).rgb();
  const [r, g, b] = rgb.map(val => val / 255);
  const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
  return luminance;
}

window.addEventListener('load', setRandomColor);

// screenshot code
document.addEventListener('keydown', function(event) {
  // Check if Ctrl+S is pressed
  if (event.ctrlKey && event.key === 's') {
    // Prevent the default browser save dialog
    event.preventDefault();

    // Call the function to capture and save the screenshot
    captureScreenshot();
  }
});

function captureScreenshot() {
  // Set the desired scale value for better resolution
  var scale = 8;

  // Capture the screenshot using html2canvas with the specified scale
  html2canvas(document.body, {
    scale: scale
  }).then(function(canvas) {
    // Create a temporary link element
    var link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'screenshot.png';

    // Programmatically trigger a click event on the link to download the screenshot
    link.click();
  });
}

