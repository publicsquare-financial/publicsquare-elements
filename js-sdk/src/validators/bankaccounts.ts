import {BankAccountCreateInput, ValidatedBankAccountCreateInput} from "@/types/sdk";

export function validateCreateBankAccountInput(
    input: BankAccountCreateInput
): ValidatedBankAccountCreateInput {
    if (typeof input.account_number !== 'string') {
        throw new Error('Account number is required')
    }
    if (typeof input.routing_number !== 'string') {
        throw new Error('Routing number is required')
    }
    if (!['object', 'undefined'].includes(typeof input.billing_details)) {
        throw new Error('billing_details must be an object if included')
    }
    return {
        validated: {
            account_number: input.account_number,
            routing_number: input.routing_number,
            account_holder_name: input.account_holder_name,
            account_holder_type: input.account_holder_type,
            account_type: input.account_type,
            customer_id: input.customer_id,
            billing_details: input.billing_details
        }
    }
}