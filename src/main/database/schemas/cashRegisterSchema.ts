export const cashRegisterSchema = {
    title: "cash register schema",
    description: "describes cash register",
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 1000,
      },
      location_id: {
        type: 'number'
      },
      initial_amount: {
        type: 'number'
      },
      created_at: {
        type: "string",
      },
      closed_at: {
        type: "string",
      },
      status: {
        type: "string",
      },
      closing_amount: {
        type: "number",
      },
      total_card_slips: {
        type: "number",
      },
      total_cheques: {
        type: "number",
      },
      closing_note: {
        type: "string",
      },
      transaction_ids: {
        type: "string",
      },
    },
    required: ["id", "location_id", "initial_amount", "created_at", "status"],
  };
  