
# Booking App (Frontend)

## 📘 Introduction

This is the **Frontend** for the Booking App — a modern hotel and property booking platform. Built with **React.js**, this frontend interfaces with the Booking App API to allow users to search for rooms, view details, register or login, and manage bookings.

It features:
- User authentication and registration
- Room browsing and search
- Booking process flow
- Responsive design for mobile and desktop
- Admin views (optional, depending on implementation)

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/lTieDat/booking-app.git
cd booking-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

> Replace the value with your actual backend API URL if different.

### 4. Run the development server
```bash
npm start
```

App will run at `http://localhost:3000`.

---

## 🧭 Folder Structure

```bash
booking-app/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and static media
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page-level components (e.g., Home, Login)
│   ├── services/           # API request logic
│   ├── utils/              # Helper functions
│   ├── App.js              # Root component
│   ├── index.js            # App entry point
├── .env                    # Environment config
├── package.json
```

---

## 🚀 Build for Production

To build the app for production:

```bash
npm run build
```

This will generate optimized static files in the `build/` folder which can be deployed via services like:
- Vercel
- Netlify
- Nginx
- AWS S3 + CloudFront

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/some-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/some-feature`)
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

Link doc Unit test Jest: https://docs.google.com/document/d/1HqiWzErIl1Ti-oZ8entu2YH-S2RHSNbM88PiCv7T5Sk/edit?usp=sharing
