// Re-export Apple Pay types from global declarations
// This makes the types available as module exports for downstream consumers
// The global declarations are made available through src/global.d.ts

// Export types for module consumers who prefer named imports
export type ApplePayContactField = ApplePayJS.ApplePayContactField;
export type ApplePayError = ApplePayJS.ApplePayError;
export type ApplePayErrorCode = ApplePayJS.ApplePayErrorCode;
export type ApplePayErrorContactField = ApplePayJS.ApplePayErrorContactField;
export type ApplePayLineItem = ApplePayJS.ApplePayLineItem;
export type ApplePayPaymentTiming = ApplePayJS.ApplePayPaymentTiming;
export type ApplePayRecurringPaymentDateUnit = ApplePayJS.ApplePayRecurringPaymentDateUnit;
export type ApplePayLineItemType = ApplePayJS.ApplePayLineItemType;
export type ApplePayMerchantCapability = ApplePayJS.ApplePayMerchantCapability;
export type ApplePayPayment = ApplePayJS.ApplePayPayment;
export type ApplePayPaymentAuthorizationResult = ApplePayJS.ApplePayPaymentAuthorizationResult;
export type ApplePayPaymentOrderDetails = ApplePayJS.ApplePayPaymentOrderDetails;
export type ApplePayPaymentContact = ApplePayJS.ApplePayPaymentContact;
export type ApplePayPaymentMethodType = ApplePayJS.ApplePayPaymentMethodType;
export type ApplePayPaymentMethodUpdate = ApplePayJS.ApplePayPaymentMethodUpdate;
export type ApplePayPaymentPassActivationState = ApplePayJS.ApplePayPaymentPassActivationState;
export type ApplePayPaymentRequest = ApplePayJS.ApplePayPaymentRequest;
export type ApplePayRecurringPaymentRequest = ApplePayJS.ApplePayRecurringPaymentRequest;
export type ApplePayAutomaticReloadPaymentRequest =
  ApplePayJS.ApplePayAutomaticReloadPaymentRequest;
export type ApplePayDeferredPaymentRequest = ApplePayJS.ApplePayDeferredPaymentRequest;
export type PaymentCredentialStatusResponse = ApplePayJS.PaymentCredentialStatusResponse;
export type PaymentCredentialStatus = ApplePayJS.PaymentCredentialStatus;
export type ApplePayLaterAvailability = ApplePayJS.ApplePayLaterAvailability;
export type ApplePayShippingContactEditingMode = ApplePayJS.ApplePayShippingContactEditingMode;
export type ApplePayPaymentTokenContext = ApplePayJS.ApplePayPaymentTokenContext;
export type ApplePayPaymentToken = ApplePayJS.ApplePayPaymentToken;
export type ApplePayShippingContactUpdate = ApplePayJS.ApplePayShippingContactUpdate;
export type ApplePayShippingMethod = ApplePayJS.ApplePayShippingMethod;
export type ApplePayDateComponentsRange = ApplePayJS.ApplePayDateComponentsRange;
export type ApplePayDateComponents = ApplePayJS.ApplePayDateComponents;
export type ApplePayShippingMethodUpdate = ApplePayJS.ApplePayShippingMethodUpdate;
export type ApplePayCouponCodeUpdate = ApplePayJS.ApplePayCouponCodeUpdate;
export type ApplePayShippingType = ApplePayJS.ApplePayShippingType;
export type ApplePayJSPaymentMethod = ApplePayJS.ApplePayPaymentMethod;
export type ApplePayJSPaymentPass = ApplePayJS.ApplePayPaymentPass;
export type ApplePayPaymentAuthorizedEvent = ApplePayJS.ApplePayPaymentAuthorizedEvent;
export type ApplePayPaymentMethodSelectedEvent = ApplePayJS.ApplePayPaymentMethodSelectedEvent;
export type ApplePayShippingContactSelectedEvent = ApplePayJS.ApplePayShippingContactSelectedEvent;
export type ApplePayShippingMethodSelectedEvent = ApplePayJS.ApplePayShippingMethodSelectedEvent;
export type ApplePayValidateMerchantEvent = ApplePayJS.ApplePayValidateMerchantEvent;
export type ApplePayCouponCodeChangedEvent = ApplePayJS.ApplePayCouponCodeChangedEvent;

