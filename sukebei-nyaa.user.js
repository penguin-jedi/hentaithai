// ==UserScript==
// @name         sukebei-nyaa
// @version      0.2
// @description  auto search clipboard
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/hentaithai
// @downloadURL  https://github.com/penguin-jedi/hentaithai/raw/release/bigo.user.js
// @updateURL    https://github.com/penguin-jedi/hentaithai/raw/release/bigo.user.js
// @supportURL   https://github.com/penguin-jedi/hentaithai/issues
// @match        https://*.nyaa.si/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.4.slim.min.js
// @run-at       document-end
// ==/UserScript==

$(document).ready(async () => {
  $("input.search-bar").on('focus', async (event) => {
    const permission = await navigator.permissions.query({ name: "clipboard-read" });
    if (permission.state === "denied") return;
    const clipboardContents = await navigator.clipboard.readText();
    if (event.target.value === clipboardContents) return;
    event.target.value = clipboardContents;
    event.target.form.submit();
  });
});
