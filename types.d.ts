import {SimpleWCInfo} from 'may-it-be/SimpleWCInfo';

export interface IValue{
    idx: number,
    item: any,
}

/**
 * time-ticker props
 * 
 */
export interface TimeTickerProps {
    /**
     * Items to rotate through and broadcast
     */
    items: any[],
    /**
     * Currently selected idx value and selected item
     */
    value: IValue,
    /**
     * Current index of items (if applicable)
     */
    idx: number,
    /**
     * Milliseconds to wait between ticks
     */
    duration: number,
    /**
     * Upper bound for idx before being reset to 0
     */
    repeat: number,
    /**
     * Start the time ticker.  Toggles disabled state
     */
    enabled: boolean,
    /**
     * Stop the time ticker. 
     */
    disabled: boolean,
    /**
     * Loop the time ticker.
     */
    loop: boolean,
    /**
     * Number of ticks encountered regardless of any looping / repeating.
     */
    ticks: number,
    /**
     * Wait for the duration before firing the first tick.
     */
    wait: boolean,
    /**
     * Abort controller for the time ticker
     */
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
        ticks: number,
    },
    /**
     * Stop the timer
     */
    stop: (self: this) => {
        controller: AbortController | undefined,
    },
    /**
     * React to an uptick.
     */
    onTicks: (self: this) => {
        value?: IValue,
    },
}

export abstract class TimeTickerInfo implements SimpleWCInfo<TimeTickerProps>{
    src: './time-ticker.js';
    tagName: 'time-ticker';
    props: TimeTickerProps;
    methods: TimeTickerActions;
    nonAttribProps: ['value', 'controller'];
    
}

export type Package = [TimeTickerInfo];