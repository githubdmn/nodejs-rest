export const components = {
  schemas: {
    CreateUserRequestDto: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
      required: ['name', 'email', 'password'],
    },
    CreateUserResponseDto: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
      },
    },
    // ... Define other DTOs similarly ...
  },
};
