<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

# INSTALLATION GUIDE

#### INSTALL DEPENDENCIES

```
    yarn
```

#### CREATE ENVIROMENT VARIABLES FILE

```
    cp env.example env
```

#### RUN SERVER ON DEV-MODE

```
    yarn start
```

#### RUN TESTS

```
    yarn test
```

# LIBRARIES

- Material UI

```
Easy ui/ux lib to install and use on react projects.
```

- Redux-Saga

```
Write complex business logics outside the components jungle, enable numerous approaches to tackling parallel execution, task concurrency, task racing, task cancellation, etc.
```

- Redux Persist

```
Enables persistence with redux storage.
```

- Redux Logger

```
Logs all redux actions
```

- dayjs

```
    library for date manipulation
```

- i18next

```
    library for language
```

# PROJECT DETAILS

- App core (for providers)

```
src/app/index.tsx
```

- Public folder for assets

```
public
```

- Project uses only one generic reducer to manage store datas

```
src/redux/datasetReducer.ts
```

- Store structure

```
src/redux/initialState.ts
```

- Redux Actions (mostly just generic actions for data management)

```
src/redux/actions.ts
```

- Saga action definitions

```
src/actions/index.ts
```

- Redux Store Selectors (generic selector and complex selectors)

```
src/redux/selectors.ts
```

- Used to declare all api routes with parameters

```
src/api/index.ts
```

## How to deploy

- Run `npm install` | `yarn install` to install all dependencies.
- Run `npm start` | `yarn run` to run the app locally.
- You can find the project running on `localhost:3000`.

---

### Description

This project is designed to test your knowledge of front-end web technologies and assess your ability to create front-​end UI products with attention to details, cross-browser compatibility, standards, and reusability.

### Assignment

The goal of this exercise is to create a demo calendar application using React.
You should start by rendering a single month view of a calendar for the current month, along the lines of the illustration below:

### Mandatory features

Ability to add "reminders" (max. 30 characters) for a day and time specified by the user. Also, include a city.
Ability to edit reminders - including changing text, city, day and time.
Add a weather service call from MetaWeather, AccuWeather or VisualCrossing and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.

### Bonus (Optional)

Expand the calendar to support more than the current month or year.
Properly handle overflow when multiple reminders appear on the same date.
Unit test the functionality: Ability to add "reminders" (max. 30 characters) for a day and time specified by the user. Also, include a city.

### Considerations

Show us in the Readme all relevant information about your project.
The project is completely focused on Front-end. Ignore the Back-end.
Create your Calendar using the route /calendar

Feel free to use small helper libraries for:
-- UI Elements.
-- Date/Time handling.

You must create the calendar component yourself. Do not user calendar libraries like FullCalendar or Bootstrap Calendar.
Provide working API keys to any external API you use.
We have implemented Redux thunk for state management, but you may use any state manager you are familiar with.
Show us your capabilities on CSS and styling, if possible.
