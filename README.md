# AI Code Challenge

## Project Setup

### Prerequisites

- Node.js (v18.x)
- Docker

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/ai-code-challenge.git
   cd ai-code-challenge
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

- The application features a login screen where users can enter their email and password.
- Upon successful authentication, users will be welcomed on the main page.
- The application uses NextAuth for session management and authentication.

## Docker

To build and run the application in a Docker container, use the following commands:

1. **Build the Docker image:**
   ```
   docker build -t my-nextjs-app .
   ```

2. **Run the Docker container:**
   ```
   docker run -p 3000:3000 my-nextjs-app
   ```

Now you can access the application at `http://localhost:3000` in your browser.