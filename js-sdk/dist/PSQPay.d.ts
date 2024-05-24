import { ElementType, PSQPayInitOptions, CreateCardElementOptions } from './types/sdk';
export declare class PSQPay {
    private _bt?;
    init(apiKey: string, options: PSQPayInitOptions): Promise<this>;
    private _createElement;
    createElement(type: ElementType, options: CreateCardElementOptions): any;
    createCardElement(options: CreateCardElementOptions): any;
    createCardExpirationDateElement(options: CreateCardElementOptions): any;
    createCardNumberElement(options: CreateCardElementOptions): any;
    createCardVerificationCodeElement(options: CreateCardElementOptions): any;
}
