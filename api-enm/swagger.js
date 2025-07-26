import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Rarelygroovy API', version: '1.0.0' },
        paths: {
            '/api/enmEventsTrans': {
                get: {
                summary: 'Get all future events',
                tags: ['Event'],
                responses: {
                    '200': {
                    description: 'List of events',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: { $ref: '#/components/schemas/Event' }
                            }
                        }
                    }
                    }
                }
                }
            },
            '/api/enmEvents/pastTrans': {
                get: {
                    summary: 'Get all past events',
                    tags: ['Event'],
                    parameters: [
                    {
                        name: 'username',
                        in: 'query',
                        schema: { type: 'string' },
                        required: false,
                        description: 'Username of the requesting user (not used)'
                    }
                    ],
                    responses: {
                    '200': {
                        description: 'List of past verified events',
                        content: {
                        'application/json': {
                            schema: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Event' }
                            }
                        }
                        }
                    },
                    '500': { description: 'Server error' }
                    }
                }
            },
            '/api/artistDirectoryTrans': {
  get: {
    summary: 'Get artist directory',
    tags: ['Artist'],
    parameters: [
      {
        name: 'username',
        in: 'query',
        schema: { type: 'string' },
        required: false,
        description: 'Username to check Plus status (not used)'
      }
    ],
    responses: {
      '200': {
        description: 'List of all artists in the Artist Directory',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/Artist' }
            }
          }
        }
      },
      '500': { description: 'Server error' }
    }
  }
            },
            '/api/login': {
  post: {
    summary: 'Authenticate user',
    tags: ['User'],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: { type: 'string' },
              password: { type: 'string' }
            }
          }
        }
      }
    },
    responses: {
      '200': {
        description: 'Login successful',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                user: { $ref: '#/components/schemas/User' }
              }
            }
          }
        }
      },
      '400': { description: 'Missing username or password' },
      '401': { description: 'Invalid credentials' },
      '500': { description: 'Internal server error' }
    }
  }
            },
            '/api/create-user': {
                post: {
                    summary: 'Register a new user',
                    tags: ['User'],
                    requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                            username: { type: 'string' },
                            password: { type: 'string' },
                            promoCode: { type: 'string' }
                            },
                            required: ['username', 'password']
                        }
                        }
                    }
                    },
                    responses: {
                    '201': {
                        description: 'User created successfully',
                        content: {
                        'application/json': {
                            schema: {
                            type: 'object',
                            properties: {
                                user: { $ref: '#/components/schemas/User' }
                            }
                            }
                        }
                        }
                    },
                    '400': { description: 'Username and password required' },
                    '409': { description: 'User already exists' },
                    '500': { description: 'Internal server error' }
                    }
                }
            }
        },    
        components: {
            schemas: {
                Event: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    tags: { type: 'array', items: { type: 'string' } },
                    venue: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        address: { type: 'string' },
                        city: { type: 'string' },
                        state: { type: 'string' },
                        country: { type: 'string' },
                        link: { type: 'string' },
                        _id: { type: 'string' }
                    }
                    },
                    date: { type: 'string', format: 'date-time' },
                    doorTime: { type: ['string', 'null'], format: 'date-time' },
                    dateTime: { 
                        type: 'string', 
                        format: 'date-time',
                        description: 'The date and time when the event\'s artists start playing music'
                    },
                    cover: { type: 'number' },
                    artists: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Artist' }
                    },
                    creationDateTime: { 
                        type: 'string', 
                        format: 'date-time',
                        description: 'The date and time when the event was added to Rarelygroovy\'s system.'
                    },
                    promoter: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        link: { type: 'string' },
                        _id: { type: 'string' }
                    }
                    },
                    flyer: { 
                        type: 'string', 
                        format: 'uri' ,
                        description: 'Instagram link to the event flyer. Facebook and other sites ok too. Prefer Instagram.'
                    },
                    flyerColors: { 
                        type: 'array', 
                        items: { type: 'string' },
                        description: 'An array of hex codes representing the main colors of the flyer\'s graphic art. Note: this is an unused property.'
                    },
                    updates: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                        date: { type: 'string', format: 'date-time' },
                        message: { type: 'string' }
                        }
                    }
                    },
                    verified: { 
                        type: 'boolean',
                        description: 'A true/false property that helps prevent unverfied events from being listed on Rarelygroovy'
                    },
                    __v: { type: 'number' }
                }
                },
                Artist: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    link: { 
                        type: 'string', 
                        format: 'uri',
                        description: 'Link to the artist\'s instagram page. Note: this is a somewhat of a vestigial property. It was mostly used when Rarelygroovy first started and when the artist type was simpler. This property is set for removal in the future as it is redundant and can be found in the links object'
                    },
                    location: { 
                        type: 'string',
                        description: 'The artist\'s home town, metropolitan area, state, or country. Note: For local artists (i.e. those based in the RGV) the location is always set to \'RGV\' with no further distinction as to which city in the RGV they may be from. For artist who are touring and visiting the RGV, location can be set to their home city (LA, MIAMI, NYC, etc; typically when the home city is sufficiently big and well known), their home state (FLORIDA, NY, CA, etc; typically when their home city is not well known), or their home coutry (JAPAN, ARGENTINA, CHINA, etc; typically when their home city and home state are not well known)'
                    },
                    status: { 
                        type: 'string', 
                        description: 'The artist\'s current status. Usually something like: active, defunct, hiatus, etc.' },
                    start: { type: 'string', format: 'date-time' },
                    end: { type: 'string', format: 'date-time' },
                    medium: {
                        type: 'string',
                        description: 'The type of artist. Usually something like: solo, duo, band, cover band, dj, collective, etc.'
                    },
                    genre: { type: 'array', items: { type: 'string' } },
                    notes: { type: 'string' },
                    links: {
                        type: 'object',
                        additionalProperties: { type: 'string', format: 'uri' },
                        description: 'A mapping of platform names (e.g., spotify, instagram) to their corresponding URLs'
                    },
                    artists: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/Artist'
                        },
                        description: 'Only present when the artist is a music collective / group / or other named association of artists. Each item is a nested artist (i.e., a member of the collective). Same shape as a normal artist, minus nesting.',

                    }
                }
                }
                ,
                User: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    username: { type: 'string' },
                    plus: { type: 'boolean' },
                    appAccountToken_apple: { type: 'string' }
                }
                }
            },
        },
    },
    apis: ['./src/index.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
export { swaggerSpec, swaggerUi };
