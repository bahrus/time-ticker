const jiife = require('jiife');
const xl = 'node_modules/xtal-latx/';
jiife.processFiles([xl + 'define.js', xl + 'xtal-latx.js', 'time-ticker.js'], 'dist/time-ticker.iife.js');