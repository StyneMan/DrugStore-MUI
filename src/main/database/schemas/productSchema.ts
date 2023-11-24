export const productSchema = {
  title: "product",
  description: "describes product",
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
    barcode_type: {
      type: "string",
    },
    brand: {
      type: ["string", "null"],
      nullable: true,
    },
    business_id: {
      type: "string",
    },
    category: {
      type: "object",
      properties: {
        type: { type: 'string' },
        ref: { type: 'category' },
      },
    },
    created_by: {
      type: "string",
    },
    enable_sr_no: {
      type: "string",
    },
    enable_stock: {
      type: "string",
    },
    expiry_period: {
      type: ["string", "null"],
      nullable: true,
    },
    image: {
      type: "string",
    },
    image_url: {
      type: "string",
    },
    is_inactive: {
      type: "string",
    },
    name: {
      type: "string",
    },
    not_for_selling: {
      type: "string",
    },
    product_description: {
      type: ["string", "null"],
      nullable: true,
    },
    product_locations: {
      type: "array",
      items: {
        type: "string",
        ref: "businesslocation",
      },
    },
    product_tax: {
      type: ["string", "null"],
      nullable: true,
    },
    product_variations: {
      type: "array",
      items: {
        type: "string",
        ref: "product_variation",
      },
    },
    sku: {
      type: "string",
    },
    sub_category: {
      type: "string",
    },
    type: {
      type: "string",
    },
    warranty_id: {
      type: ["string", "null"],
      nullable: true,
    },
    unit: {
      type: "array",
    },
    weight: {
      type: ["string", "null"],
      nullable: true,
    },
  },
};
