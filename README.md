# data-viz-platform
This project is a front-end implementation of a data visualization platform built with React 18+, TypeScript, Tailwind CSS, and Firebase Authentication. It replicates a Figma design across three key screens, focusing on modern UI/UX, reusable components, and smooth user interactions.



1.Clone Repo 
  https://github.com/PUNAMRAMPUKALE/data-viz-platform.git

2.Navigate to answersai-dashboard-typescript
  cd answersai-dashboard-typescript

3.Install Dependencies
  npm install

4.Run Project
  npm run dev

5.Visit the application in your browser
Go to: http://localhost:5173 (or the port shown in your terminal)

6.Click on the “Sign in with Google” button
You will see a styled login page. Click the “Sign in with Google” button.

7.Select your Google Account
Choose the Google account you want to sign in with. You might be prompted to allow permissions if it's your first time.

8.Redirect to Dashboard
After successful sign-in, you'll be automatically redirected to the dashboard screen.




- Features Implemented
1.Google Sign-In using Firebase Authentication.

2.State management using Redux (with @reduxjs/toolkit).

3.KPI cards and line chart with recharts.

4.Editable variables using a SlideOver panel.

5.Responsive UI with custom styles and transitions.

6.Tooltips with hover delay and descriptions.




- Technical Decisions and Trade-offs
Redux Toolkit was used for managing global variable selection because it's scalable and easier to manage compared to plain Context API.

Firebase Auth was chosen to simplify OAuth integration (avoids backend setup).

Recharts was used for the graph due to its ease of use and built-in responsiveness.

UI styling was done with Tailwind CSS (or custom styles) for fast prototyping.

Used manual hover timers for performance rather than 3rd-party tooltip libraries.



- Known Limitations
Variable selection limit logic can be improved (currently allows over-selection briefly).

No persistent database storage — variable selections are not saved between sessions.

Mobile responsiveness is basic; not fully optimized for small screens.



- Time Spent
Planning & UI Design: 2 hours

Authentication Setup: 1 hour

State Management (Redux): 1.5 hours

SlideOver Panel & Interactivity: 2 hours

Chart Integration & Styling: 1.5 hours

Testing & Polish: 1 hour

Total: ~9 hours




- Local Development Instructions
Ensure Node.js (v16+) is installed.

Run the dev server: npm run dev

Open http://localhost:5173 in your browser.

Click “Sign in with Google” to log in.

After authentication, you'll land on the dashboard screen.