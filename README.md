# ✈️ Flight Search App

A React Native mobile app for searching and booking flights worldwide. Built with Expo and TypeScript.

## 🚀 Features

- Search flights between major cities
- One-way and round-trip booking
- Add multiple passengers (adults, children, infants)
- Choose cabin class (Economy, Business, First Class)

## 💡 How It Works

### Smart Airport Search

Users can just type city names like "Lagos" or "London" instead of remembering airport codes. The app finds the airport details and automatically selects the first match to search for flights (as seen in the `searchFlightsWithCities` API method). This makes it easier for users who don't know airport codes.

### Fast API Calls

The app fetches both origin and destination airports at the same time using parallel API calls. This makes the search faster compared to fetching them one by one. It also checks if airports exist before searching for flights, so we don't waste API calls on invalid routes.

## 🎯 What I Would Improve if Given more time

### Airport Selection Modal

Right now, when you type "London", the app just picks the first airport it finds. But London has 5 airports (Heathrow, Gatwick, Stansted, etc.). Same with New York - it has JFK, Newark, and LaGuardia.

I would add a modal that shows all available airports for a city and lets users pick the one they want. This would include:

- Search that waits for users to stop typing before calling the API (debouncing)
- Show all airports with their codes and full names
- Cache recent searches using React Query's built-in cache with staleTime and cacheTime configurations to persist search results across component unmounts
- Much better experience for cities with multiple airports

### Additional Features

- Cache search results using React Query's useQuery hook to avoid redundant API calls
- Work offline with saved data (using [MMKV storage](https://www.npmjs.com/package/react-native-mmkv))
- Filter and sort flight results
- Calendar view to see prices across different dates
- Save favorite routes

### Code Quality Improvements

- **CI/CD Pipeline** - GitHub Actions for automated testing and deployment to TestFlight/Google Play
- **Husky with pre-commit hooks** - To run linting and tests before commits
- **Unit and integration tests** - Using Jest and React Native Testing Library
- **E2E tests** - Using Detox for critical user flows
- **Commit message conventions** - Following conventional commits format

## 🔧 Tech Stack

- **[React Native](https://reactnative.dev/) + [Expo](https://expo.dev/)** - Mobile development
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[React Query](https://tanstack.com/query)** - Managing API data
- **[Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)** - Forms and validation
- **[React Native Paper](https://reactnativepaper.com/)** - UI components
- **[Axios](https://axios-http.com/)** - API calls

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the app
npm run start

# Run on iOS
npm run ios

# Run on Android
npm run android
```
