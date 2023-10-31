export const authSchema = {
    title: "authentication schema",
    description: "describes authentication",
    version: 0,
    primaryKey: "id",
    type: "object",
    properties: {
      id: {
        type: "string",
        maxLength: 1000,
      },
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      lastLogin: {
        type: "date-time",
      },
    },
    required: ["id", "username", "password", "lastLogin"],
  };
  