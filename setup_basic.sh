#!/bin/bash

# Fastify Learning Project Initializer
# Enhanced version based on user's excellent script

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_message() {
    echo -e "${2}${1}${NC}"
}

print_step() {
    echo -e "\n${CYAN}▶ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

print_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

# Check if yarn is installed
check_dependencies() {
    if ! command -v yarn &> /dev/null; then
        print_error "Yarn is not installed. Please install it first: npm install -g yarn"
        exit 1
    fi

    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first"
        exit 1
    fi
}

# Display welcome message
show_welcome() {
    echo ""
    print_message "🚀 Fastify Learning Project Initializer" "$CYAN"
    echo "=========================================="
    print_message "This script will set up a complete Fastify learning environment" "$BLUE"
    print_message "following the Fastify Learning Roadmap structure" "$BLUE"
    echo ""
}

# Get project configuration
get_config() {
    # Use current directory name as project name if in a git repo
    CURRENT_DIR=$(basename "$(pwd)")

    read -p "Enter project name (default: $CURRENT_DIR): " PROJECT_NAME
    PROJECT_NAME=${PROJECT_NAME:-$CURRENT_DIR}

    # Remove spaces and special characters
    PROJECT_NAME=$(echo "$PROJECT_NAME" | tr -d '[:space:]' | tr -c '[:alnum:]-' '_')

    read -p "Use TypeScript? (y/N, default: No): " USE_TYPESCRIPT
    USE_TYPESCRIPT=${USE_TYPESCRIPT:-n}

    read -p "Add database dependencies? (y/N, default: No): " ADD_DATABASE
    ADD_DATABASE=${ADD_DATABASE:-n}

    read -p "Add testing setup? (y/N, default: Yes): " ADD_TESTING
    ADD_TESTING=${ADD_TESTING:-y}
}

# Initialize package.json
setup_package_json() {
    print_step "Initializing package.json..."

    if [[ "$USE_TYPESCRIPT" =~ ^[Yy]$ ]]; then
        cat > package.json << EOF
{
  "name": "$PROJECT_NAME",
  "version": "1.0.0",
  "description": "Fastify Learning Project",
  "type": "module",
  "scripts": {
    "dev": "nodemon --exec node --loader ts-node/esm src/server.ts",
    "start": "node dist/server.js",
    "build": "tsc",
    "test": "node --test",
    "test:watch": "node --test --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "keywords": ["fastify", "learning", "api"],
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
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "node --test",
    "test:watch": "node --test --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "keywords": ["fastify", "api"],
  "author": "",
  "license": "MIT"
}
EOF
    fi

    print_success "package.json created"
}

# Install dependencies
install_dependencies() {
    print_step "Installing dependencies..."

    # Core Fastify dependencies
    print_message "Installing core dependencies..." "$BLUE"
    yarn add fastify \
        @fastify/cors \
        @fastify/helmet \
        @fastify/rate-limit \
        @fastify/jwt \
        @fastify/cookie \
        @fastify/multipart \
        @fastify/static \
        @fastify/formbody \
        @fastify/sensible \
        @fastify/autoload \
        pino \
        pino-pretty \
        dotenv

    # TypeScript dependencies if selected
    if [[ "$USE_TYPESCRIPT" =~ ^[Yy]$ ]]; then
        print_message "Installing TypeScript dependencies..." "$BLUE"
        yarn add -D typescript \
            ts-node \
            @types/node \
            @typescript-eslint/parser \
            @typescript-eslint/eslint-plugin
    fi

    # Database dependencies if selected
    if [[ "$ADD_DATABASE" =~ ^[Yy]$ ]]; then
        print_message "Installing database dependencies..." "$BLUE"
        yarn add @fastify/postgres \
            @fastify/mongodb \
            @fastify/redis
    fi

    # Development dependencies
    print_message "Installing dev dependencies..." "$BLUE"
    yarn add -D nodemon \
        eslint \
        prettier

    print_success "Dependencies installed"
}

# Create project structure
create_project_structure() {
    print_step "Creating project structure..."

    # Create main directories
    mkdir -p src/{routes,plugins,schemas,utils,config,services,controllers}
    mkdir -p tests/{unit,integration}
    mkdir -p public/{css,js,images}
    mkdir -p docs/{phases,examples}
    mkdir -p logs

    print_success "Directory structure created"
}

# Create configuration files
create_config_files() {
    print_step "Creating configuration files..."

    # Environment files
    cat > .env << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=3000
HOST=0.0.0.0

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
# DB_URL=postgresql://user:password@localhost:5432/fastify_learning
# MONGO_URL=mongodb://localhost:27017/fastify_learning
# REDIS_URL=redis://localhost:6379

# API Configuration
API_PREFIX=/api/v1
RATE_LIMIT_MAX=100
RATE_LIMIT_TIMEWINDOW=60000

# Logging
LOG_LEVEL=info
EOF

    cp .env .env.example

    # ESLint configuration
    if [[ "$USE_TYPESCRIPT" =~ ^[Yy]$ ]]; then
        cat > .eslintrc.json << 'EOF'
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": "off"
  }
}
EOF
    else
        cat > .eslintrc.json << 'EOF'
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "latest",
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

    # TypeScript configuration if selected
    if [[ "$USE_TYPESCRIPT" =~ ^[Yy]$ ]]; then
        cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
EOF
    fi

    # Prettier configuration
    cat > .prettierrc << 'EOF'
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
EOF

    # Nodemon configuration
    cat > nodemon.json << 'EOF'
{
  "watch": ["src"],
  "ext": "js,ts,json",
  "ignore": ["src/**/*.test.*"],
  "exec": "node --loader ts-node/esm src/server.ts"
}
EOF

    # Git ignore
    cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Production
dist/
build/

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
pids
*.pid
*.seed
*.pid.lock

# Coverage
coverage/
.nyc_output

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Temporary
tmp/
temp/
EOF

    print_success "Configuration files created"
}

