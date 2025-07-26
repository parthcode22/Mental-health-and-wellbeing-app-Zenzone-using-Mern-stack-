
# 🧘‍♀️ Zenzone – Mental Health & Wellbeing App

Zenzone is a full-featured **mental wellness application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Designed to support emotional wellbeing, Zenzone empowers users to track their mood, engage in mindfulness exercises, interact with a supportive community, and receive basic guidance through a custom-built chatbot.

---

## 🌟 Features

- 📊 **Mood Tracker** – Log and visualize your emotional state daily  
- 🌬️ **Breathing Exercise Module** – Practice deep breathing techniques to reduce stress  
- 🗣️ **Community Forum** – Share experiences and support each other through an interactive peer-to-peer forum  
- 🤖 **Empathetic Chatbot** – Real-time support for mental health check-ins and basic guidance  
- 🎨 **Responsive UI** – Clean, intuitive, and mobile-friendly design  
- 🔐 **Privacy Focused** – User data is secured and interactions remain private  

---

## 🛠️ Tech Stack

- **Frontend**: React.js, JavaScript, CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **APIs**: RESTful services  
- **Other**: Custom chatbot module, JWT authentication (if implemented), responsive design  

---

## 📁 Project Structure

```

Zenzone/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.js
├── server/                 # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env
├── package.json
└── README.md

````

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed  
- MongoDB installed and running locally, or use MongoDB Atlas  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zenzone.git
   cd zenzone
````

2. Install backend dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:

   ```bash
   cd ../client
   npm install
   ```

4. Create a `.env` file in the `server/` directory:

   ```
   MONGO_URI=<your_mongodb_uri>
   PORT=5000
   ```

5. Run the app:

   * Backend (in `server/`):

     ```bash
     npm start
     ```

   * Frontend (in `client/`):

     ```bash
     npm start
     ```


---

## 📌 Future Enhancements

* Push notifications for mood check-ins
* AI-based chatbot with sentiment analysis
* Dark mode toggle
* Admin panel for moderating the community forum

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or pull requests to enhance the project.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---


