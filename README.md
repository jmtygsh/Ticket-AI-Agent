## AI-Powered Ticket Management System
A smart ticket management system that uses AI to automatically categorize, prioritize, and assign support tickets to the most appropriate moderators.

## 🚀 Features
- AI-Powered Ticket Processing
  - Endpoints for automatic ticket categorization
  - Smart priority assignment logic exposed via API
  - Skill-based moderator matching API
  - AI-generated helper notes available through API responses
- Smart Moderator Assignment
  - API for automatic ticket-to-moderator matching based on skills
  - Fallback endpoint to assign tickets to admins if no suitable moderator is found
  - Skill-based routing system available through API
- User Management
  - Role-based access control (User, Moderator, Admin) implemented at API level
  - Endpoints to manage moderator skills
  - Secure user authentication using JWT

## 🛠️ Tech Stack
- Backend: Node.js with Express
- Database: MongoDB
- Background Jobs: Inngest
- AI Integration: Google Gemini API
- Email: Nodemailer with Mailtrap
- Development: Nodemon for hot reloading

## 🧪 Testing
- Start the Inngest dev server
```
npm run inngest-dev
```

This will start the Inngest development server

- Test Ticket Creation
```
curl -X POST http://localhost:3000/api/tickets \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
  "title": "Database Connection Issue",
  "description": "Experiencing intermittent database connection timeouts"
}'

```


