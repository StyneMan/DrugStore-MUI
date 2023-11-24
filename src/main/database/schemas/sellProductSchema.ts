export const sellProductSchema = {
    title: "sell_product_schema",
    description: "describes sell product schema",
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 1000,
      },
      product_id: {
        type: 'number'
      },
      variation_id: {
        type: 'number'
      },
      quantity: {
        type: "number",
      },
      unit_price: {
        type: "number",
      },
      sub_unit_id: {
        type: "number",
      },
      tax_rate_id: {
        type: "number",
      },
      discount_amount: {
        type: "number",
      },
      discount_type: {
        type: "string",
      },
      note: {
        type: "string",
      },
    },
    required: ["id", "product_id", "variation_id", "quantity", "unit_price"],
  };
  