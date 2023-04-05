// ==UserScript==
// @name         mico
// @version      0.1
// @description  remove none-video components
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/hentaithai
// @downloadURL  https://github.com/penguin-jedi/hentaithai/raw/release/mico.user.js
// @updateURL    https://github.com/penguin-jedi/hentaithai/raw/release/mico.user.js
// @supportURL   https://github.com/penguin-jedi/hentaithai/issues
// @match        ://*.liveseries.net/*
// @match        ://*.micoworld.net/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.4.slim.min.js
// @run-at       document-end
// ==/UserScript==

$(document).ready(async () => {
  $("div.recommend-box").remove();
  $("div.fixed-info").remove();
  $("div.interactive-box").remove();
  $("div.top-info").remove();
  $("div.bubble-box").remove();
  $("div.prompt-alert").remove();
  $("div.layui-layer-shade").remove();
  $("div.layui-layer-move").remove();
  $("div.info-box").remove();
  $("div#videoMask").remove();
  $("div.prism-player").css("zIndex", 2147483647);
});
