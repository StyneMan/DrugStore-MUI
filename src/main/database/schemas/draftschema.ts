export const draftSchema = {
  title: "draft schema",
  description: "describes draft",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    customer: {
      id: {
        type: "string",
      },
      name: {
        type: "string",
      },
      phone: {
        type: "string",
      },
    },
    amount: {
      type: "number",
    },
    items: [
      {
        name: {
          type: "string",
        },
        image: {
          type: "string",
        },
        quantity: {
          type: "number",
        },
        unitPrice: {
          type: "number",
        },
      },
    ],
    timestamp: {
      type: "date-time",
    },
  },
  required: ["id", "items", "customer", "amount", "timestamp"],
};
