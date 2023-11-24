export const paymentMethodSchema = {
  title: "payment method schema",
  description: "describes payment method",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    methods: {
      type: 'object',
      properties: {
        cash: {
          type: "string",
        },
        card: {
          type: "string",
        },
        cheque: {
          type: "string",
        },
        bank_transfer: {
          type: "string",
        },
        custom_pay_1: {
          type: "string",
        },
        custom_pay_2: {
          type: "string",
        },
        custom_pay_3: {
          type: "string",
        },
        custom_pay_4: {
          type: "string",
        },
        custom_pay_5: {
          type: "string",
        },
        custom_pay_6: {
          type: "string",
        },
        custom_pay_7: {
          type: "string",
        },
        other: {
          type: "string",
        },
      }
    },
    timestamp: {
      type: "date-time",
    },
  },
  required: [
    "id",
    "cash",
    "card",
    "cheque",
    "bank_transfer",
    "other",
    "timestamp",
  ],
};
