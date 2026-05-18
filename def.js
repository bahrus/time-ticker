import { TimeTickerElement } from './time-ticker-element.js';
import { wireFeatures } from './wireFeatures.js';
import defRef from './defRef.json' with { type: 'json' };

await wireFeatures(TimeTickerElement, defRef);
customElements.define('time-ticker', TimeTickerElement);