/**
 * ApplePaySession is the entry point for Apple Pay on the web.
 */
export declare class ApplePaySession extends EventTarget {
  /**
   * The entry point for Apple Pay on the web.
   * @param version - The version number of the ApplePay JS API you are using. The current API version number is 14.
   * @param paymentRequest - An ApplePayPaymentRequest object that contains the information to be displayed on the Apple Pay payment sheet.
   */
  constructor(version: number, paymentRequest: ApplePayJS.ApplePayPaymentRequest);

  /**
   * A callback function that is automatically called when the payment UI is dismissed.
   */
  oncancel: (event: ApplePayJS.Event) => void;

  /**
   * A callback function that is automatically called when the user has authorized the Apple Pay payment with Touch ID, Face ID, or passcode.
   */
  onpaymentauthorized: (event: ApplePayJS.ApplePayPaymentAuthorizedEvent) => void;

  /**
   * A callback function that is automatically called when a new payment method is selected.
   */
  onpaymentmethodselected: (event: ApplePayJS.ApplePayPaymentMethodSelectedEvent) => void;

  /**
   * A callback function that is called when a shipping contact is selected in the payment sheet.
   */
  onshippingcontactselected: (event: ApplePayJS.ApplePayShippingContactSelectedEvent) => void;

  /**
   * A callback function that is automatically called when a shipping method is selected.
   */
  onshippingmethodselected: (event: ApplePayJS.ApplePayShippingMethodSelectedEvent) => void;

  /**
   * A callback function that is automatically called when the payment sheet is displayed.
   */
  onvalidatemerchant: (event: ApplePayJS.ApplePayValidateMerchantEvent) => void;

  /**
   * An event handler called by the system when the user enters or updates a coupon code.
   */
  oncouponcodechanged: (event: ApplePayJS.ApplePayCouponCodeChangedEvent) => void;

  /**
   * Indicates whether the device supports Apple Pay.
   * @returns true if the device supports making payments with Apple Pay; otherwise, false.
   */
  static canMakePayments(): boolean;

  /**
   * Indicates whether the device supports Apple Pay and whether the person has an active card in Wallet that qualifies for web payments.
   * @param merchantIdentifier - The merchant ID created when the merchant enrolled in Apple Pay.
   * @returns the PaymentCredentialStatusResponse object.
   */
  static applePayCapabilities(
    merchantIdentifier: string,
  ): Promise<ApplePayJS.PaymentCredentialStatusResponse>;

  /**
   * Indicates whether the device supports Apple Pay and whether the user has an active card in Wallet.
   * @param merchantIdentifier - The merchant ID created when the merchant enrolled in Apple Pay.
   * @returns true if the device supports Apple Pay and there is at least one active card in Wallet that is qualified for payments on the web; otherwise, false.
   * @deprecated Use applePayCapabilities instead.
   */
  static canMakePaymentsWithActiveCard(merchantIdentifier: string): Promise<boolean>;

  /**
   * Displays the Set up Apple Pay button.
   * @param merchantIdentifier - The merchant ID created when the merchant enrolled in Apple Pay.
   * @returns A boolean value indicating whether setup was successful.
   */
  static openPaymentSetup(merchantIdentifier: string): Promise<boolean>;

  /**
   * Verifies whether a web browser supports a given Apple Pay JS API version.
   * @param version - A number representing the Apple Pay JS API version being checked. The initial version is 1. The latest version is 3.
   * @returns A boolean value indicating whether the web browser supports the given API version. Returns false if the web browser does not support the specified version.
   */
  static supportsVersion(version: number): boolean;

  /**
   * Aborts the current Apple Pay session.
   */
  abort(): void;

  /**
   * Begins the merchant validation process.
   */
  begin(): void;

  /**
   * Completes the validation for a merchant session.
   * @param merchantSession - An opaque message session object.
   */
  completeMerchantValidation(merchantSession: any): void;

