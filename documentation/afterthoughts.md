<h1>Afterthoughts</h1>

I **really** underestimated the required work and effort. I thought it would be no problem, just make a similar app that was made through the course but has more features and made with TypeScript. But oh boy, I was wrong. Here are some things I have thoughts about.

<h2>UI and UX</h2>

UI and UX is pretty complicated, especially when you are not using a pre-made component library like Material UI! I have Daisy UI installed, but only used some of the components. Most are heavily modified examples from other sites I mentioned in features file.

You have to make the UI beautiful, fast to grasp and easy to use, because the average user is not a tech savvy developer. Before this project I've never even thought about loading skeletons but now I spot them in apps that don't have them.

<h2>Firebase Authentication</h2>

Firebase Authentication was pretty hard to learn at first. I didn't use Firebase for backend and database, which complicated things a lot. I had to use the Firebase SDK in the backend for authorizing, which's documentation is not the clearest.

In the frontend I kept getting odd bugs that caused the app to get stuck and crash without clear reasons. I'm happy now with the state of it. I don't have to worry about storing user's email, password and handling the reset of those if forgotten.

<h2>CI/CD, GitHub Actions & Cypress</h2>

I didn't have too much trouble creating the tests. There was some trouble because Firebase Auth handles the login, I needed to again use the SDK for resetting the testing user data.

But the real trouble came when I started using it with GitHub Actions. I had problems with `.env` variables not working, Actions not waiting for the builds to complete, backend not finding frontend's build files.

I had a lot of trouble configuring environments for the tests. To make testing a lot faster, when running locally, frontend and backend are running separately like during development, but with different credentials. This can be achieved by using different ports.

But the problem I had was how to make Cypress decide which port to use for testing. GitHub Actions doesn't support all the stuff like `Cypress.env` values. In the end, I solved it like this: if `Cypress.env` isn't working, get the port from variables passed from npm script. If both are empty, throw an error. Sounds easy, but it wasn't. I rewrote pretty much everything couple times. GitHub Actions tests the built version of the app but with testing credentials.

<h2>TypeScript</h2>

I challenged myself and made both frontend and backend with TypeScript. I've never pretty much used TypeScript before Fullstackopen course. I'm happy with the results and will utilise TypeScript in every project where possible. Like advertised, it helped me find a lot of bugs and oversights while coding.

There were some struggles with types with Mapbox, but GitHub Copilot helped me with those.

<h2>Recap</h2>

So yeah, as you can see by [timetable](/documentation/timetable.md) this project took over 230 hours. This is the most time I have ever spent on a school project. But if I say, it might be the most useful and interesting. I don't regret this at all.

The project probably doesn't look like that it took that long to make, but there was a lot of trial and error.

I originally started this project in August 2023, but really worked the most during end of November to start of January 2024. This is because I had a lot of other school courses and wasn't motivated because of stress.

I have no plans to make this a "real app" at the moment because the market is filled with notes apps. Maybe someday, but it would need to have some killer feature. I don't plan on abandoning the project now after completion, I can probably utilise this project as a base for other courses later at TAMK. I could make a React Native version or add proper Rich Text Editing now that the app has strong and capable base.
