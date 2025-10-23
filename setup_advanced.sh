#!/bin/bash

# Fastify Learning Project Initializer
# Creates a structured Fastify learning environment in current directory

set -e # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${MAGENTA}$1${NC}"
}

# Check if yarn is installed
check_yarn() {
    if ! command -v yarn &> /dev/null; then
        print_error "Yarn is not installed. Please install Yarn first: npm install -g yarn"
        exit 1
    fi
    print_success "Yarn is installed"
}

# Check if directory is empty or confirm overwrite
check_directory() {
    if [ "$(ls -A .)" ]; then
        print_warning "Current directory is not empty!"
        read -p "Do you want to continue? This will create files here (y/N): " confirm
        if [[ ! $confirm =~ ^[Yy]$ ]]; then
            print_error "Initialization cancelled"
            exit 1
        fi
    fi
}

# Ask for project configuration
get_project_config() {
    echo ""
    print_header "╔══════════════════════════════════════════╗"
    print_header "║   Fastify Learning Project Setup         ║"
    print_header "╚══════════════════════════════════════════╝"
    echo ""

    read -p "Project name (default: fastify-learning): " PROJECT_NAME
    PROJECT_NAME=${PROJECT_NAME:-fastify-learning}

    echo ""
    echo "Choose your setup:"
    echo "  1) JavaScript (ES Modules) - Recommended for beginners"
    echo "  2) TypeScript - Better type safety"
    read -p "Enter choice (1 or 2, default: 1): " LANG_CHOICE
    LANG_CHOICE=${LANG_CHOICE:-1}

    if [ "$LANG_CHOICE" == "2" ]; then
        USE_TYPESCRIPT=true
        FILE_EXT="ts"
        print_status "Using TypeScript"
    else
        USE_TYPESCRIPT=false
        FILE_EXT="js"
        print_status "Using JavaScript (ES Modules)"
    fi

    echo ""
    read -p "Include advanced features? (GraphQL, WebSocket, Redis) (y/N): " ADVANCED
    if [[ $ADVANCED =~ ^[Yy]$ ]]; then
        INCLUDE_ADVANCED=true
        print_status "Including advanced features"
    else
        INCLUDE_ADVANCED=false
        print_status "Basic setup only"
    fi
}

# Create project structure
create_project_structure() {
    print_status "Creating project structure..."

    # Create directory structure
    mkdir -p src/{routes,plugins,services,controllers,models,schemas,utils,config,middleware}
    mkdir -p tests/{unit,integration,fixtures}
    mkdir -p public/{css,js,images}
    mkdir -p logs
    mkdir -p docs

    print_success "Directory structure created"
}

