// ==UserScript==
// @name         JAVlibrary
// @version      0.3
// @description  click to copy ID, actress
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/hentaithai
// @downloadURL  https://github.com/penguin-jedi/hentaithai/raw/release/jav_library.user.js
// @updateURL    https://github.com/penguin-jedi/hentaithai/raw/release/jav_library.user.js
// @supportURL   https://github.com/penguin-jedi/hentaithai/issues
// @match        *://*.javlibrary.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.4.slim.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.js
// @grant        GM.xmlHttpRequest
// @grant        GM.addStyle
// @run-at       document-end
// ==/UserScript==
$(document).ready(async () => {
    GM.xmlHttpRequest({
      method: 'GET',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.11.6/viewer.min.css',
      responseType: 'arraybuffer',
      onloadend: ({ responseText }) => {
        GM.addStyle(responseText);
      },
      onerror: () => null,
      ontimeout: () => null,
      timeout: 30 * 1000,
    });
  $("body").append($(`<div id="previewthumbs2" style="display: none;"></div>`));
  let $hrefs = $("div.previewthumbs > a").get().map((e) => `<img src="${e.href}" />`);
  if ($hrefs.length <= 1) {
    const urls = $("img.CodeIMG").parent().get().map((e) => `${`${e.href}`.split('?url=')[1]}`.split('&ver=')[0]).filter((url) => url.includes('dmm.co.jp')).map(decodeURIComponent);
    $hrefs = urls.map((src) => $(`<img src="${src}" />`));
  }
  $("div#previewthumbs2").append($hrefs);
  const viewer = new Viewer(document.getElementById('previewthumbs2'));
  $("div.previewthumbs > a").click((event) => {
    event.preventDefault();
    viewer.show();
  });
  $("div.socialmedia").after($(`<button>show</button>`).click(() => viewer.show()));

  const videoId = $("div#video_id > table > tbody > tr > td.text")[0]?.innerText;
  const regex = /^.*[a-zA-Z]{1}[a-zA-Z0-9]{2,}-[0-9]{3,}/;
  $("input#idsearchbox").on('focus', async (event) => {
    const permission = await navigator.permissions.query({ name: "clipboard-read" });
    if (permission.state === "denied") return;
    const clipboardContents = await navigator.clipboard.readText();
    if (videoId === clipboardContents) return;
    if (event.target.value === clipboardContents) return;
    if (!regex.test(clipboardContents)) return;
    event.target.value = clipboardContents;
    event.target.form.submit();
  });

  const copyInnerTextToClipboard = (event) => {
    const value = event.target.innerText;
    navigator.clipboard.writeText(value);
  };
  const copyTitleIdToClipboard = copyInnerTextToClipboard;
  const copyActressNameClipboard = (event) => {
    $("span.icn_favstar").off('click');
    const actressName = event.target.previousElementSibling.firstChild.innerText;
    navigator.clipboard.writeText(actressName);
  };

  $("a[rel='bookmark']").on("click", (e) => e.preventDefault());
  $("div#video_id > table > tbody > tr > td.text").on('click.mynamespace1', copyTitleIdToClipboard);

  const genres = $("span.genre").map((_index, element) => element.innerText).get();
  const $genres = genres.map((genres) => $(`<td class="text"><span class="genre">${genres}</span></td>`).click(copyTitleIdToClipboard));
  const $genresRow = $(`
  <div class="item">
    <table>
      <tbody>
        <tr>
          <td class="header">Copy:</td>
          <!-- $genres goes here -->
        </tr>
      </tbody>
    </table>
  </div>`).find('tr').append($genres);
  $("div#video_genres").after($genresRow);
  const actresses = $("span.star").map((_index, element) => element.innerText).get();
  const $actresses = actresses.map((actress) => $(`<td class="text"><span class="star"><span class="cast">${actress}</span></span></td>`).click(copyTitleIdToClipboard));
  const $actressesRow = $(`
  <div id="JAVlibrary_injected_2" class="item">
    <table>
      <tbody>
        <tr>
          <td class="header">Copy:</td>
          <!-- $actresses goes here -->
        </tr>
      </tbody>
    </table>
  </div>`).find('tr').append($actresses);
  $("div#video_cast").after($actressesRow);
  $("div.boxtitle").click((event) => {
    let genreName = event.target.innerText.split("Videos related to ")[1];
    if (genreName) return navigator.clipboard.writeText(genreName);
    let actressName = event.target.innerText.split("Videos starring ")[1];
    if (!actressName) actressName = event.target.innerText.split("のビデオ")[0];
    navigator.clipboard.writeText(actressName);
  });
});
