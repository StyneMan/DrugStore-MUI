export const cartSchema = {
  title: "cart schema",
  description: "describes shopping cart",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
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
  required: ["id", "items", "timestamp"],
};
