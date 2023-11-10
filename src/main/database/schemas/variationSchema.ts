export const variationSchema = {
  title: "variation",
  description: "describes variation",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    created_at: {
      type: "string",
    },
    default_purchase_price: {
      type: "string",
    },
    default_sell_price: {
      type: "string",
    },
    dpp_inc_tax: {
      type: "string",
    },
    name: {
      type: "string",
    },
    product_id: {
      type: "string",
    },
    product_variation_id: {
      type: "string",
    },
    profit_percent: {
      type: "string",
    },
    sell_price_inc_tax: {
      type: "string",
    },
    sub_sku: {
      type: "string",
    },
    updated_at: {
      type: "string",
    },
    variation_value_id: {
      type: "string",
    },
    woocommerce_variation_id: {
      type: ["string", "null"],
      nullable: true,
    },
    combo_variations: {
      type: "array",
    },
    media: {
      type: "array",
    },
    discounts: {
      type: "array",
    },
    variation_location_details: {
      type: "array",
    },
  },
};
