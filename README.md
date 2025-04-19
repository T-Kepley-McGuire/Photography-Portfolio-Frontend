# Photography Portfolio Frontend

A responsive, performant frontend for a photography portfolio and booking site built with React and Tailwind CSS. This project serves as a commercial platform for clients to browse a photo portfolio and submit booking inquiries with custom date selections.

---

## 🔍 Overview

This project showcases a photography portfolio with a sleek masonry layout and an intuitive booking form. It's tailored for prospective clients, enabling them to browse work and initiate the booking process through a guided form interface.

---

## 🧱 Tech Stack

- **Frontend**: React (w/ React Router), Tailwind CSS, TypeScript
- **Backend**: Not included here (handled by Flask in a separate repo)
- **Deployment**: Vercel
- **CDN**: Used for serving portfolio images
- **Lazy loading**: Custom implementation for performance

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18.14.x or compatible

### Installation

```bash
git clone https://github.com/T-Kepley-McGuire/Photography-Portfolio-Frontend.git
cd Photography-Portfolio-Frontend
touch .env
# Update VITE_API_URL in your .env file
npm install
npm run dev
```

### Environment Variables

- `VITE_API_URL`: URL to your backend API (e.g. `https://localhost:5000`)

---

## 📁 Project Structure

```
/public           → Static assets needed at initial load
/src
  /components     → Reusable UI components
  /pages          → Route-based pages
  App.tsx         → Main app logic
  main.tsx        → Entry point
index.html        → HTML entry point
```

---

## 💡 Features

- **Booking page**: Allows clients to choose up to three days for potential bookings with time selection, then submit a form for direct follow-up.
- **Custom calendar**: Dynamically shared time-selection modal avoids DOM bloat by using lifted state and a single modal instance.
- **Portfolio**: Masonry layout with lazy-loading images retrieved from the backend.
- **Routing**: Smooth navigation using React Router.

---

## 🧭 User Guide

- Navigate using the top menu bar.
  - **Home**: Logo on the top left
  - **Pages**: Top right links (Booking, Portfolio, About)
- **Booking**: Fill out the form with contact info, select a package, and choose up to three possible dates with times.
- **Portfolio**: Scroll to browse photos. Click an image for a larger view, and navigate with arrow buttons.

---

## ⚠️ Caveats & Limitations

- This is a frontend-only project and requires a functioning backend API.
- Availability is not validated in real time — bookings are discussed personally after form submission.
- No CMS; content like pricing is hardcoded and editable in source.

---

## 🔧 Development Notes

- Designed for scalability and simplicity using compartmentalized components and lazy loading.
- Photos are statically hosted on the backend and requested as URLs from the frontend.
- Clever use of lifted state and a shared modal component keeps the calendar performant and lightweight.

---

## 🧪 Testing & Feedback

- No automated testing setup currently.
- For bugs, questions, or feature requests, contact: `kepley.mcguire.mail@gmail.com`

---

## 🔒 Licensing & Credits

- **License**: *TBD*
- **Photos**: Property of Lizzie McGuire. Contact the owner for usage rights.
- **Thanks to**:
  - David McGuire — for design feedback
  - Spencer McKenney — for tech stack advice and debugging help

---

## 🌐 Production Site

Visit the site at: [lizziemcguirephotography.com](https://www.lizziemcguirephotography.com/)