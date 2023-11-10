export const productVariationSchema = {
    title: "product_variation",
    description: "describes authentication",
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 1000,
      },
      created_at: {
        type: 'string'
      },
      is_dummy: {
        type: 'string'
      },
      name: {
        type: "string",
      },
      product_id: {
        type: "string",
      },
      updated_at: {
        type: "string",
      },
      variation_template_id: {
        type: ["string", "null"], // This property can be a string or null
        nullable: true,
      },
    },
  };
  