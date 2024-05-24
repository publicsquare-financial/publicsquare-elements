import { ElementType, CreateCardElementOptions, CredovaInitOptions } from './types/sdk';
import { CreateCardExpirationDateElementOptions, CreateCardNumberElementOptions, CreateCardVerificationCodeElementOptions } from '@basis-theory/basis-theory-js/types/elements';
export declare class Credova {
    private _bt?;
    /**
     * Initialize the Credova sdk. (REQUIRED before calling `createElement`)
     * @param apiKey your Credova public key
     * @param options CredovaInitOptions see [docs](https://docs.credova.com)
     * @returns class Credova
     */
    init(apiKey: string, options: CredovaInitOptions): Promise<this>;
    private _createElement;
    /**
     * Initialize a Credova element.
     * @param type 'card' | 'cardExpirationDate' | 'cardNumber' | 'cardVerificationCode'
     * @param options CreateCardElementOptions see [docs](https://docs.credova.com)
     * @returns created element
     */
    createElement(type: ElementType, options: CreateCardElementOptions): any;
    createCardElement(options: CreateCardElementOptions): any;
    createCardExpirationDateElement(options: Omit<CreateCardExpirationDateElementOptions, 'targetId'>): any;
    createCardNumberElement(options: Omit<CreateCardNumberElementOptions, 'targetId'>): any;
    createCardVerificationCodeElement(options: Omit<CreateCardVerificationCodeElementOptions, 'targetId'>): any;
}