# Create source files
create_source_files() {
    print_step "Creating source files..."

    if [[ "$USE_TYPESCRIPT" =~ ^[Yy]$ ]]; then
        create_typescript_files
    else
        create_javascript_files
    fi

    print_success "Source files created"
}

create_javascript_files() {
    # Main server file (JavaScript)
    cat > src/server.js << 'EOF'
import Fastify from 'fastify';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

// Plugins
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import autoload from '@fastify/autoload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Fastify instance
const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV === 'development' ? {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    } : undefined,
  },
});

// Register plugins
async function registerPlugins() {
  // Security and utility plugins
  await fastify.register(cors, {
    origin: process.env.NODE_ENV === 'production' ? false : true,
  });

  await fastify.register(helmet);

  await fastify.register(rateLimit, {
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    timeWindow: parseInt(process.env.RATE_LIMIT_TIMEWINDOW) || 60000,
  });

  await fastify.register(sensible);

  // Auto-load plugins
  await fastify.register(autoload, {
    dir: join(__dirname, 'plugins'),
    options: { prefix: '/api' }
  });

  // Auto-load routes
  await fastify.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: process.env.API_PREFIX || '/api/v1' }
  });
}

// Default routes
fastify.get('/', async () => {
  return {
    message: 'Welcome to Fastify Learning API!',
    documentation: '/docs',
    health: '/health',
    timestamp: new Date().toISOString()
  };
});

fastify.get('/health', async () => {
  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  };
});

// Start server
const start = async () => {
  try {
    await registerPlugins();

    const host = process.env.HOST || '0.0.0.0';
    const port = parseInt(process.env.PORT) || 3000;

    await fastify.listen({ host, port });

    console.log(`🚀 Server running on http://${host}:${port}`);
    console.log(`📚 API: http://${host}:${port}${process.env.API_PREFIX || '/api/v1'}`);

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Graceful shutdown
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    fastify.log.info(`Received ${signal}, shutting down gracefully...`);
    await fastify.close();
    process.exit(0);
  });
});

start();
EOF

    # Example plugin
    cat > src/plugins/database.js << 'EOF'
// Example database plugin
export default async function databasePlugin(fastify, options) {
  // Mock database for learning
  const db = {
    users: new Map(),
    posts: new Map(),
    counters: new Map([['users', 0], ['posts', 0]])
  };

  // Decorate fastify with db instance
  fastify.decorate('db', db);

  fastify.log.info('Database plugin registered');
}
EOF

    # Example route
    cat > src/routes/examples.js << 'EOF'
