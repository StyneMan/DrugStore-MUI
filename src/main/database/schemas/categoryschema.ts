export const categorySchema = {
  title: "category",
  description: "describes categories",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    business_id: {
      type: "string",
    },
    category_type: {
      type: "string",
    },
    created_at: {
      type: "string",
    },
    created_by: {
      type: "string",
    },
    deleted_at: {
      type: ["string", "null"], // This property can be a string or null
      nullable: true,
    },
    description: {
      type: ["string", "null"], // This property can be a string or null
      nullable: true,
    },
    name: {
      type: "string",
    },
    parent_id: {
      type: "string",
    },
    short_code: {
      type: ["string", "null"], // This property can be a string or null
      nullable: true,
    },
    slug: {
      type: ["string", "null"], // This property can be a string or null
      nullable: true,
    },
    sub_categories: {
      type: "array",
    },
    updated_at: {
      type: "string",
    },
    woocommerce_cat_id: {
      type: ["string", "null"], // This property can be a string or null
      nullable: true,
    },
  },
};
