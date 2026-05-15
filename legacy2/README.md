[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/time-ticker)

<a href="https://nodei.co/npm/time-ticker/"><img src="https://nodei.co/npm/time-ticker.png"></a>

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/time-ticker@0.0.2/dist/time-ticker.iife.min.js?compression=gzip">

# time-ticker

time-ticker is a non-visible custom element that fires an event periodically.

![](https://media.giphy.com/media/Hlb53yZwhKobm/giphy.gif)

Uses this [library](https://gist.github.com/jakearchibald/cb03f15670817001b1157e62a076fe95), explained [here](https://youtu.be/MCi6AZMkxcU).

```html
<time-ticker loop repeat="10" duration="200"></time-ticker>
```

## [API Reference](https://cf-sw.bahrus.workers.dev/?href=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Ftime-ticker%400.0.19%2Fcustom-elements.json&stylesheet=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fwc-info%2Fsimple-ce-style.css&embedded=false&tags=&ts=2022-02-13T23%3A16%3A52.755Z&tocXSLT=https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fwc-info%2Ftoc.xsl)



## Example 1.  Based off [Text Scramble](https://codepen.io/soulwire/pen/mErPAK)

[Demo](https://jsfiddle.net/bahrus/w4527xk0/1/)

time-ticker uses JSON modules, which seem to be wending their way, ever so slowly, into Firefox and Safari.

In the meantime, use the polyfill to accommodate non chromium browsers:

```html
    <script type="esms-options">{ "polyfillEnable": ["json-modules"] }</script>
    <script async src="https://ga.jspm.io/npm:es-module-shims@1.4.6/dist/es-module-shims.js"></script>
```

