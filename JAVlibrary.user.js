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
// @run-at       document-end
// ==/UserScript==
$(document).ready(async () => {

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
