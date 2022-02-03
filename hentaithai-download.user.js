// ==UserScript==
// @name         hentaithai-download
// @version      0.1
// @description  insert download gallery button
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/hentaithai
// @downloadURL  https://github.com/penguin-jedi/hentaithai/raw/main/hentaithai-download.user.js
// @supportURL   https://github.com/penguin-jedi/hentaithai/issues
// @include      /^https?:\/\/(www\.)?hentaithai\.(com|net)\/forum\/index.php\?topic=/
// @include      /^https?:\/\/(www\.)?doujin-th(ai)?\.(com|net)\/forum\/index.php\?topic=/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js
// @grant        GM.xmlHttpRequest
// @run-at       document-end
// ==/UserScript==

$(document).ready(async () => {
  const silentAudioFile = new Audio ('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU3LjcxLjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAABVgANTU1NTU1Q0NDQ0NDUFBQUFBQXl5eXl5ea2tra2tra3l5eXl5eYaGhoaGhpSUlJSUlKGhoaGhoaGvr6+vr6+8vLy8vLzKysrKysrX19fX19fX5eXl5eXl8vLy8vLy////////AAAAAExhdmM1Ny44OQAAAAAAAAAAAAAAACQCgAAAAAAAAAVY82AhbwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+MYxAALACwAAP/AADwQKVE9YWDGPkQWpT66yk4+zIiYPoTUaT3tnU487uNhOvEmQDaCm1Yz1c6DPjbs6zdZVBk0pdGpMzxF/+MYxA8L0DU0AP+0ANkwmYaAMkOKDDjmYoMtwNMyDxMzDHE/MEsLow9AtDnBlQgDhTx+Eye0GgMHoCyDC8gUswJcMVMABBGj/+MYxBoK4DVpQP8iAtVmDk7LPgi8wvDzI4/MWAwK1T7rxOQwtsItMMQBazAowc4wZMC5MF4AeQAGDpruNuMEzyfjLBJhACU+/+MYxCkJ4DVcAP8MAO9J9THVg6oxRMGNMIqCCTAEwzwwBkINOPAs/iwjgBnMepYyId0PhWo+80PXMVsBFzD/AiwwfcKGMEJB/+MYxDwKKDVkAP8eAF8wMwIxMlpU/OaDPLpNKkEw4dRoBh6qP2FC8jCJQFcweQIPMHOBtTBoAVcwOoCNMYDI0u0Dd8ANTIsy/+MYxE4KUDVsAP8eAFBVpgVVPjdGeTEWQr0wdcDtMCeBgDBkgRgwFYB7Pv/zqx0yQQMCCgKNgonHKj6RRVkxM0GwML0AhDAN/+MYxF8KCDVwAP8MAIHZMDDA3DArAQo3K+TF5WOBDQw0lgcKQUJxhT5sxRcwQQI+EIPWMA7AVBoTABgTgzfBN+ajn3c0lZMe/+MYxHEJyDV0AP7MAA4eEwsqP/PDmzC/gNcwXUGaMBVBIwMEsmB6gaxhVuGkpoqMZMQjooTBwM0+S8FTMC0BcjBTgPwwOQDm/+MYxIQKKDV4AP8WADAzAKQwI4CGPhWOEwCFAiBAYQnQMT+uwXUeGzjBWQVkwTcENMBzA2zAGgFEJfSPkPSZzPXgqFy2h0xB/+MYxJYJCDV8AP7WAE0+7kK7MQrATDAvQRIwOADKMBuA9TAYQNM3AiOSPjGxowgHMKFGcBNMQU1FMy45OS41VVU/31eYM4sK/+MYxKwJaDV8AP7SAI4y1Yq0MmOIADGwBZwwlgIJMztCM0qU5TQPG/MSkn8yEROzCdAxECVMQU1FMy45OS41VTe7Ohk+Pqcx/+MYxMEJMDWAAP6MADVLDFUx+4J6Mq7NsjN2zXo8V5fjVJCXNOhwM0vTCDAxFpMYYQU+RlVMQU1FMy45OS41VVVVVVVVVVVV/+MYxNcJADWAAP7EAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxOsJwDWEAP7SAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPMLoDV8AP+eAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxPQL0DVcAP+0AFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
  silentAudioFile.loop = true;
  const httpGet = (url, headers = {}) => new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      method: 'GET',
      url,
      headers: {
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      responseType: 'arraybuffer',
      onloadend: resolve,
      onerror: reject,
      ontimeout: reject,
      timeout: 30 * 1000,
    });
  });
  const headers = {
    Host: 'hentaithai.com',
    referer: 'https://www.hentaithai.com',
    origin: 'https://www.hentaithai.com',
  };
  let downloadGallerying = null;
  const start = () => {
    downloadGallerying = true;
    silentAudioFile.play();
  };
  const stop = () => {
    downloadGallerying = false;
    silentAudioFile.pause();
  };
  const downloadGallery = async () => {
    start();
    const title = $('title').html();
    const imgSrcs = $('img[alt*="หน้า"]').get().map((element) => element.src);
    const imageContents = await Promise.all(imgSrcs.map((imgSrc) => httpGet(imgSrc, headers)));

    const zip = new JSZip();
    for (let i = 0; i < imageContents.length; i++) {
      const imageContent = imageContents[i];
      const fileName = imageContent.finalUrl.substring(imageContent.finalUrl.lastIndexOf('/') + 1);
      const prefix = `${i + 1}`.padStart(3, '0');
      zip.file(`${prefix}_${fileName}`, imageContent.response);
    };
    const zipContent = await zip.generateAsync({ type: 'arraybuffer' });
    const blob = new Blob([zipContent], {type: 'application/zip'});
    saveAs(blob, `${title}.zip`);
    stop();
  };

  $(document.body).prepend(`
    <div style="
      position: fixed;
      z-index: 100000;
      right: 20px;
      bottom: 20px;
    ">
      <button id="downloadGalleryButton">Download this gallery</button>
    </div>
  `);
  $("#downloadGalleryButton").click(downloadGallery);
});