# Initialize package.json and install dependencies
setup_dependencies() {
    print_status "Initializing project and installing dependencies..."

    # Initialize package.json
    if [ "$USE_TYPESCRIPT" = true ]; then
        cat > package.json << EOF
{
  "name": "$PROJECT_NAME",
  "version": "1.0.0",
  "description": "Fastify Learning Project",
  "main": "src/app.ts",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "start": "node --loader tsx src/app.ts",
    "build": "tsc",
    "start:prod": "node dist/app.js",
    "test": "node --loader tsx --test tests/**/*.test.ts",
    "test:watch": "node --loader tsx --test --watch tests/**/*.test.ts",
    "lint": "eslint src/ tests/",
    "lint:fix": "eslint src/ tests/ --fix",
    "format": "prettier --write \"src/**/*.ts\" \"tests/**/*.ts\""
  },
  "keywords": ["fastify", "learning", "api", "typescript"],
  "author": "",
  "license": "MIT"
}
EOF
    else
        cat > package.json << EOF
{
  "name": "$PROJECT_NAME",
  "version": "1.0.0",
  "description": "Fastify Learning Project",
  "main": "src/app.js",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/app.js",
    "start": "node src/app.js",
    "test": "node --test tests/**/*.test.js",
    "test:watch": "node --test --watch tests/**/*.test.js",
    "lint": "eslint src/ tests/",
    "lint:fix": "eslint src/ tests/ --fix",
    "format": "prettier --write \"src/**/*.js\" \"tests/**/*.js\""
  },
  "keywords": ["fastify", "learning", "api", "javascript"],
  "author": "",
  "license": "MIT"
}
EOF
    fi

    # Install core dependencies
    print_status "Installing core Fastify dependencies..."
    yarn add fastify \
        @fastify/autoload \
        @fastify/sensible \
        @fastify/cors \
        @fastify/helmet \
        @fastify/rate-limit \
        @fastify/jwt \
        @fastify/cookie \
        @fastify/multipart \
        @fastify/static \
        @fastify/formbody \
        @fastify/env \
        @fastify/under-pressure \
        pino \
        pino-pretty \
        dotenv

    # Install database plugins
    print_status "Installing database plugins..."
    yarn add @fastify/postgres @fastify/mongodb @fastify/redis

    # Install validation
    if [ "$USE_TYPESCRIPT" = true ]; then
        yarn add @fastify/type-provider-typebox @sinclair/typebox
    fi

    # Install advanced features if requested
    if [ "$INCLUDE_ADVANCED" = true ]; then
        print_status "Installing advanced features..."
        yarn add mercurius @fastify/websocket graphql ws
    fi

    # Install development dependencies
    print_status "Installing dev dependencies..."
    if [ "$USE_TYPESCRIPT" = true ]; then
        yarn add -D typescript \
            @types/node \
            @types/ws \
            tsx \
            @typescript-eslint/parser \
            @typescript-eslint/eslint-plugin \
            eslint \
            prettier
    else
        yarn add -D nodemon \
            eslint \
            prettier
    fi

    print_success "Dependencies installed successfully"
}

# Create configuration files
create_config_files() {
    print_status "Creating configuration files..."

    # TypeScript config
    if [ "$USE_TYPESCRIPT" = true ]; then
        cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
EOF
    fi

    # ESLint config
    if [ "$USE_TYPESCRIPT" = true ]; then
        cat > .eslintrc.json << 'EOF'
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
  "env": {
    "node": true,
    "es2022": true
  }
}
EOF
    else
        cat > .eslintrc.json << 'EOF'
{
  "env": {
    "es2022": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": ["warn"],
    "no-console": "off"
  }
}
EOF
    fi

    # Prettier config
    cat > .prettierrc << 'EOF'
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "arrowParens": "always"
}
EOF

    # Environment files
    cat > .env.example << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/fastify_learning
MONGODB_URL=mongodb://localhost:27017/fastify_learning
REDIS_URL=redis://localhost:6379

# API Configuration
API_PREFIX=/api/v1
RATE_LIMIT_MAX=100
RATE_LIMIT_TIMEWINDOW=60000

# Logging
LOG_LEVEL=info
EOF

    cp .env.example .env

    # Git ignore
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Build output
dist/
build/
*.tsbuildinfo

# Environment
.env
.env.local
.env.*.local

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Testing
coverage/
.nyc_output/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary
tmp/
temp/
EOF

    # Nodemon config (for JS)
    if [ "$USE_TYPESCRIPT" = false ]; then
        cat > nodemon.json << 'EOF'
{
  "watch": ["src"],
  "ext": "js,json",
  "ignore": ["tests/**/*.test.js"],
  "exec": "node src/app.js"
}
EOF
    fi

    print_success "Configuration files created"
}

# Create source files for JavaScript
create_js_files() {
    print_status "Creating JavaScript source files..."

    # Main app file
    cat > src/app.js << 'EOF'
import Fastify from 'fastify';
import autoload from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function buildApp(options = {}) {
  const app = Fastify({
    ...options,
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  });

  // Register security plugins
  app.register(import('@fastify/helmet'));
  app.register(import('@fastify/cors'), {
    origin: process.env.NODE_ENV === 'production' ? false : true,
  });

  // Register utility plugins
  app.register(import('@fastify/sensible'));
  app.register(import('@fastify/cookie'));
  app.register(import('@fastify/rate-limit'), {
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    timeWindow: parseInt(process.env.RATE_LIMIT_TIMEWINDOW) || 60000,
  });

  // Auto-load plugins
  app.register(autoload, {
    dir: join(__dirname, 'plugins'),
  });

  // Auto-load routes
  app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: process.env.API_PREFIX || '/api/v1' },
  });

  // Health check
  app.get('/health', async () => ({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }));

  // Root route
  app.get('/', async () => ({
    message: 'Welcome to Fastify Learning API!',
    version: '1.0.0',
    documentation: '/docs',
    health: '/health',
  }));

  return app;
}

