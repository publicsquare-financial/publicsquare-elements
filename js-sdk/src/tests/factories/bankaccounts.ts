import { BankAccountCreateInput } from "@/types/sdk/bankaccounts";

export function generateBankAccountCreateInput(): 
  BankAccountCreateInput {
  return {
    account_number: '1515151515151',
    routing_number: '878787878',
    account_holder_name: 'John Doe',
    account_holder_type: 'individual',
    account_type: 'checking',
    customer_id: 'cus_18979877',
  } as any
}