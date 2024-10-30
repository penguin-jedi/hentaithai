// ==UserScript==
// @name         casino-ads-remove
// @version      0.1
// @description  ads remove
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/hentaithai
// @downloadURL  https://github.com/penguin-jedi/hentaithai/raw/release/casino-ads-remove.user.js
// @updateURL    https://github.com/penguin-jedi/hentaithai/raw/release/casino-ads-remove.user.js
// @supportURL   https://github.com/penguin-jedi/hentaithai/issues
// @match        *://*.manghaha.com/*
// @match        *://*.animeyuzu.com/*
// @match        *://*.thaimanga.net/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.4.slim.min.js
// ==/UserScript==

const $j = jQuery.noConflict();
$j(document).ready(async () => {
  $j('div.container-fluid.text-center.mb-3').remove();
  $j('div.module_home_x').remove();
  $j('div.ads, div.chdesc').remove();
});
