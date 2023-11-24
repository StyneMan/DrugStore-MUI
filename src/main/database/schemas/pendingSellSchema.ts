export const pendingSellSchema = {
  title: "pending_sell_schema",
  description: "describes offline sell schema structure",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    sells: {
      type: "array",
      items: {
        type: "object",
        properties: {
          contact_id: {
            type: "number",
          },
          additional_notes: {
            type: "string",
          },
          change_return: {
            type: "string",
          },
          final_total: {
            type: "number",
          },
          delivered_to: {
            type: "string",
          },
          invoice_no: {
            type: "string",
          },
          is_suspend: {
            type: "number",
          },
          location_id: {
            type: "number",
          },
          payments: {
            type: "array",
            items: {
              type: "object",
              properties: {
                amount: {
                  type: "number",
                },
                method: {
                  type: "string",
                },
                note: {
                  type: "string",
                },
              },
            },
          },
          price_group: {
            type: "number",
          },
          products: {
            type: "array",
            items: {
              type: "object",
              properties: {
                base_unit_multiplier: {
                  type: "number",
                },
                enable_stock: {
                  type: "number",
                },
                item_tax: {
                  type: "number",
                },
                line_discount_amount: {
                  type: "number",
                },
                line_discount_type: {
                  type: "string",
                },
                product_id: {
                  type: "number",
                },
                product_type: {
                  type: "string",
                },
                product_unit_id: {
                  type: "number",
                },
                quantity: {
                  type: "number",
                },
                sub_unit_id: {
                  type: "number",
                },
                unit_price: {
                  type: "number",
                },
                variation_id: {
                  type: "number",
                },
              },
            },
          },
          recur_interval_type: {
            type: "string",
          },
          sale_note: {
            type: "string",
          },
          shipping_charges_modal: {
            type: "number",
          },
          staff_note: {
            type: "string",
          },
          status: {
            type: "string",
          },
          transaction_date: {
            type: "string",
          },
          token: {
            type: "string",
          },
        },
      },
    },
  },
  required: ["id", "sells"],
};
