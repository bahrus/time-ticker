export interface IValue{
    idx: number,
    item: any,
}

/**
 * time-ticker props
 * ```Javascript
 *         propDefaults: {
            ticks: 0,
            idx: -1,
            duration: 1_000,
            repeat: Infinity,
            enabled: true,
            disabled: false,
            loop: false,
            wait: false,
        },
        propInfo:{
            enabled:{
                dry: false,
                notify: {
                    toggleTo: 'disabled',
                }
            },
            value: {
                notify: {
                    dispatch: true,
                },
                parse: false,
            },
        },
 * ```
 */
export interface TimeTickerProps {
    items: any[],
    value: any,
    idx: number,
    duration: number,
    repeat: number,
    enabled: boolean,
    disabled: boolean,
    loop: boolean,
    ticks: number,
    /**
     * Wait for the duration before firing the first tick.
     * ```JSON
     * {
     *   "props": {
     *   }
     * }
     * ```
     * 
     */
    wait: boolean,
    controller: AbortController,
}

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

export interface TimeTickerInfo {
    tagName: 'time-ticker',
    props: TimeTickerProps,
    methods: TimeTickerActions,
    cssProps: {
        '--duration': 'test',
    }
}