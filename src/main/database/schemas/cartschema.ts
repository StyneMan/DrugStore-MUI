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
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
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
          productId: {
            type: "string",
          },
          priceWithTax: {
            type: "number",
          },
          variationId: {
            type: "number",
          },
          productType: {
            type: "string",
          },
          productUnitId: {
            type: "number",
          },
        },
      },
    },
    timestamp: {
      type: "date-time",
    },
  },
};
