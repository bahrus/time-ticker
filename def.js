import { TimeTickerElement } from './time-ticker-element.js';
import { wireFeatures } from './wireFeatures.js';

await wireFeatures(TimeTickerElement);
customElements.define('time-ticker', TimeTickerElement);