// Start server if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  const app = buildApp();

  const start = async () => {
    try {
      const port = parseInt(process.env.PORT) || 3000;
      const host = process.env.HOST || '0.0.0.0';

      await app.listen({ port, host });

      console.log(`🚀 Server running on http://${host}:${port}`);
      console.log(`📚 API: http://${host}:${port}${process.env.API_PREFIX || '/api/v1'}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };

  start();
}
EOF

    # Sample plugin
    cat > src/plugins/database.js << 'EOF'
import fp from 'fastify-plugin';

async function databasePlugin(fastify, options) {
  // Mock database for learning purposes
  const mockDB = {
    users: new Map(),
    posts: new Map(),
  };

  // Decorate fastify instance with db
  fastify.decorate('db', mockDB);

  // Add helpful methods
  fastify.decorate('getUser', (id) => mockDB.users.get(id));
  fastify.decorate('createUser', (user) => {
    const id = Date.now();
    mockDB.users.set(id, { ...user, id });
    return mockDB.users.get(id);
  });

  fastify.log.info('Database plugin loaded');

  // Close connections on shutdown
  fastify.addHook('onClose', async (instance) => {
    instance.log.info('Database connections closed');
  });
}

export default fp(databasePlugin, {
  name: 'database-plugin',
});
EOF

    # Sample routes
    cat > src/routes/users.js << 'EOF'
export default async function userRoutes(fastify, options) {
  // GET all users
  fastify.get('/', {
    schema: {
      description: 'Get all users',
      tags: ['users'],
      response: {
        200: {
          type: 'object',
          properties: {
            users: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  name: { type: 'string' },
                  email: { type: 'string' },
                },
              },
            },
            total: { type: 'number' },
          },
        },
      },
    },
  }, async (request, reply) => {
    const users = Array.from(fastify.db.users.values());
    return { users, total: users.length };
  });

  // POST create user
  fastify.post('/', {
    schema: {
      description: 'Create a new user',
      tags: ['users'],
      body: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', minLength: 2, maxLength: 50 },
          email: { type: 'string', format: 'email' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            email: { type: 'string' },
            createdAt: { type: 'string' },
          },
        },
      },
    },
  }, async (request, reply) => {
    const { name, email } = request.body;

    const user = {
      id: Date.now(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    fastify.db.users.set(user.id, user);

    reply.code(201).send(user);
  });

  // GET user by ID
  fastify.get('/:id', {
    schema: {
      description: 'Get user by ID',
      tags: ['users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
    },
  }, async (request, reply) => {
    const id = parseInt(request.params.id);
    const user = fastify.getUser(id);

    if (!user) {
      return reply.notFound('User not found');
    }

    return user;
  });
}
EOF

    # Sample test
    cat > tests/integration/users.test.js << 'EOF'
import { test } from 'node:test';
import assert from 'node:assert';
import { buildApp } from '../../src/app.js';

test('GET /api/v1/users returns empty array initially', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/users',
  });

  assert.strictEqual(response.statusCode, 200);
  const payload = JSON.parse(response.payload);
  assert.strictEqual(payload.total, 0);
  assert.ok(Array.isArray(payload.users));
});

test('POST /api/v1/users creates a new user', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const newUser = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/users',
    payload: newUser,
  });

  assert.strictEqual(response.statusCode, 201);
  const payload = JSON.parse(response.payload);
  assert.strictEqual(payload.name, newUser.name);
  assert.strictEqual(payload.email, newUser.email);
  assert.ok(payload.id);
  assert.ok(payload.createdAt);
});
EOF
}

# Create source files for TypeScript
create_ts_files() {
    print_status "Creating TypeScript source files..."

    # Main app file
    cat > src/app.ts << 'EOF'
import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import autoload from '@fastify/autoload';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function buildApp(options: FastifyServerOptions = {}): FastifyInstance {
  const app = Fastify({
    ...options,
    logger: {
      level: process.env.LOG_LEVEL || 'info',
      transport:
        process.env.NODE_ENV === 'development'
          ? {
              target: 'pino-pretty',
              options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
              },
            }
          : undefined,
    },
  });

  // Register security plugins
  app.register(import('@fastify/helmet'));
  app.register(import('@fastify/cors'), {
    origin: process.env.NODE_ENV === 'production' ? false : true,
  });

  // Register utility plugins
  app.register(import('@fastify/sensible'));
  app.register(import('@fastify/cookie'));
  app.register(import('@fastify/rate-limit'), {
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    timeWindow: parseInt(process.env.RATE_LIMIT_TIMEWINDOW || '60000'),
  });

  // Auto-load plugins
  app.register(autoload, {
    dir: join(__dirname, 'plugins'),
  });

  // Auto-load routes
  app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: process.env.API_PREFIX || '/api/v1' },
  });

  // Health check
  app.get('/health', async () => ({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }));

  // Root route
  app.get('/', async () => ({
    message: 'Welcome to Fastify Learning API!',
    version: '1.0.0',
    documentation: '/docs',
    health: '/health',
  }));

  return app;
}

// Start server if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  const app = buildApp();

  const start = async () => {
    try {
      const port = parseInt(process.env.PORT || '3000');
      const host = process.env.HOST || '0.0.0.0';

      await app.listen({ port, host });

      console.log(`🚀 Server running on http://${host}:${port}`);
      console.log(`📚 API: http://${host}:${port}${process.env.API_PREFIX || '/api/v1'}`);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  };

  start();
}
EOF

    # Sample plugin with types
    cat > src/plugins/database.ts << 'EOF'
import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

interface Database {
  users: Map<number, User>;
  posts: Map<number, any>;
}

const databasePlugin: FastifyPluginAsync = async (fastify) => {
  const mockDB: Database = {
    users: new Map(),
    posts: new Map(),
  };

  fastify.decorate('db', mockDB);

  fastify.decorate('getUser', (id: number) => mockDB.users.get(id));

  fastify.decorate('createUser', (user: Omit<User, 'id'>) => {
    const id = Date.now();
    const newUser: User = { ...user, id };
    mockDB.users.set(id, newUser);
    return newUser;
  });

  fastify.log.info('Database plugin loaded');

  fastify.addHook('onClose', async (instance) => {
    instance.log.info('Database connections closed');
  });
};

export default fp(databasePlugin, {
  name: 'database-plugin',
});

// Type augmentation
declare module 'fastify' {
  interface FastifyInstance {
    db: Database;
    getUser: (id: number) => User | undefined;
    createUser: (user: Omit<User, 'id'>) => User;
  }
}
EOF

    # Sample routes with TypeBox
    cat > src/routes/users.ts << 'EOF'
import { FastifyPluginAsync } from 'fastify';
import { Type } from '@sinclair/typebox';

const UserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  createdAt: Type.Optional(Type.String()),
});

