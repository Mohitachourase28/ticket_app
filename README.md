# ticket_app
# React Support Ticket System with Firebase Authentication & Firestore

A role-based support ticket management web application built with React and Firebase.  
Supports two user roles with different permissions: Customers and Support Agents.

---

## Features

### User Roles
- **Customer**
  - Can raise new tickets via a modal form.
  - Can view and delete only their own tickets.
- **Support Agent**
  - Can view all tickets in the system.
  - Can update ticket status and assign tickets to agents.
  - Cannot delete tickets.

### Authentication
- Firebase Authentication integration for secure login.
- Two predefined users for demo/testing:
  - Customer: `customer@support.com` / `customer123`
  - Agent: `agent@support.com` / `agent123`

### Ticket Management
- **Support Dashboard** shows tickets with columns:  
  Ticket ID | Title | Description | Priority | Status | Created By | Assigned To | Actions
- Actions include:
  - **View** ticket details
  - **Edit** ticket status/assignment (agent only)
  - **Delete** ticket (customer only for their own tickets)

### Ticket Submission Form
- Over 12 input fields including text, dropdown, date picker, checkbox, radio buttons, and file upload.
- Fields include: Title, Description, Priority, Category, Attachment, Contact Email, Phone, and more.
- Includes robust form validations.
- Tickets saved securely in Firestore.

### Role-Based Access & Navigation
- Sidebar navigation adapts by role:
  - **Tickets** page for managing tickets.
  - **Static Report** page (new feature for agents).
  - **Team Page** (new feature accessible to agents).
  - **Logout** button to sign out.

### Deployment
- Easy to deploy on Firebase Hosting, Vercel, or Netlify.
- Site URL can be submitted post deployment.

---

## Technologies Used
- React (with Hooks)
- Firebase Authentication
- Firebase Firestore (Realtime Database)
- React Router DOM
- React Context API for state management
- Tailwind CSS , shadcn/ui Styled Components 

---
