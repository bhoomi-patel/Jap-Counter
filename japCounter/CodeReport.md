# Japloop Project Code Report

This report provides an overview of the key files, components, and concepts used in the Japloop project to facilitate easy understanding and future reference.

---

## 1. Project Structure

- **src/App.js**: Main application component. Manages global state such as mantra, target, count, malasToday, streak, theme (dark/light), and floating words. Handles core logic for incrementing counts, resetting sessions, and updating streaks based on consecutive days of practice. Renders main UI components.

- **src/components/**: Contains reusable React components used in the app.

---

## 2. Key Components and Concepts

### App.js

- **State Management**: Uses React `useState` hooks to manage mantra, target, count, malasToday, streak, theme mode, floating words, and session tracking.
- **Streak Logic**: Implements streak counting based on consecutive days of practice. Uses `useEffect` to update streak when user practices on consecutive days. Persists streak and last practice day in `localStorage`.
- **Handlers**:
  - `handleJap`: Increments count and malas, adds floating mantra words for animation.
  - `handleNewSession`: Resets all session-related states.
- **Rendering**: Renders background effects, floating words, main input and progress UI, and summary panel.

### Components

- **ThemeToggle.jsx**: Toggles between dark and light themes.
- **StarField.jsx**: Renders animated starry background.
- **FloatingWords.jsx**: Displays floating mantra words with animation.
- **MantraCounter.jsx**: Contains inputs for mantra and target, progress circle visualization, stats display (total japs, malas, streak), and reset button.
- **SummaryPanel.jsx**: Shows practice summary including real-time date/time/day, session start info, mantra, total malas, and practice history. Uses props to display dynamic data.

---

## 3. Important Concepts Used

- **React Functional Components**: All components are functional components using hooks.
- **React Hooks**: `useState` for state, `useEffect` for side effects like streak updates and timers.
- **LocalStorage**: Used to persist streak and last practice day across sessions.
- **Conditional Rendering**: Components render different UI based on state and props.
- **CSS Animations**: Floating mantra words use CSS keyframe animations.
- **Progress Visualization**: Uses conic-gradient CSS for circular progress bars.
- **Responsive Design**: Uses Tailwind CSS classes for responsive and styled UI.

---

## 4. How to Extend or Modify

- To add new features, follow the existing pattern of state management in App.js and pass props to components.
- For UI changes, modify the respective component JSX and styles.
- For logic changes like streak rules, update the `useEffect` in App.js managing streak state.
- Persist any new state that should survive reloads in `localStorage`.

---

This report should help you understand the overall architecture, key components, and concepts used in the Japloop project for easier maintenance and future development.
