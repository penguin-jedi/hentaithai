// ==UserScript==
// @name         ZipAir crawler
// @description  insert download gallery button
// @author       penguin-jedi
// @match        *://*.skyscanner.net/*
// @match        *://*.skyscanner.co.th/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY2BgYAAAAAQAAVzN/2kAAAAASUVORK5CYII=
// @require      https://code.jquery.com/jquery-3.6.4.slim.min.js
// @require      https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js
// @require      https://momentjs.com/downloads/moment.min.js
// @require      https://momentjs.com/downloads/moment-timezone-with-data.min.js
// @grant        GM.xmlHttpRequest
// @run-at       document-end
// ==/UserScript==

const MONTH_RANGE = 10;
const $j = jQuery.noConflict();
$j(document).ready(async () => {
  const spinner = '<img src="data:image/gif;base64,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" />';
  let downloadGallerying = null;
  const start = () => {
    downloadGallerying = true;
    const originalHtml = $j(`#downloadGalleryButton`).html();
    $j(`#downloadGalleryButton`).attr("disabled", true).html(spinner);
    return originalHtml;
  };
  const finish = (originalHtml) => {
    downloadGallerying = false;
    $j(`#downloadGalleryButton`).removeAttr("disabled").html(originalHtml);
    $j(`#downloadGalleryButton`).css({ "background-color": "#23e320" });
  };
  const httpRequest = (method, url, headers = {}, data) => new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      method,
      url,
      data: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        ...headers,
      },
      responseType: 'arraybuffer',
      onloadend: resolve,
      onerror: reject,
      ontimeout: reject,
      timeout: 30 * 1000,
    });
  });
  const clawZipair = async (route, from, to, zone) => {
    // https://bff.zipair.net/v2/flights?adult=1&childA=0&childB=0&childC=0&infant=0&routes=BKK,NRT&currency=THB&language=th&departureDateFrom=2024-01-01&departureDateTo=2024-01-31
    // https://bff.zipair.net/v2/flights?adult=1&childA=0&childB=0&childC=0&infant=0&routes=BKK,NRT&currency=THB&language=th&departureDateFrom=2023-09-01&departureDateTo=2023-09-30
    const url = `https://bff.zipair.net/v2/flights?adult=1&childA=0&childB=0&childC=0&infant=0&routes=${route}&currency=THB&language=th&departureDateFrom=${from}&departureDateTo=${to}`;
    const res = await httpRequest('GET', url);
    if (res.status !== 200) return;
    const response = JSON.parse(res.responseText);
    /*
{
    "flights": [
        [
            {
                "origin": "BKK",
                "destination": "NRT",
                "logicalFlightId": 45291,
                "scheduledDepartureArrivalDateTime": {
                    "departureDate": "2023-09-03T16:10:00.000Z",
                    "arrivalDate": "2023-09-03T22:25:00.000Z"
                },
                "flightTime": 375,
                "flightNumber": "ZG052",
                "fares": [
                    {
                        "fareBasisCode": "X0ZFA0A",
                        "cabinCode": "ZIPFULLFLAT",
                        "availableSeat": 6,
                        "taxes": [
                            {
                                "id": 582,
                                "amount": "35"
                            },
                            {
                                "id": 585,
                                "amount": "700"
                            },
                            {
                                "id": 661,
                                "amount": "15"
                            }
                        ],
                        "passengerType": "adult",
                        "amount": "27000",
                        "zipPoint": 0
                    },
                    {
                        "fareBasisCode": "L0ZSA0A",
                        "cabinCode": "STANDARD",
                        "availableSeat": 19,
                        "taxes": [
                            {
                                "id": 582,
                                "amount": "35"
                            },
                            {
                                "id": 585,
                                "amount": "700"
                            },
                            {
                                "id": 661,
                                "amount": "15"
                            }
                        ],
                        "passengerType": "adult",
                        "amount": "9500",
                        "zipPoint": 0
                    }
                ]
            }
        ],
    */
    const flights = _.map(
      response.flights,
      (f) => {
        const minAmountSeat = _.minBy(
          _.get(f, [0, 'fares']),
          (f2) => _.toNumber(_.get(f2, ['amount']))
        );
        return {
          route: `${_.get(f, [0, 'origin'])}_${_.get(f, [0, 'destination'])}`,
          departureDate: _.get(f, [0, 'scheduledDepartureArrivalDateTime', 'departureDate']),
          total: _.ceil(_.toNumber(minAmountSeat.amount) + _.sumBy(minAmountSeat.taxes, (t) => _.toNumber(t.amount)), 2),
        };
      }
    );
    const minFlight = _.minBy(flights, (f) => f.total);
    const allMins = _.filter(flights, (f) => f.total == minFlight.total);
    // console.log('minFlight', minFlight);
    return `
      <div style="display:flex;flex-direction:column;margin-right:10px;">
        <div>${minFlight?.route}</div>
        <div>${minFlight?.total}</div>
        ${
          _.join(_.map(allMins, (f) => `<div>${f.departureDate && moment(f.departureDate).tz(zone).format("MMM DD, HH:mm")}</div>`), '')
        }
      </div>
    `;
  };
  const execZipair = async () => {
    $j("div#mmm-flight").empty();
    const originalHtml = start();
    const elementHTMLs = await Promise.all(_.flatten(_.map(_.range(1,MONTH_RANGE), (n) => [
      clawZipair("BKK,NRT", moment().add(n, 'month').startOf('month').format('YYYY-MM-DD'), moment().add(n, 'month').endOf('month').format('YYYY-MM-DD'), "Asia/Bangkok"),
      clawZipair("NRT,BKK", moment().add(n, 'month').startOf('month').format('YYYY-MM-DD'), moment().add(n, 'month').endOf('month').format('YYYY-MM-DD'), "Japan"),
    ])));
    $j("div#mmm-flight").append(_.map(elementHTMLs, (f) => $j(f)));
    finish(originalHtml);
  };

  const clawAirJapan = async () => {
    const url = `https://airjapan-api-ase1.ezycommerce.sabre.com/api/v1/Availability/SearchLowestFare`;
    const res = await httpRequest('POST', url, {
      'Access-Control-Allow-Origin': 'https://booking.flyairjapan.com',
      Host: 'airjapan-api-ase1.ezycommerce.sabre.com',
      Referer: 'https://booking.flyairjapan.com/',
      Origin: 'https://booking.flyairjapan.com',
      'Content-Type': 'application/json',
    }, {
      currency: 'THB',
      fareTypeCategories: null,
      isManageBooking: false,
      languageCode: 'en-us',
      passengers: [
        { code: 'ADT', count: 1 },
        { code: 'CHDA', count: 0 },
        { code: 'CHDB', count: 0 },
        { code: 'CHDC', count: 0 },
        { code: 'INS', count: 0 },
        { code: 'INF', count: 0 },
      ],
      routes: [
        { fromAirport: 'BKK', toAirport: 'NRT', departureDate: '2024-02-09', startDate: '2024-02-01', endDate: '2024-02-29' },
        { fromAirport: 'NRT', toAirport: 'BKK', departureDate: '2024-03-30', startDate: '2024-03-01', endDate: '2024-03-31' },
      ],
    });
    console.log(res.status, res);
    if (res.status !== 200) return;
    const response = JSON.parse(res.responseText);
    console.log('response', response);
  };
  const execAirJapan = async () => {
    $j("div#mmm-flight").empty();
    const originalHtml = start();
    const elementHTMLs = clawAirJapan();
    $j("div#mmm-flight").append(_.map(elementHTMLs, (f) => $j(f)));
    finish(originalHtml);
  };

  $j(document.body).prepend(`
    <div style="position:fixed;z-index:2147483647;right:20px;bottom:20px;background-color:#EF771E;padding:10px 0 10px 10px;">
      <div id="mmm-flight" style="display:flex;flex-direction:row;">
      </div>
      <div id="downloadGalleryButton" style="display:flex;justify-content:center;margin-right:10px;">
        <button id="zipair" style="width: 88px; height: 40px;">Crawl Zipair</button>
        <button id="airjapan" style="width: 88px; height: 40px;">Crawl AirJapan</button>
      </div>
    </div>
  `);
  $j("button#zipair").click(execZipair);
  $j("button#airjapan").click(execAirJapan);
});