/// <reference path="../src/interfaces/interfaces.d.ts" />

let jsdom = require("jsdom");

// setup the simplest document possible
let doc = jsdom.jsdom(`
    <!doctype html>
    <html>
        <body>
            <div id="root"/><div>
        </body>
    </html>
`);

// get the window object out of the document
let win = doc.defaultView;

// set globals for mocha that make access to document and window feel 
// natural in the test environment
let g: any = global;
g.document = doc;
g.window = win;

// take all properties of the window object and also attach it to the 
// mocha global object
propagateToGlobal(win);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window: any) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) { continue; }
    if (key in global) { continue; }
    g[key] = window[key];
  }
}