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
  const downloadGallery = async () => {
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
