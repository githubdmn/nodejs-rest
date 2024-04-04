# Project Name

## Installation

To install the project locally, follow these steps:

Clone the repository: git clone git@github.com:githubdmn/technical-assignment-nodejs.git
Navigate to the project directory: cd technical-assignment-nodejs
Install backend dependencies yarn install
Configure environment variables: Create a .env file in the backend directory and add necessary environment variables (see `env` for reference)

Start the backend server without build: yarn run dev

Build the backend server: yarn run build
Start the backend server BUILT: yarn run start

To start a database (after setting up .env file)
`$(sudo) docker-compose -f ./mongodb.yaml up -d`

To start an entire app (after setting up .env file)
`$(sudo) docker-compose up -d`
