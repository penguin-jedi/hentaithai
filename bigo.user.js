// ==UserScript==
// @name         bigo
// @version      0.1
// @description  remove none-video components
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/hentaithai
// @downloadURL  https://github.com/penguin-jedi/hentaithai/raw/release/bigo.user.js
// @updateURL    https://github.com/penguin-jedi/hentaithai/raw/release/bigo.user.js
// @supportURL   https://github.com/penguin-jedi/hentaithai/issues
// @match        ://*.bigo.tv/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.4.slim.min.js
// @run-at       document-end
// ==/UserScript==

$(document).ready(async () => {
  setTimeout(() => {
    $("canvas.bigo_danmu").remove();
    $("div.FixTool-Component").remove();
    $("div.water-marker").remove();
    $("div.gift_animation_box").remove();
    $("div.room-container__right").remove();
    $("header.PageHead-Component").remove();
    $("div.room-host-about").remove();
    $("div.room-recommend-live").remove();
    $("div.page-wrapper").css("padding-top", "unset");
    $("html.default-layout-html-style").css("min-width", "unset");
    $("html.default-layout-html-style").css("overflow-x", "unset");
    $("html.default-layout-html-style").css("height", "100%");
    $("body.default-layout-body-style").css("height", "100%");
    $("body.default-layout-body-style").css("min-width", "unset");
    $("div#bigolive").css("height", "100%");
    $("div#__layout").css("height", "100%");
    $("div.def-container").css("height", "100%");
    $("div.def-container").css("min-width", "unset");
    $("div.page-wrapper").css("height", "100%");
    $("div.page-wrapper > div").css("height", "100%");
    $("div.room").css("height", "100%");
    $("div.room").css("margin", "unset");
    $("div.room").css("max-width", "unset");
    $("div.room-container").css("height", "100%");
    $("div.room-container__left").css("width", "100%");
    $("div.room-container__left").css("height", "100%");
    $("div.room-video").css("margin-top", "unset");
    $("div.room-video").css("height", "100%");
    $("div.player").css("border-radius", "unset");
    $("div.player").css("width", "100%");
    $("div.player").css("height", "100%");
  }, 1200);
});
