// ==UserScript==
// @name         transfernow-width
// @version      0.1
// @description  expand width content
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/hentaithai
// @downloadURL  https://github.com/penguin-jedi/hentaithai/raw/release/transfernow-width.user.js
// @updateURL    https://github.com/penguin-jedi/hentaithai/raw/release/transfernow-width.user.js
// @supportURL   https://github.com/penguin-jedi/hentaithai/issues
// @match        *://*.transfernow.net/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @run-at       document-end
// ==/UserScript==

$(document).ready(async () => {
  $(`<style>
    div.custo {
      width: 70%;
      max-width: none;
    }
    div.custo div div ul {
      max-height: none !important;
    }
  </style>`).appendTo("head");
});
