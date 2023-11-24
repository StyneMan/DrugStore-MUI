export const customerSchema = {
  title: "customer_schema",
  description: "describes a customer",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    first_name: {
      type: "string",
    },
    middle_name: {
      type: "string",
    },
    last_name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    type: {
      type: "string",
    },
    name: {
      type: "string",
    },
    contact_id: {
      type: "string",
    },
    credit_limit: {
      type: "string",
    },
    dob: {
      type: "string",
    },
    mobile: {
      type: "string",
    },
    address_line_1: {
      type: "string",
    },
    state: {
      type: "string",
    },
    alt_number: {
      type: "string",
    },
    city: {
      type: "string",
    },
    tax_number: {
      type: "string",
    },
    prefix: {
      type: "string",
    },
    shipping_address: {
      type: "string",
    },
    pay_term_type: {
      type: "string",
    },
    pay_term_number: {
      type: "number",
    },
    contact_status: {
      type: "string",
    },
    business_id: {
      type: "string",
    },
  },
  required: [
    "id",
    "type",
  ],
};
