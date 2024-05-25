
export const paths = {
  '/auth/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserRequestDto',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateUserResponseDto',
              },
            },
          },
        },
      },
    },
  },
};
