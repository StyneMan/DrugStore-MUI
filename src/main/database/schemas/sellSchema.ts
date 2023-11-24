export const sellSchema = {
  title: "sell_schema",
  description: "describes sell schema structure",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    location_id: {
      type: "number",
    },
    contact_id: {
      type: "number",
    },
    transaction_date: {
      type: "string",
    },
    invoice_no: {
      type: "string",
    },
    sale_note: {
      type: "string",
    },
    shipping_details: {
      type: "string",
    },
    shipping_address: {
      type: "string",
    },
    shipping_status: {
      type: "string",
    },
    delivered_to: {
      type: "string",
    },
    change_return: {
      type: "number",
    },
    products: {
      type: "array",
      items: {
        type: "string",
        ref: "sell_product_schema",
      },
    },
    service_staff_id: {
      type: "string",
    },
    payments: {
      type: "array",
      items: {
        type: "string",
        ref: "sell_payment_schema", 
      },
    },
    exchange_rate: {
      type: "number",
    },
    round_off_amount: {
      type: "number",
    },
  },
  required: ["id", "contact_id", "location_id", "transaction_date"],
};
