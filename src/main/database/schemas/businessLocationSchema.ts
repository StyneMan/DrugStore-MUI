export const businessLocationSchema = {
    title: "businesslocation",
    description: "describes business locations",
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
      city: {
        type: "string",
      },
      country: {
        type: "string",
      },
      created_at: {
        type: "string",
      },
      email: {
        type: "string",
      },
      landmark: {
        type: "string",
      },
      location_id: {
        type: "string",
      },
      mobile: {
        type: "string",
      },
      name: {
        type: "string",
      },
      state: {
        type: "string",
      },
      updated_at: {
        type: "string",
      },
      is_active: {
        type: "string",
      },
      print_receipt_on_invoice: {
        type: "string",
      },
      zip_code: {
        type: "string",
      },
      payment_methods: {
        type: 'array'
      },
      timestamp: {
        type: "date-time",
      },
    },
  };
  