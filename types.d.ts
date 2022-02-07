export interface IValue{
    idx: number,
    item: any,
}

export interface TimeTickerProps {
    items: any[],
    value: any,
    idx: number,
    duration: number,
    repeat: number,
    enabled: boolean,
    disabled: boolean,
    loop: boolean,
    ticks: 0,
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