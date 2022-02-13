export interface IValue{
    idx: number,
    item: any,
}

/**
 * time-ticker props
 * 
 */
export interface TimeTickerProps {
    items: any[],
    value: any,
    /**
     * ```JavaScript
     * {
     *  default: -1,
     * }
     */
    idx: number,
    duration: number,
    repeat: number,
    /**
     * ```JavaScript
     * {
     *      default: true,
     *      dry: false,
     *      notify: {
     *         toggleTo: 'disabled',
     *     }
     * }
     */
    enabled: boolean,
    disabled: boolean,
    loop: boolean,
    ticks: number,
    /**
     * Wait for the duration before firing the first tick.
     */
    wait: boolean,
    controller: AbortController,
}

/**
 * time-ticker actions
 */
export interface TimeTickerActions {
    /**
     * 
     * Starts the timer
     */
    start: (self: this) => {
        controller: AbortController | undefined,
    },
    /**
     * Stop the timer
     */
    stop: (self: this) => {
        controller: AbortController | undefined,
    },
    /**
     * Set rotatino items
     */
    rotateItems: (self: this) => {
        repeat: number,
    },
    onTicks: (self: this) => {
        idx?: number | undefined,
        disabled?: boolean,
        value?: IValue,
    },
}





export interface SimpleWCInfo<TProps = any, TPublicMethods = any>{
    tagName: string;
    cssParts?: {[key: string]: string};
    props?: any;
    methods?: any;
    cssProps?: {[key: string]: string};
}

export abstract class TimeTickerInfo implements SimpleWCInfo{
    tagName: 'time-ticker';
    props: TimeTickerProps;
    methods: TimeTickerActions;
}