// Example routes with validation
export default async function exampleRoutes(fastify, options) {

  // GET /api/v1/examples
  fastify.get('/examples', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          limit: { type: 'integer', default: 10, minimum: 1, maximum: 100 },
          offset: { type: 'integer', default: 0, minimum: 0 }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            data: { type: 'array' },
            total: { type: 'integer' },
            limit: { type: 'integer' },
            offset: { type: 'integer' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { limit, offset } = request.query;

    // Simulate database query
    const examples = Array.from({ length: Math.min(limit, 5) }, (_, i) => ({
      id: offset + i + 1,
      name: `Example ${offset + i + 1}`,
      description: `This is example item ${offset + i + 1}`,
      createdAt: new Date().toISOString()
    }));

    return {
      data: examples,
      total: examples.length,
      limit,
      offset
    };
  });

  // POST /api/v1/examples
  fastify.post('/examples', {
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 100
          },
          description: {
            type: 'string',
            maxLength: 500
          }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            createdAt: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { name, description } = request.body;

    // Simulate creating in database
    const example = {
      id: Date.now(),
      name,
      description: description || '',
      createdAt: new Date().toISOString()
    };

    reply.code(201);
    return example;
  });

  // GET /api/v1/examples/:id
  fastify.get('/examples/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'integer' }
        },
        required: ['id']
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;

    // Simulate database lookup
    const example = {
      id,
      name: `Example ${id}`,
      description: `This is example item ${id}`,
      createdAt: new Date().toISOString()
    };

    return example;
  });
}
EOF
}

create_typescript_files() {
    # TypeScript server file would go here
    # (Similar structure but with TypeScript syntax and types)
    cat > src/server.ts << 'EOF'
// TypeScript version would be similar but with types
// Placeholder for TypeScript implementation
import Fastify from 'fastify';

const fastify = Fastify({
  logger: true
});

fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
EOF
}

