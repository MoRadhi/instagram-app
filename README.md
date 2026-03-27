# Daily News Feed

A full-stack social news application built with React, styled as an Instagram-like feed. Users can browse news articles fetched live from the New York Times API, create posts, like and comment, and chat with other users — all behind a Firebase-authenticated login system.

🔗 **Live Demo:** https://moradhi.github.io/instagram-app/

---

## Screenshots

<div align="center">

<img width="280" alt="Feed" src="https://github.com/user-attachments/assets/20512253-fd1a-4fbb-8f9d-42224d3321d0" />
&nbsp;&nbsp;
<img width="280" alt="Post" src="https://github.com/user-attachments/assets/0993d374-f02c-421a-b515-9e1cb4d4b8a0" />
&nbsp;&nbsp;
<img width="280" alt="Comments" src="https://github.com/user-attachments/assets/d58b3560-0c9c-473f-ba43-2e813387daa3" />

<br/><br/>

<img width="280" alt="Chat" src="https://github.com/user-attachments/assets/5cef2f53-7cbf-4d15-ad79-ac40b6f74d38" />
&nbsp;&nbsp;
<img width="280" alt="Create Post" src="https://github.com/user-attachments/assets/55b765f7-b670-44d5-ba61-d56b5d77e72a" />

</div>

---

## Features

- 🔐 **Firebase Authentication** — sign up and log in with persistent session management
- 📰 **Live News Feed** — articles fetched in real time from the New York Times API
- ✏️ **Create Post** — users can create and publish their own posts to the feed
- ❤️ **Likes** — like and unlike posts with live count updates
- 💬 **Comments** — leave comments on any post or article
- 💌 **Real-time Chat** — functional direct messaging between users powered by Firebase
- 🌐 **React Context API** — global auth and user state shared across all components
- 📱 **Responsive Design** — clean Instagram-inspired UI across screen sizes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite |
| Auth & Database | Firebase Authentication, Firebase Realtime Database |
| External API | New York Times API |
| State Management | React Context API |
| Styling | CSS |
| Deployment | GitHub Pages |

---

## Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- A Firebase project with Authentication and Realtime Database enabled
- A New York Times API key ([get one here](https://developer.nytimes.com/get-started))

### Installation

```bash
git clone https://github.com/MoRadhi/instagram-app.git
cd instagram-app
npm install
```

### Environment Variables

Create a `.env` file in the root of the project and add your Firebase config and NYT API key:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=your_database_url
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_NYT_API_KEY=your_nyt_api_key
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/       # Reusable UI components (PostCard, CommentSection, ChatWindow, Navbar...)
├── context/          # React Context for auth and user state
├── pages/            # Page-level components (Feed, Login, Signup, Chat, CreatePost)
├── firebase.js       # Firebase initialisation and config
└── App.jsx           # Root component and routing
```

---

## Deployment

This app is deployed to GitHub Pages using the `gh-pages` package.

```bash
npm run build
npm run deploy
```
