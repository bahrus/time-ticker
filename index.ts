import {def} from 'trans-render/lib/def.js';
import {TimeTicker} from './time-ticker.js';

await TimeTicker.bootUp();
def(TimeTicker.config.name!, TimeTicker);