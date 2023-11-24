export const sellPaymentSchema = {
    title: "sell_payment_schema",
    description: "describes sell payment schema",
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 1000,
      },
      amount: {
        type: 'number'
      },
      method: {
        type: 'string'
      },
      account_id: {
        type: "number",
      },
      card_number: {
        type: "string",
      },
      card_holder_name: {
        type: "string",
      },
      card_transaction_number: {
        type: "string",
      },
      card_type: {
        type: "string",
      },
      card_month: {
        type: "string",
      },
      card_year: {
        type: "string",
      },
      card_security: {
        type: "string",
      },
      transaction_no_1: {
        type: "string",
      },
      transaction_no_2: {
        type: "string",
      },
      transaction_no_3: {
        type: "string",
      },
      bank_account_number: {
        type: "string",
      },
      note: {
        type: "string",
      },
      cheque_number: {
        type: "string",
      },
    },
    required: ["id", "amount", ],
  };
  