const userRoutes: FastifyPluginAsync = async (fastify) => {
  // GET all users
  fastify.get('/', {
    schema: {
      description: 'Get all users',
      tags: ['users'],
      response: {
        200: Type.Object({
          users: Type.Array(UserSchema),
          total: Type.Number(),
        }),
      },
    },
  }, async () => {
    const users = Array.from(fastify.db.users.values());
    return { users, total: users.length };
  });

  // POST create user
  fastify.post('/', {
    schema: {
      description: 'Create a new user',
      tags: ['users'],
      body: Type.Object({
        name: Type.String({ minLength: 2, maxLength: 50 }),
        email: Type.String({ format: 'email' }),
      }),
      response: {
        201: UserSchema,
      },
    },
  }, async (request, reply) => {
    const { name, email } = request.body;

    const user = fastify.createUser({
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    reply.code(201).send(user);
  });

  // GET user by ID
  fastify.get('/:id', {
    schema: {
      description: 'Get user by ID',
      tags: ['users'],
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: UserSchema,
        404: Type.Object({
          error: Type.String(),
        }),
      },
    },
  }, async (request, reply) => {
    const id = parseInt(request.params.id);
    const user = fastify.getUser(id);

    if (!user) {
      return reply.notFound('User not found');
    }

    return user;
  });
};

export default userRoutes;
EOF

    # Sample test
    cat > tests/integration/users.test.ts << 'EOF'
import { test } from 'node:test';
import assert from 'node:assert';
import { buildApp } from '../../src/app.js';

test('GET /api/v1/users returns empty array initially', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/api/v1/users',
  });

  assert.strictEqual(response.statusCode, 200);
  const payload = JSON.parse(response.payload);
  assert.strictEqual(payload.total, 0);
  assert.ok(Array.isArray(payload.users));
});