  /**
   * Completes the payment authorization with a result.
   * @param result - The status of the payment, whether it succeeded or failed for Apple Pay JS versions 1 and 2,
   * or the result of the payment authorization, including its status and list of errors for Apple Pay JS version 3.
   */
  completePayment(result: number | ApplePayJS.ApplePayPaymentAuthorizationResult): void;

  /**
   * Call after a payment method has been selected for Apple Pay JS versions 1 and 2.
   * @param newTotal - An ApplePayLineItem dictionary representing the total price for the purchase.
   * @param newLineItems - A sequence of ApplePayLineItem dictionaries.
   */
  completePaymentMethodSelection(
    newTotal: ApplePayJS.ApplePayLineItem,
    newLineItems: ApplePayJS.ApplePayLineItem[],
  ): void;

  /**
   * Completes the selection of a payment method with an update for Apple Pay JS version 3.
   * @param update - The updated payment method.
   */
  completePaymentMethodSelection(update: ApplePayJS.ApplePayPaymentMethodUpdate): void;

  /**
   * Completes the selection of a shipping contact with an update for Apple Pay JS versions 1 and 2.
   * @param status - The status of the shipping contact update.
   * @param newShippingMethods - A sequence of ApplePayShippingMethod dictionaries.
   * @param newTotal - An ApplePayLineItem dictionary representing the total price for the purchase.
   * @param newLineItems - A sequence of ApplePayLineItem dictionaries.
   */
  completeShippingContactSelection(
    status: number,
    newShippingMethods: ApplePayJS.ApplePayShippingMethod[],
    newTotal: ApplePayJS.ApplePayLineItem,
    newLineItems: ApplePayJS.ApplePayLineItem[],
  ): void;

  /**
   * Completes the selection of a shipping contact with an update for Apple Pay JS version 3.
   * @param update - The updated shipping contact.
   */
  completeShippingContactSelection(update: ApplePayJS.ApplePayShippingContactUpdate): void;

  /**
   * Call after the shipping method has been selected for Apple Pay JS versions 1 and 2.
   * @param status - The status of the shipping method update.
   * @param newTotal - An ApplePayLineItem dictionary representing the total price for the purchase.
   * @param newLineItems - A sequence of ApplePayLineItem dictionaries.
   */
  completeShippingMethodSelection(
    status: number,
    newTotal: ApplePayJS.ApplePayLineItem,
    newLineItems: ApplePayJS.ApplePayLineItem[],
  ): void;

  /**
   * Completes the selection of a shipping method with an update for Apple Pay JS version 3.
   * @param update - The updated shipping method.
   */
  completeShippingMethodSelection(update: ApplePayJS.ApplePayShippingMethodUpdate): void;

  /**
   * Completes the entry of a coupon code with an update.
   * @param update - The updated coupon code.
   */
  completeCouponCodeChange(update: ApplePayJS.ApplePayCouponCodeUpdate): void;

  /**
   * The requested action succeeded.
   */
  static readonly STATUS_SUCCESS: number;

  /**
   * The requested action failed.
   */
  static readonly STATUS_FAILURE: number;

  /**
   * The billing address is not valid.
   */
  static readonly STATUS_INVALID_BILLING_POSTAL_ADDRESS: number;

  /**
   * The shipping address is not valid.
   */
  static readonly STATUS_INVALID_SHIPPING_POSTAL_ADDRESS: number;

  /**
   * The shipping contact information is not valid.
   */
  static readonly STATUS_INVALID_SHIPPING_CONTACT: number;

  /**
   * The PIN information is not valid. Cards on the China Union Pay network may require a PIN.
   */
  static readonly STATUS_PIN_INCORRECT: number;

  /**
   * The maximum number of tries for a PIN has been reached and the user has been locked out. Cards on the China Union Pay network may require a PIN.
   */
  static readonly STATUS_PIN_LOCKOUT: number;

  /**
   * The required PIN information was not provided. Cards on the China Union Pay payment network may require a PIN to authenticate the transaction.
   */
  static readonly STATUS_PIN_REQUIRED: number;
}
