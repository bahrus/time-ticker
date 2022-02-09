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
    start(self: this): {
        controller: AbortController | undefined,
    },
    onDisabled(self: this): {
        controller: AbortController | undefined,
    }
    onItems(self: this): {
        repeat: number,
    }
    onTicks(self: this): {
        idx?: number | undefined,
        disabled?: boolean,
        value?: IValue,
    }
}

// /**
//  * time-ticker manifest
//  */
// export interface TimeTickerInfo {
//     tagName: 'time-ticker',
//     props: TimeTickerProps,
//     methods: TimeTickerActions,
//     cssProps: {
//         /**
//          * description of text-color
//          */
//         textColor: 'red',
//         objKeyBg: 'rgb(255, 0, 0)',
//     },
//     cssParts: {
//         editor: 'Expander button',

//     },
//     events: {
//         /**
//          * Fired after successfully parsing the object.
//          */
//         parsedObjectChanged: {
//             value: {
//                 idx: number,
//             }
//         },
//     }
// }

export interface SimpleWCInfo{
    tagName: string;
}

export abstract class TimeTickerInfo implements SimpleWCInfo{
    tagName: 'time-ticker';
}