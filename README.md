[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/time-ticker)

<a href="https://nodei.co/npm/time-ticker/"><img src="https://nodei.co/npm/time-ticker.png"></a>

<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/tim-ticker@0.0.2/dist/time-ticker.iife.min.js?compression=gzip">

# time-ticker

time-ticker is a non-visible custom element that fires an event periodically.

![](https://media.giphy.com/media/Hlb53yZwhKobm/giphy.gif)

```html
<time-ticker loop repeat="10" duration="200"></time-ticker>
```

## Example 1.  Based off [Text Scramble](https://codepen.io/soulwire/pen/mErPAK)

<!--
```
<custom-element-demo>
  <template>
    <div>
        <p-d on="text-setting-complete" to="time-ticker" prop="enabled" val="target.id"></p-d>
        <xtal-deco><script>
        ({
            setters: {
                items: [
                    'Neo,',
                    'sooner or later',
                    'you\'re going to realize',
                    'just as I did',
                    'that there\'s a difference',
                    'between knowing the path',
                    'and walking the path'
                ]
            }
        })
        </script></xtal-deco>
        <time-ticker disabled="2" loop wait></time-ticker>
        <p-d-r on="tick" to="co-depends-text-scramble" prop="text" val="target.value.item"></p-d-r> 
        <div class="container" p-d-if="p-d-r">
            <co-depends-text-scramble id="cdts" class="text"></co-depends-text-scramble>
        </div>
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
        <script type="module" src="https://cdn.jsdelivr.net/npm/time-ticker@0.0.2/dist/time-ticker.iife.js"></script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/p-d.p-u@0.0.92/dist/p-all.iife.js"></script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/co-depends@0.0.4/text-scramble/dist/text-scramble.iife.min.js"></script>
        <script type="module" src="https://cdn.jsdelivr.net/npm/xtal-decorator@0.0.33/dist/xtal-decorator.iife.js"></script>
    </div>
  </template>
</custom-element-demo>
```
-->