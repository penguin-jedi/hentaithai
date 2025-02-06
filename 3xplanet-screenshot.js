// ==UserScript==
// @name         3xplanet screenshot
// @version      0.1
// @description  enlarge screenshot
// @author       penguin-jedi
// @match        *://*.3xplanet.net/*
// @exclude      *://*.3xplanet.net/*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.4.slim.min.js
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlHttpRequest
// @run-at       document-end
// ==/UserScript==

if (typeof GM_xmlHttpRequest === 'undefined') var GM_xmlHttpRequest = GM.xmlHttpRequest;
if (typeof GM_addStyle === 'undefined') var GM_addStyle = GM.xmlHttpRequest;
const $j = jQuery.noConflict();
const DOWNLOAD_TIMEOUT_MILLISECOND = 10000;

  const httpGet = (url, headers) => new Promise((resolve, reject) => {
    const nhentaiCookie = localStorage.getItem('nhentaiCookie');
    GM_xmlHttpRequest({
      method: 'GET',
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Cookie': nhentaiCookie,
        ...headers,
      },
      responseType: 'arraybuffer',
      onloadend: (responseObject) => {
        if (responseObject.status === 200 && !responseObject.responseText) {
          const decoder = new TextDecoder();
          responseObject.responseText = decoder.decode(responseObject.response);
        }
        resolve(responseObject);
      },
      onerror: reject,
      ontimeout: reject,
      timeout: DOWNLOAD_TIMEOUT_MILLISECOND,
      withCredentials: true,
    });
  });

$j(document).ready(async () => {
  $j('div.vc_column_inner').remove();
  $j('div.td-container.td-post-template-default').attr("style", "width:unset")

  const url = $j("div.td-post-content.tagdiv-type > p:nth-of-type(2) > a").get().map((element) => element.href)[0];
  const res = await httpGet(url);
  if (res.status !== 200) throw new Error(`res status [${res.status}]`);
  const string1 = res.responseText.split('view-content');
  const string2 = string1[1].split('src="');
  const string3 = string2[1].split('"');
  const screenshotUrl = string3[0];
  console.info('screenshotUrl', screenshotUrl);
  $j("div.td-post-content.tagdiv-type > p:nth-of-type(2)").append(`
    <img decoding="async" src="${screenshotUrl}" class="td-animation-stack-type0-2">
  `);
});
