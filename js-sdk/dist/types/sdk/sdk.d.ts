import type { CreateCardElementOptions as BTCreateCardElementOptions, ElementType as BTElementType } from '@basis-theory/basis-theory-js/types/elements';
export interface ApplicationInfo {
    name?: string;
    version?: string;
    url?: string;
}
export interface CredovaInitOptions {
    apiBaseUrl?: string;
    appInfo?: ApplicationInfo;
}
export type ElementType = BTElementType;
export declare enum ElementTypeEnum {
    Card = "card",
    CardExpirationDate = "cardExpirationDate",
    CardNumber = "cardNumber",
    CardVerificationCode = "cardVerificationCode"
}
export type CreateCardElementOptions = BTCreateCardElementOptions;
