# React Todo App - Production Ready

A full-stack todo application with React frontend and Node.js/Express backend with MongoDB.

## Features

- ✅ Add, edit, and delete todos
- ✅ Real-time database synchronization
- ✅ Error handling and loading states
- ✅ Input validation
- ✅ Responsive design
- ✅ Environment variable configuration
- ✅ Production-ready code structure

## Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS 4
- Fetch API

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- CORS enabled

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd BackEnd
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todos
```

5. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd FrontEnd
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your backend URL:
```
VITE_API_URL=http://localhost:3000/api/todos
```

5. Start the frontend development server:
```bash
npm run dev
```

## API Endpoints

### Todos

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
  - Body: `{ "task": "Your task" }`
- `PUT /api/todos/:id` - Update a todo
  - Body: `{ "task": "Updated task" }`
- `DELETE /api/todos/:id` - Delete a todo

## Validation Rules

- Task is required
- Task must be less than 500 characters
- Task is automatically trimmed
- MongoDB ObjectId validation for ID parameters

## Error Handling

The application includes comprehensive error handling:

- **Frontend**: Loading states, error messages, disabled buttons during operations
- **Backend**: Input validation, MongoDB ObjectId validation, proper HTTP status codes

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend:
```bash
cd FrontEnd
npm run build
```

2. Deploy the `dist` folder to your hosting platform

3. Set environment variable `VITE_API_URL` to your production backend URL

### Backend Deployment (Render/Heroku)

1. Set environment variables in your hosting platform:
   - `PORT` (usually provided by platform)
   - `MONGODB_URI` (your production MongoDB connection string)

2. Deploy the backend code

3. Update frontend `VITE_API_URL` to point to production backend

## Project Structure

```
React-Todo/
├── FrontEnd/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── connection.js    # API calls
│   │   ├── App.jsx              # Main component
│   │   └── main.jsx             # Entry point
│   ├── .env                     # Environment variables (local)
│   ├── .env.example             # Environment template
│   └── package.json
├── BackEnd/
│   ├── Controllers/
│   │   └── todosController.js   # Business logic
│   ├── Routers/
│   │   └── todos.js             # API routes
│   ├── models/
│   │   └── todosModel.js        # MongoDB schema
│   ├── app.js                   # Express app setup
│   ├── .env                     # Environment variables (local)
│   ├── .env.example             # Environment template
│   └── package.json
└── README.md
```

## Security Considerations

- Environment variables for sensitive data
- CORS enabled for cross-origin requests
- Input validation on both frontend and backend
- MongoDB ObjectId validation
- Error messages don't expose sensitive information

## Development

### Adding New Features

1. **Backend**: Add route in `Routers/todos.js`, implement logic in `Controllers/todosController.js`
2. **Frontend**: Add API function in `services/connection.js`, use in `App.jsx`

### Code Style

- Use async/await for asynchronous operations
- Implement proper error handling with try-catch
- Validate inputs before processing
- Use environment variables for configuration

## License

MIT
