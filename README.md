<h1>MyMemoria 📝</h1>

<h3>Save your loved memories to different locations all over the world 🌍</h3>

![Frontpage](https://github.com/kristianka/mymemoria/assets/49764796/5e26c456-8fd2-409d-9305-c2764ba17e9a)


❓ This is the repository for my fullstack project MyMemoria, which has taken over 250 hours to make! This readme includes the documentation, the code for the frontend and the backend. See below for more screenshots and info. (Was named just fullstack project before)

💻 Deployed at https://mymemoria.app/. Note that it may take few minutes to connect since Render automatically spins down free apps. You can use any email to register, it isn't verified. For demo purposes you can use for example `mail@example.com` and password `password123`.


>[!TIP]
>  ⭐ New features! This app now has i18n translations! Rebranded to MyMemoria! Timeline! There are other changes too, see releases for full patch notes! 



<h1>Info</h1>

<h2>Technologies used 🔧</h2>

All the code in frontend and backend are made with TypeScript and with latest libraries and standards.

<h3>Frontend</h3>

-   Frontend powered by React, Vite, Tailwind. Multiple components from like Daisy UI, Preline, Flowbite.
-   Routing by React Router, state management by Tanstack Query (React Query).
-   Map powered by Mapbox.
-   User authentication powered by Firebase Authentication.
-   Automated testing powered by Cypress. Every page and major function has a E2E test.

<h3>Backend</h3>

-   Backend powered by NodeJS & Express. Database powered by MongoDB and hosted by Mongo Atlas.
-   Automated testing powered by Cypress. API testing done manually with Hoppscotch.

<h2>Main features ⭐</h2>

-   Create user / login with Firebase Authentication. You can reset password if forgotten.
-   Frontpage has a list of all memories and a map that has pins to notes' locations.
-   Create memories that have title, content and location. You can search for an address or drop a pin to the map.
-   Edit and delete memories.
-   Change your name or delete your account.
-   Set default map location for your memories.
-   The app is designed for all screens, UI scales properly on mobile and PC.
-   Fully translated to English and Finnish.
-   Code is optimised, properly commented and made logically.
-   Proper testing.
-   Proper CI/CD pipeline.
-   Uses GitHub branches and pull requests.

<h2>Screenshots 📷</h2>

<h3>Frontpage</h3>

![Frontpage](https://github.com/kristianka/mymemoria/assets/49764796/36d836dc-a7ae-406d-9b01-1c69c89db5c1)


<h3>Sign in page</h3>

![Sign in page](https://github.com/kristianka/mymemoria/assets/49764796/0fbadb99-c7d8-4612-a656-7f1d0390f58e)


<h3>Register page</h3>

![Register page](https://github.com/kristianka/mymemoria/assets/49764796/8d564a67-67fc-4f24-af2c-31e2db44ca41)


<h3>Frontpage after creating user / signing in</h3>

![Frontpage after creating user / signing in](https://github.com/kristianka/mymemoria/assets/49764796/d6e47a0b-b7b9-42c0-b203-3a25fbd96490)


<h3>Adding a memory</h3>

![Adding a memory](https://github.com/kristianka/mymemoria/assets/49764796/45616ff1-ecd1-4e96-9d3e-991ef52731ac)


<h3>Single memory view</h3>

![Single memory view](https://github.com/kristianka/mymemoria/assets/49764796/2d914848-8d00-4b55-8adb-e29bb757b0c4)


<h3>Editing a memory</h3>

![Editing a memory](https://github.com/kristianka/mymemoria/assets/49764796/94970699-704f-4c08-bbfe-cd2f6aa9ec7b)


<h3>Frontpage loading skeleton</h3>
  
![Frontpage loading skeleton](https://github.com/kristianka/mymemoria/assets/49764796/df8e37df-d1f5-4830-83c5-dc916abe0d72)


<h3>Frontpage after some entries</h3>

![Frontpage after two entries](https://github.com/kristianka/mymemoria/assets/49764796/5e26c456-8fd2-409d-9305-c2764ba17e9a)


<h3>Frontpage on mobile</h3>

<p align="center">
  <img src="https://github.com/kristianka/mymemoria/assets/49764796/dfae8037-b7a3-42eb-99ec-0ac4c4c0c330" alt="Frontpage on mobile" style="width: 45%;"/>
  <img src="https://github.com/kristianka/mymemoria/assets/49764796/31f23282-1f17-4061-a6ef-7e0db0cb2be7" alt="Adding a memory on mobile" style="width: 45%;"/>
</p>


<h3>Adding a memory on mobile</h3>

<p align="center">
  <img src="https://github.com/kristianka/mymemoria/assets/49764796/d3506134-3d5a-4233-bd22-e8b66c13a5d1" alt="Frontpage on mobile" style="width: 45%;"/>
  <img src="https://github.com/kristianka/mymemoria/assets/49764796/9e935a95-c9f8-4f65-83ef-45db0a4a5429" alt="Adding a memory on mobile" style="width: 45%;"/>
</p>


<h3>Timeline loading skeleton</h3>
  
![Timeline loading skeleton](https://github.com/kristianka/mymemoria/assets/49764796/35c10203-a624-44fc-b5be-6de914239310)


<h3>Timeline</h3>
  
![Timeline](https://github.com/kristianka/mymemoria/assets/49764796/a2a6dc9d-0b01-4b45-9bfd-69bebaae13fc)


<h3>Profile page</h3>

![Profile page](https://github.com/kristianka/mymemoria/assets/49764796/14498b6a-29a7-4908-880b-a14e70a86975)


<h3>Changing name</h3>

![Changing name](https://github.com/kristianka/mymemoria/assets/49764796/69f31537-2dd5-4dee-813b-15d58b4aa92b)



<h3>Settings page</h3>

![Settings page](https://github.com/kristianka/mymemoria/assets/49764796/90547ea9-b8f8-4dd5-901a-166aeadd736a)


<h3>Info page</h3>

![Info page](https://github.com/kristianka/mymemoria/assets/49764796/fcc6a8e9-5f50-4f9e-b90d-2c214623f7dc)


<h2>Running the app 🏃</h2>

This project has three different Firebase Auth and MongoDB credentials: development, testing and production.

See [here](./documentation/running.md) for information how to run.

<h2>Test coverage 🔬</h2>

This project uses Cypress for E2E testing. Almost every aspect has a E2E test, excluding some map elements where automated testing isn't possible due to Mapbox's limitations.

Backend has been throughly tested with Hoppscotch when changes have been made to it. Automated testing seems to be impossible due to auth being handled by Firebase Auth and you need your ID and token for every request.

See [here](./frontend/cypress/e2e/test.cy.ts) for tests.

<h2>Time used ⏱️</h2>

See [here](./documentation/timetable.md).

<h2>What I learned and thoughts about the project 🎓</h2>

See [here](./documentation/afterthoughts.md).

<h2>Bug reports and other 🐛</h2>

Please open a GitHub issue [here.](https://github.com/kristianka/mymemoria/issues)
