export const stockSchema = {
  title: "stock schema",
  description: "describes product stock report",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    alert_quantity: {
      type: "string",
    },
    category_name: {
      type: "string",
    },
    enable_stock: {
      type: "string",
    },
    location_id: {
      type: "string",
    },
    location_name: {
      type: "string",
    },
    product: {
      type: "string",
    },
    product_id: {
      type: "string",
    },
    product_variation: {
      type: "string",
    },
    sku: {
      type: "string",
    },
    stock: {
      type: "string",
    },
    stock_price: {
      type: "string",
    },
    total_adjusted: {
      type: ["string", "null", "number"], // This property can be a string or null
      nullable: true,
    },
    total_sold: {
      type: "string",
    },
    total_transfered: {
      type: ["string", "null", "number"], // This property can be a string or null
      nullable: true,
    },
    type: {
      type: "string",
    },
    unit: {
      type: "string",
    },
    unit_price: {
      type: "string",
    },
    variation_id: {
      type: "string",
    },
    variation_name: {
      type: "string",
    },
  },
};
