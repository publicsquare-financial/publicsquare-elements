import { CreateCardElementOptions, ElementType } from '@basis-theory/basis-theory-js/types/elements';
import { PSQPayInitOptions } from './types/sdk';
export declare class PSQPay {
    private _bt?;
    private _elements?;
    init(apiKey: string, options: PSQPayInitOptions): Promise<this>;
    createElement(type: ElementType, options: CreateCardElementOptions): any;
}
