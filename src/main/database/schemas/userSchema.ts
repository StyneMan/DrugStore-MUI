export const userSchema = {
  title: "user_schema",
  description: "describes user",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 1000,
    },
    username: {
      type: "string",
    },
    first_name: {
      type: "string",
    },
    surname: {
      type: "string",
    },
    last_name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    user_type: {
      type: "string",
    },
    crm_contact_id: {
      type: "string",
    },
    allow_login: {
      type: "number",
    },
    cmmsn_percent: {
      type: "string",
    },
    max_sales_discount_percent: {
      type: "string",
    },
    dob: {
      type: "string",
    },
    gender: {
      type: "string",
    },
    marital_status: {
      type: "string",
    },
    blood_group: {
      type: "string",
    },
    alt_number: {
      type: "string",
    },
    contact_number: {
      type: "string",
    },
    family_number: {
      type: "string",
    },
    fb_link: {
      type: "string",
    },
    twitter_link: {
      type: "string",
    },
    id_proof_number: {
      type: "string",
    },
    permanent_address: {
      type: "string",
    },
    current_address: {
      type: "string",
    },
    status: {
      type: "string",
    },
  },
  required: [
    "id",
    "gender",
    "dob",
    "email",
    "first_name",
    "last_name",
    "contact_number",
    "permanent_address",
  ],
};
