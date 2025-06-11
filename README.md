# Air Environment Dashboard

🌍 **A personal dashboard for real-time air quality and weather monitoring, built with modern web technologies for optimal performance and usability.**

![Dashboard Screenshot](https://i.postimg.cc/Vk7wdbyb/Screenshot-2025-04-24-112232.png)
*Clean, intuitive interface with AQI and weather metrics*

## 🚀 Tech Stack

This project is built with a modern, performant, and scalable tech stack:

-   **Core Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/) for a fast and efficient development experience.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first approach to styling.
-   **State Management**: React Context API for managing global state like theme and weather data.
-   **Routing**: [React Router](https://reactrouter.com/) for client-side routing.
-   **Animations**: [Lottie for React](https://lottiereact.com/) for high-quality, lightweight animations.
-   **Icons**: [React Icons](https://react-icons.github.io/react-icons/) for a comprehensive set of icons.
-   **Testing**: [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit and component testing.
-   **Linting**: [ESLint](https://eslint.org/) for code quality and consistency.

## ✨ Features

-   **Real-time Air Quality Index (AQI)** – Track pollution levels in your area.
-   **Current Weather Conditions** – Temperature, humidity, wind speed, and more.
-   **5-Day Weather Forecast** – Plan your week with a detailed forecast.
-   **Location-Based** – Automatically detects your location or allows for manual city selection.
-   **Responsive UI** – Seamless experience on mobile, tablet, and desktop.
-   **Dark/Light Theme** – Switch between themes for your viewing comfort.

## 📂 Project Structure

The project is organized into the following directories:

```
/
├── public/               # Static assets
├── src/                  # Source code
│   ├── assets/           # Images, animations, and other assets
│   ├── components/       # Reusable React components
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── reducers/         # Reducer functions for state management
│   ├── styles/           # Global styles and themes
│   └── utils/            # Utility functions
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## 🛠️ Setup (For Development)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/air-environment-dashboard.git
    cd air-environment-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your API keys:
    ```env
    VITE_OPENWEATHER_API_KEY=your_api_key
    VITE_AQI_API_KEY=your_aqi_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 📜 Available Scripts

In the project directory, you can run the following commands:

-   `npm run dev`: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the code using ESLint.
-   `npm run preview`: Serves the production build locally for preview.
-   `npm run test`: Runs the test suite using Jest.

## 🧩 Components

The `src/components` directory contains all the React components for this application.

-   **`CitySelector.jsx`**: A component that allows users to search for and select a city.
-   **`DataVisualization.jsx`**: A component for visualizing weather data, such as charts or graphs.
-   **`ErrorBoundary.jsx`**: A component that catches JavaScript errors anywhere in its child component tree.
-   **`ForecastList.jsx`**: A component that displays the 5-day weather forecast.
-   **`SettingsButton.jsx`**: A button that opens the settings panel.
-   **`SettingsPanel.jsx`**: A panel for application settings, like theme and language.
-   **`ToggleTheme.jsx`**: A component to toggle between light and dark themes.
-   **`WeatherDisplay.jsx`**: The main component for displaying the current weather conditions.
-   **`WeatherWidget.jsx`**: A container component that wraps the entire weather widget.

## 🎣 Hooks

Custom hooks are located in the `src/hooks` directory.

-   **`useWeatherData.js`**: A custom hook for fetching and managing weather data from the API.

## 🌐 Context

The `src/context` directory contains the React Context providers for managing global state.

-   **`LanguageContext.jsx`**: Provides language state to the application.
-   **`ThemeContext.jsx`**: Provides theme state (dark/light) to the application.
-   **`WeatherContext.jsx`**: Provides weather data to the application.

## 🌟 Why I Built This

Initially created for **personal use** to monitor local air quality and weather in a simple, fast interface. Open-sourced so others can benefit or customize it for their needs!

📜 **License**: MIT (Free to use and modify)

---

🌫️ **Breathe easier with real-time environmental insights!** ☀️

*(Note: Requires API keys for OpenWeather and AQI services)*
