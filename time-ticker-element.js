import { ElementMaker } from 'el-maker/ElementMaker.js';

export class TimeTickerElement extends ElementMaker {
    static supportedFeatures = {
        ...ElementMaker.supportedFeatures,
        timeTicker: {},
    };
}
