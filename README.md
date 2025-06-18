# 🎟️ Ticket App – Role-Based Support Ticket System

**Live Demo:** 👉 [ticket--app.web.app](https://ticket--app.web.app/)  
Built with **React**, **Firebase Auth**, and **Firestore**

A support ticket management platform designed with two user roles — **Customers** and **Support Agents** — with secure login, dynamic ticket form, and role-based navigation.

---

## ✨ Features

### 🔐 Authentication
- Firebase Authentication with demo credentials:
  - **Customer:** `customer@support.com` / `customer123`
  - **Agent:** `agent@support.com` / `agent123`

### 👥 Role-Based Access
- **Customer:**
  - Raise, view, and delete **their own** tickets.
- **Support Agent:**
  - View **all** tickets.
  - Update status and assign agents.
  - Access static **Report** and **Team** pages.

### 📝 Ticket Form (12+ fields)
- Fields include: Title, Description, Priority, Category, Date, Email, Phone, Attachment, and more.
- Includes validation and file upload support.

### 🗂️ Ticket Dashboard
- Tabular ticket view with columns:  
  `ID`, `Title`, `Priority`, `Status`, `Created By`, `Assigned To`, `Actions`
- Role-specific actions:
  - **Customer:** Delete their own tickets
  - **Agent:** Assign or update ticket status

### 🔄 Navigation & UI
- Sidebar adapts by role
- Mobile-friendly layout
- Styled with **Tailwind CSS** and `shadcn/ui` components

---

## 🛠 Tech Stack

- **Frontend:** React (Hooks, Context API), Tailwind CSS
- **Auth & DB:** Firebase Authentication, Firestore
- **Routing:** React Router DOM
- **UI Components:** shadcn/ui, custom modals & tables

---

## 🚀 Deployment

Easily deployable via Firebase Hosting, Vercel, or Netlify.

---

## 💡 Future Enhancements

- ✅ Email notifications on ticket status updates  
- ✅ File preview for attachments  
- ✅ Enhanced team page with agent profiles & internal chat  

---

## 📬 Contact

Have suggestions or feedback?  
Open an issue or connect on [LinkedIn](https://www.linkedin.com/in/mohita-chourase/)

---

## 🧪 Quick Demo Access

- **Customer Login**  
  Email: `customer@support.com`  
  Password: `customer123`

- **Agent Login**  
  Email: `agent@support.com`  
  Password: `agent123`

---

