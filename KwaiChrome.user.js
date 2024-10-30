// ==UserScript==
// @name         KwaiChrome
// @description  open chrome download setting
// @author       penguin-jedi
// @match        *://*.example.com/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @grant        GM.xmlHttpRequest
// @run-at       document-start
// ==/UserScript==

window.location.replace("chrome://settings/?search=download");