# Create documentation
create_documentation() {
    print_step "Creating documentation..."

    # Main README
    cat > README.md << EOF
# $PROJECT_NAME - Fastify Learning Project

This project follows the Fastify Learning Roadmap to master Fastify web framework.

## Project Structure

\`\`\`
src/
├── server.js         # Main application file
├── routes/           # API routes
├── plugins/          # Fastify plugins
├── services/         # Business logic
├── controllers/      # Route controllers
├── schemas/          # JSON schemas for validation
└── utils/            # Utility functions
\`\`\`

## Getting Started

1. Install dependencies:
   \`\`\`bash
   yarn install
   \`\`\`

2. Start development server:
   \`\`\`bash
   yarn dev
   \`\`\`

3. Run tests:
   \`\`\`bash
   yarn test
   \`\`\`

## Available Scripts

- \`yarn dev\` - Start development server with hot reload
- \`yarn start\` - Start production server
- \`yarn test\` - Run tests
- \`yarn test:watch\` - Run tests in watch mode
- \`yarn lint\` - Run ESLint
- \`yarn lint:fix\` - Fix ESLint issues

## Learning Path

Follow the phases in the Fastify Learning Roadmap:

1. **Foundations** (Week 1-2) - Basic setup, routing, plugins
2. **Intermediate Concepts** (Week 3-4) - Validation, authentication
3. **Advanced Features** (Week 5-6) - Hooks, error handling, logging
4. **Database & Authentication** (Week 7-8) - Database integration, auth
5. **Production-Ready Features** (Week 9-10) - Testing, security, optimization
6. **Advanced Patterns** (Week 11-12) - Microservices, GraphQL, WebSockets
7. **Deployment & DevOps** (Week 13-14) - Deployment, monitoring, CI/CD

## Quick Start

1. Update \`.env\` file with your configuration
2. Run \`yarn dev\` to start the development server
3. Visit http://localhost:3000 to see the API root
4. Check http://localhost:3000/health for health status
5. Explore \`src/routes/examples.js\` for route examples

## API Endpoints

- \`GET /\` - API information
- \`GET /health\` - Health check
- \`GET /api/v1/examples\` - List examples
- \`POST /api/v1/examples\` - Create example
- \`GET /api/v1/examples/:id\` - Get example by ID

Happy learning! 🎓
EOF

    # Learning roadmap reference
    cat > docs/learning-roadmap.md << 'EOF'
# Fastify Learning Roadmap

## Phase 1: Foundations (Week 1-2)
- [ ] Basic server setup
- [ ] Routing and request handling
- [ ] Plugin system basics
- [ ] Understanding the Fastify lifecycle

## Phase 2: Intermediate Concepts (Week 3-4)
- [ ] JSON Schema validation
- [ ] Request/response serialization
- [ ] Essential plugins (CORS, Helmet, etc.)
- [ ] Custom plugins and decorators

## Phase 3: Advanced Features (Week 5-6)
- [ ] Hooks and lifecycle events
- [ ] Error handling strategies
- [ ] Logging with Pino
- [ ] Performance optimization

## Phase 4: Database & Authentication (Week 7-8)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] JWT authentication
- [ ] Session management
- [ ] Password hashing and security

## Phase 5: Production-Ready Features (Week 9-10)
- [ ] Testing strategies
- [ ] Security best practices
- [ ] Performance monitoring
- [ ] Error tracking

## Phase 6: Advanced Patterns (Week 11-12)
- [ ] Microservices architecture
- [ ] WebSockets and real-time features
- [ ] GraphQL integration
- [ ] TypeScript with Fastify

## Phase 7: Deployment & DevOps (Week 13-14)
- [ ] Docker containerization
- [ ] Deployment strategies
- [ ] CI/CD pipelines
- [ ] Monitoring and observability
EOF

    print_success "Documentation created"
}

# Create test files
create_test_files() {
    if [[ "$ADD_TESTING" =~ ^[Yy]$ ]]; then
        print_step "Creating test files..."

        cat > tests/example.test.js << 'EOF'
import { test } from 'node:test';
import assert from 'node:assert';

// Basic test examples for Fastify learning
test('Math operations', async (t) => {
  await t.test('addition', () => {
    assert.strictEqual(1 + 1, 2);
  });

  await t.test('multiplication', () => {
    assert.strictEqual(2 * 3, 6);
  });
});

test('Async operations', async () => {
  const result = await Promise.resolve('fastify');
  assert.strictEqual(result, 'fastify');
});

test('Object properties', () => {
  const obj = { name: 'test', value: 42 };
  assert.strictEqual(obj.name, 'test');
  assert.strictEqual(obj.value, 42);
});
EOF

        print_success "Test files created"
    fi
}

# Final setup
final_setup() {
    print_step "Finalizing setup..."

    # Make scripts executable if any were added
    chmod +x package.json 2>/dev/null || true

    print_success "Setup complete!"
}

# Display completion message
show_completion() {
    echo ""
    print_message "🎉 Fastify Learning Project setup complete!" "$GREEN"
    echo "=========================================="
    echo ""

    print_message "📁 Project Location: $(pwd)" "$CYAN"
    echo ""

    print_message "🚀 Quick Start:" "$YELLOW"
    echo "  1. yarn dev              # Start development server"
    echo "  2. Visit http://localhost:3000"
    echo "  3. Check the /health endpoint"
    echo "  4. Explore src/routes/examples.js"
    echo ""

    print_message "📚 Learning Resources:" "$YELLOW"
    echo "  • Read README.md for project overview"
    echo "  • Check docs/learning-roadmap.md for learning path"
    echo "  • Explore the Fastify documentation: https://fastify.dev"
    echo ""

    print_message "🛠️  Available Commands:" "$BLUE"
    cat package.json | grep '"scripts"' -A 10 | grep -v '"scripts"' | sed 's/    "/  • yarn /' | sed 's/",*$//' | head -10
    echo ""

    print_message "💡 Next Steps:" "$GREEN"
    echo "  • Review and modify the .env file"
    echo "  • Follow the learning roadmap phases"
    echo "  • Start with Phase 1: Foundations"
    echo "  • Experiment with the example routes"
    echo ""

    print_message "Happy learning! 🎓" "$CYAN"
}

# Main execution flow
main() {
    show_welcome
    check_dependencies
    get_config
    setup_package_json
    install_dependencies
    create_project_structure
    create_config_files
    create_source_files
    create_documentation
    create_test_files
    final_setup
    show_completion
}

# Run the script
main "$@"