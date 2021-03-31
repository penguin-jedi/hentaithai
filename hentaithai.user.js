// ==UserScript==
// @name         hentaithai
// @version      0.1
// @description  push www to all anchor to breach stupid block
// @author       penguin-jedi
// @homepage     https://github.com/penguin-jedi/www-everywhere
// @downloadURL  https://github.com/penguin-jedi/www-everywhere/raw/main/hentaithai.user.js
// @supportURL   https://github.com/penguin-jedi/www-everywhere/issues
// @include      /^https?:\/\/(www\.)?hentaithai\.(com|net)/
// @include      /^https?:\/\/(www\.)?doujin-th(ai)?\.(com|net)/
// @include      /^https?:\/\/cse\.google\.com\/cse.*cx=(003772632849311655372:vrxjurxumkq|bc72584f2ccd6c0fd|37fa68f814191feba|003772632849311655372:-igy6k3yaqk|003772632849311655372:ciizy3icl-8).*/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        none
// ==/UserScript==

$(document).ready(async () => {
  let hostname = location.hostname.replace(/^www\./, '');
  if (hostname === "cse.google.com") {
    const searchParams = new URLSearchParams(location.search);
    const cx = searchParams.get("cx");
    if (cx === "003772632849311655372:vrxjurxumkq") hostname = "hentaithai.com";
    else if (cx === "bc72584f2ccd6c0fd") hostname = "hentaithai.net";
    else if (cx === "37fa68f814191feba") hostname = "doujin-th.net";
    else if (cx === "003772632849311655372:-igy6k3yaqk") hostname = "doujin-th.com";
    else if (cx === "003772632849311655372:ciizy3icl-8") hostname = "doujin-thai.com";
    else return;
  }

  const insertWWW = () => {
    $(`a[href*="${hostname}"]`).each((_index, element) => {
      element.href = element.href.replace(/^(http|https)?:\/\//, "$1://www.");
      if($(element).attr("data-cturl")) {
        $(element).removeAttr("dir data-cturl data-ctorig");
      }
    });
    $(`option[value*="${hostname}"]`).each((_index, element) => {
      element.value = element.value.replace(/\/\/(.*)\//, "https://www.$1/");
    });
    $(`button[onclick*="${hostname}"]`).each((_index, element) => {
      const href = $(element).attr("onclick");
      $(element).attr("onclick", href.replace(/\/\/(.*)\//, "https://www.$1/"));
    });
  };

  for(let i = 0; i > 100 || $(`a[href*="${hostname}"]`).length === 0; i++) {
    await new Promise(resolve => setTimeout(resolve, 162));
  }
  insertWWW();
});
