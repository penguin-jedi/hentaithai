// ==UserScript==
// @name         JAVlibrary
// @version      0.2
// @description  click to copy ID, actress
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/hentaithai
// @downloadURL  https://github.com/penguin-jedi/hentaithai/raw/release/jav_library.user.js
// @updateURL    https://github.com/penguin-jedi/hentaithai/raw/release/jav_library.user.js
// @supportURL   https://github.com/penguin-jedi/hentaithai/issues
// @match        https://*.javlibrary.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.4.slim.min.js
// @run-at       document-end
// ==/UserScript==

$(document).ready(async () => {
  const copyInnerTextToClipboard = (event) => {
    // console.log('event', event);
    const value = event.target.innerText;
    // console.log('click', value);
    navigator.clipboard.writeText(value);
  };
  const copyTitleIdToClipboard = copyInnerTextToClipboard;
  const copyActressNameClipboard = (event) => {
    $("span.icn_favstar").off('click');
    const value = event.target.previousElementSibling.firstChild.innerText;
    navigator.clipboard.writeText(value);
  };
  // $("span.icn_favstar").on('click.mynamespace2', copyActressNameClipboard);

  $("div#video_id > table > tbody > tr > td.text").on('click.mynamespace1', copyTitleIdToClipboard);

  const actresses = $("span.star").map((_index, element) => element.innerText).get();
  const $actresses = actresses.map((actress) => $(`<td class="text"><span class="cast">${actress}</span></td>`).click(copyTitleIdToClipboard));
  const $actressesRow = $(`
  <div class="item">
    <table>
      <tbody>
        <tr>
          <td class="header">Copy:</td>
          <!-- $actresses goes here -->
        </tr>
      </tbody>
    </table>
  </div>`).find('tr').append($actresses);
  $("div#video_info").append($actressesRow);
});