test('POST /api/v1/users creates a new user', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const newUser = {
    name: 'John Doe',
    email: 'john@example.com',
  };

  const response = await app.inject({
    method: 'POST',
    url: '/api/v1/users',
    payload: newUser,
  });

  assert.strictEqual(response.statusCode, 201);
  const payload = JSON.parse(response.payload);
  assert.strictEqual(payload.name, newUser.name);
  assert.strictEqual(payload.email, newUser.email);
  assert.ok(payload.id);
  assert.ok(payload.createdAt);
});
EOF
}

# Create README and documentation
create_documentation() {
    print_status "Creating documentation..."

    cat > README.md << 'EOF'
# Fastify Learning Project

A structured learning environment for mastering the Fastify web framework.

## 🚀 Quick Start

### Installation
Dependencies are already installed during setup.

### Development
Start the development server with auto-reload:

```bash
yarn dev
```

### Testing
Run tests:

```bash
yarn test          # Run all tests
yarn test:watch    # Watch mode
```

### Linting
```bash
yarn lint          # Check for issues
yarn lint:fix      # Fix issues automatically
yarn format        # Format code with Prettier
```

## 📁 Project Structure

```
.
├── src/
│   ├── routes/          # API route handlers
│   ├── plugins/         # Fastify plugins (reusable functionality)
│   ├── services/        # Business logic layer
│   ├── controllers/     # Request handling logic
│   ├── models/          # Data models
│   ├── schemas/         # JSON schemas for validation
│   ├── middleware/      # Custom middleware
│   ├── utils/           # Utility functions
│   ├── config/          # Configuration files
│   └── app.js/ts        # Main application entry
├── tests/
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   └── fixtures/        # Test data
├── public/              # Static files
├── logs/                # Application logs
├── docs/                # Additional documentation
└── .env                 # Environment variables
```

## 🔌 API Endpoints

### Health Check
- `GET /health` - Server health status

### Users API (Example)
- `GET /api/v1/users` - List all users
- `POST /api/v1/users` - Create a new user
- `GET /api/v1/users/:id` - Get user by ID

## 🛠️ Configuration

Edit `.env` file to configure:

```env
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

API_PREFIX=/api/v1
RATE_LIMIT_MAX=100
LOG_LEVEL=info
```

## 📚 Learning Path

This project is structured to follow the Fastify Learning Roadmap:

### Phase 1: Foundations
- ✅ Basic server setup
- ✅ Routing and request handling
- ✅ JSON Schema validation
- ✅ Plugin system basics

### Phase 2: Intermediate
- [ ] Advanced routing patterns
- [ ] Custom plugins development
- [ ] Hooks and lifecycle
- [ ] Error handling strategies

### Phase 3: Advanced
- [ ] Database integration
- [ ] Authentication & Authorization
- [ ] Testing strategies
- [ ] Performance optimization

### Phase 4: Production
- [ ] Security best practices
- [ ] Monitoring and logging
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🧪 Testing Examples

```javascript
import { test } from 'node:test';
import { buildApp } from '../src/app.js';

test('GET /health returns OK', async (t) => {
  const app = buildApp();
  t.after(() => app.close());

  const response = await app.inject({
    method: 'GET',
    url: '/health',
  });

  assert.strictEqual(response.statusCode, 200);
});
```

## 🔐 Security Features

- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Rate limiting
- ✅ Input validation with JSON Schema
- ✅ JWT authentication ready

## 📖 Resources

- [Fastify Documentation](https://fastify.dev)
- [Fastify Plugins](https://fastify.dev/ecosystem)
- [JSON Schema](https://json-schema.org)
- [TypeBox Documentation](https://github.com/sinclairzx81/typebox)

## 🤝 Contributing

This is a learning project. Feel free to experiment and modify!

## 📝 License

MIT
EOF

    # Create learning roadmap document
    cat > docs/ROADMAP.md << 'EOF'
# Fastify Learning Roadmap

This document outlines your journey to mastering Fastify.

## Phase 1: Foundations (Weeks 1-2)

### Week 1: Getting Started
- [ ] Understand Fastify's architecture
- [ ] Learn about the plugin system
- [ ] Master basic routing
- [ ] Practice request/response handling

**Exercises:**
1. Create a simple REST API with CRUD operations
2. Add input validation using JSON Schema
3. Implement error handling

### Week 2: Validation & Schemas
- [ ] Deep dive into JSON Schema
- [ ] Learn schema composition
- [ ] Understand request validation
- [ ] Master response serialization

**Exercises:**
1. Create complex validation schemas
2. Implement shared schemas
3. Add custom error messages

## Phase 2: Intermediate (Weeks 3-4)

### Week 3: Plugins Deep Dive
- [ ] Create custom plugins
- [ ] Understand encapsulation
- [ ] Use decorators effectively
- [ ] Master plugin dependencies

**Exercises:**
1. Build a logging plugin
2. Create a database connection plugin
3. Implement a caching plugin

### Week 4: Hooks & Lifecycle
- [ ] Learn all hook types
- [ ] Understand request lifecycle
- [ ] Implement middleware patterns
- [ ] Master async hooks

**Exercises:**
1. Create authentication hooks
2. Implement request logging
3. Add performance monitoring

## Phase 3: Advanced (Weeks 5-8)

### Week 5-6: Database Integration
- [ ] PostgreSQL with Fastify
- [ ] MongoDB integration
- [ ] Redis for caching
- [ ] Transaction handling

**Exercises:**
1. Build a complete data layer
2. Implement connection pooling
3. Add query optimization

### Week 7-8: Authentication & Security
- [ ] JWT authentication
- [ ] OAuth2 integration
- [ ] Role-based access control
- [ ] API key management

**Exercises:**
1. Implement user registration/login
2. Add refresh token mechanism
3. Create protected routes

## Phase 4: Production Ready (Weeks 9-12)

### Week 9-10: Testing & Quality
- [ ] Unit testing strategies
- [ ] Integration testing
- [ ] Load testing
- [ ] Code coverage

**Exercises:**
1. Write comprehensive test suites
2. Perform load testing
3. Achieve 80%+ coverage

### Week 11-12: Deployment & DevOps
- [ ] Docker containerization
- [ ] Environment management
- [ ] Monitoring and logging
- [ ] CI/CD pipelines

**Exercises:**
1. Dockerize the application
2. Set up automated deployments
3. Configure monitoring

## Projects to Build

### Beginner Projects
1. **Todo API** - Basic CRUD with authentication
2. **URL Shortener** - Redis, redirects, analytics
3. **Blog API** - Posts, comments, users

### Intermediate Projects
1. **E-commerce Backend** - Products, orders, payments
2. **Chat Application** - WebSockets, real-time messaging
3. **File Upload Service** - Multipart, streaming, S3

### Advanced Projects
1. **Microservices Architecture** - Multiple services, API gateway
2. **GraphQL API** - Complex queries, subscriptions
3. **Real-time Dashboard** - WebSockets, data streaming

## Resources by Phase

### Phase 1
- Official Fastify docs (Getting Started)
- JSON Schema tutorial
- Node.js async/await patterns

### Phase 2
- Fastify plugin development guide
- Hook documentation
- Error handling best practices

### Phase 3
- Database integration guides
- Security best practices
- Testing documentation

### Phase 4
- Docker documentation
- DevOps best practices
- Performance optimization guides
EOF

    # Create quick reference
    cat > docs/QUICK_REFERENCE.md << 'EOF'
# Fastify Quick Reference

## Common Patterns

### Basic Route
```javascript
fastify.get('/path', async (request, reply) => {
  return { message: 'Hello' };
});
```

### Route with Validation
```javascript
fastify.post('/users', {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' }
      }
    }
  }
}, async (request, reply) => {
  const { name, email } = request.body;
  // Handle request
});
```

### Creating a Plugin
```javascript
import fp from 'fastify-plugin';

async function myPlugin(fastify, options) {
  fastify.decorate('myUtility', () => {
    // Your utility function
  });
}

export default fp(myPlugin, {
  name: 'my-plugin'
});
```

### Using Hooks
```javascript
// Request hook
fastify.addHook('onRequest', async (request, reply) => {
  // Runs before route handler
});

// Response hook
fastify.addHook('onResponse', async (request, reply) => {
  // Runs after response sent
});
```

### Error Handling
```javascript
fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ error: 'Something went wrong' });
});
```

### Async/Await Pattern
```javascript
fastify.get('/data', async (request, reply) => {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    reply.code(500).send({ error: error.message });
  }
});
```

## Common Schemas

### Pagination
```javascript
{
  querystring: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1, default: 1 },
      limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 }
    }
  }
}
```

### ID Parameter
```javascript
{
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    },
    required: ['id']
  }
}
```

## Useful Commands

```bash
# Development
yarn dev              # Start dev server with auto-reload
yarn start            # Start production server

# Testing
yarn test             # Run all tests
yarn test:watch       # Run tests in watch mode

# Code Quality
yarn lint             # Check for linting errors
yarn lint:fix         # Fix linting errors
yarn format           # Format code with Prettier

# Build (TypeScript)
yarn build            # Compile TypeScript
```

## Environment Variables

```env
NODE_ENV=development|production
PORT=3000
HOST=0.0.0.0
LOG_LEVEL=debug|info|warn|error
API_PREFIX=/api/v1
```

## Debugging

### Enable Debug Logging
```bash
LOG_LEVEL=debug yarn dev
```

### Using Node Inspector
```bash
node --inspect src/app.js
```

### Request Logging
```javascript
fastify.addHook('onRequest', (request, reply, done) => {
  console.log(`${request.method} ${request.url}`);
  done();
});
```
EOF

    print_success "Documentation created"
}

# Create additional helpful files
create_helper_files() {
    print_status "Creating helper files..."

    # Create a sample HTML page
    cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fastify Learning Project</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 800px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 { color: #667eea; margin-bottom: 10px; }
        .subtitle { color: #666; margin-bottom: 30px; }
        .section { margin: 20px 0; }
        .section h2 { color: #333; margin-bottom: 15px; font-size: 1.3em; }
        .endpoint {
            background: #f8f9fa;
            padding: 12px;
            margin: 8px 0;
            border-radius: 8px;
            font-family: 'Courier New', monospace;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .method {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 5px;
            font-weight: bold;
            font-size: 0.85em;
            color: white;
        }
        .get { background: #61affe; }
        .post { background: #49cc90; }
        .put { background: #fca130; }
        .delete { background: #f93e3e; }
        .feature {
            background: #e7f3ff;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .link {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        .link:hover { text-decoration: underline; }
        .status {
            display: inline-block;
            background: #49cc90;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="status">✓ Server Running</div>
        <h1>🚀 Fastify Learning Project</h1>
        <p class="subtitle">Your development server is ready!</p>

        <div class="section">
            <h2>📍 Available Endpoints</h2>

            <div class="endpoint">
                <span class="method get">GET</span>
                <span>/health</span>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span>
                <span>/api/v1/users</span>
            </div>

            <div class="endpoint">
                <span class="method post">POST</span>
                <span>/api/v1/users</span>
            </div>

            <div class="endpoint">
                <span class="method get">GET</span>
                <span>/api/v1/users/:id</span>
            </div>
        </div>

        <div class="section">
            <h2>✨ Features Included</h2>

            <div class="feature">
                <strong>🔒 Security:</strong> CORS, Helmet, Rate Limiting
            </div>

            <div class="feature">
                <strong>✅ Validation:</strong> JSON Schema with TypeBox
            </div>

            <div class="feature">
                <strong>🔌 Plugins:</strong> Auto-load, Database mock, Custom decorators
            </div>

            <div class="feature">
                <strong>🧪 Testing:</strong> Integration tests with Node.js test runner
            </div>
        </div>

        <div class="section">
            <h2>📚 Next Steps</h2>
            <ol style="line-height: 2; color: #555;">
                <li>Check out <code>src/routes/users.js</code> for route examples</li>
                <li>Explore <code>src/plugins/database.js</code> for plugin patterns</li>
                <li>Run <code>yarn test</code> to see tests in action</li>
                <li>Read <code>docs/ROADMAP.md</code> for your learning path</li>
            </ol>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee; text-align: center; color: #666;">
            <p>Happy coding! 🎉</p>
            <p style="margin-top: 10px;">
                <a href="https://fastify.dev" class="link" target="_blank">Fastify Docs</a> |
                <a href="/docs" class="link">API Docs</a> |
                <a href="https://github.com" class="link" target="_blank">GitHub</a>
            </p>
        </div>
    </div>
</body>
</html>
EOF

    # Create VS Code settings (optional but helpful)
    mkdir -p .vscode
    cat > .vscode/settings.json << 'EOF'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  }
}
EOF

    cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next"
  ]
}
EOF

    print_success "Helper files created"
}

# Main execution
main() {
    clear
    print_header "╔════════════════════════════════════════════════╗"
    print_header "║                                                ║"
    print_header "║     FASTIFY LEARNING PROJECT INITIALIZER       ║"
    print_header "║                                                ║"
    print_header "╚════════════════════════════════════════════════╝"
    echo ""

    # Run checks
    check_yarn
    check_directory

    # Get configuration
    get_project_config

    echo ""
    print_header "═══════════════════════════════════════════════════"
    print_status "Starting project initialization..."
    print_header "═══════════════════════════════════════════════════"
    echo ""

    # Create project
    create_project_structure
    setup_dependencies
    create_config_files

    # Create source files based on language choice
    if [ "$USE_TYPESCRIPT" = true ]; then
        create_ts_files

        # Add missing dependency for TypeScript
        print_status "Installing fastify-plugin for TypeScript..."
        yarn add fastify-plugin
    else
        create_js_files

        # Add missing dependency for JavaScript
        print_status "Installing fastify-plugin..."
        yarn add fastify-plugin
    fi

    create_documentation
    create_helper_files

    echo ""
    print_header "═══════════════════════════════════════════════════"
    print_success "✨ Project initialized successfully!"
    print_header "═══════════════════════════════════════════════════"
    echo ""

    # Final instructions
    print_header "📋 Project Summary:"
    echo ""
    echo "  Name: $PROJECT_NAME"
    echo "  Language: $([ "$USE_TYPESCRIPT" = true ] && echo "TypeScript" || echo "JavaScript")"
    echo "  Advanced Features: $([ "$INCLUDE_ADVANCED" = true ] && echo "Yes" || echo "No")"
    echo ""

    print_header "🎯 Next Steps:"
    echo ""
    echo "  1. Review your .env file and update settings"
    echo "  2. Start development server:"
    echo "     ${CYAN}yarn dev${NC}"
    echo ""
    echo "  3. Open your browser:"
    echo "     ${CYAN}http://localhost:3000${NC}"
    echo ""
    echo "  4. Run tests:"
    echo "     ${CYAN}yarn test${NC}"
    echo ""
    echo "  5. Check documentation:"
    echo "     - ${CYAN}README.md${NC} - Project overview"
    echo "     - ${CYAN}docs/ROADMAP.md${NC} - Learning path"
    echo "     - ${CYAN}docs/QUICK_REFERENCE.md${NC} - Code snippets"
    echo ""

    print_header "📚 Learning Resources:"
    echo ""
    echo "  • Fastify Docs: https://fastify.dev"
    echo "  • Plugin Ecosystem: https://fastify.dev/ecosystem"
    echo "  • JSON Schema: https://json-schema.org"
    echo ""

    print_success "Happy coding! 🚀"
    echo ""
}

# Run the main function
main