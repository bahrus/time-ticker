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

## Example 1.  Based off [Text Scramble](https://codepen.io/soulwire/pen/mErPAK)

[Demo](https://jsfiddle.net/bahrus/w4527xk0/1/)

<!--
```
<custom-element-demo>
  <template>
  <div class=body>
    <on-to-me on=text-setting-complete to=[-enabled] val=target.text></on-to-me>
    <time-ticker disabled loop -enabled duration=4000>
        <script nomodule=ish>
            selfish.parentElement.items = [
                'Neo,',
                'sooner or later',
                'you\'re going to realize',
                'just as I did',
                'that there\'s a difference',
                'between knowing the path',
                'and walking the path'
            ]
        </script>
    </time-ticker>
    <on-to-me on=tick to=[-text] me=1 val=target.value.item></on-to-me>
    <co-depends-text-scramble -text class="text"></co-depends-text-scramble>
    <style>
        @import 'https://fonts.googleapis.com/css?family=Roboto+Mono:100';
        html,  
        div.body {
        font-family: 'Roboto Mono', monospace;
        background: #212121;
        height: 100%;
        }
        .container {
            height: 100%;
            width: 100%;
            justify-content: center;
            align-items: center;
            display: flex;
        }
        .text {
            font-weight: 100;
            font-size: 28px;
            color: #fafafa;
        }
        .dud {
            color: #757575;
        }
    </style>
    <script type=module src=https://unpkg.com/nomodule@0.0.10/no-module.js?module></script>
    <script type=module src=https://unpkg.com/on-to-me@0.0.7/dist/on-to-me.min.js></script>
    <script type=module src=https://unpkg.com/time-ticker@0.0.12/time-ticker.js?module></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/co-depends@0.0.4/text-scramble/dist/text-scramble.iife.min.js"></script>
    </div>
  </template>
</custom-element-demo>
```
-->