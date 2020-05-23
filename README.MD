## Vue.js + ASP.NET Core sandbox project

---

This is a project for learning and exploring Vue.js with a ASP.NET Core WebAPI.

I have separated the Front and Back end into separate files while in development.  
In order to get this project to work on your machine, you need to do some setup.

1. Open folder(vuefront) in VS Code and open command line.
2. type -> **npm install**
3. type -> **npm run serve** (this will start the dev server for the front end so the backend can communicate)
4. Open VueSandbox.Core.sln (Located in VueSandbox.Core folder) with Visual studio.
5. Build (Ctrl+b) to be safe, this should restore all packages you need to run, then Run with (Ctrl+f5), this should start up a IIS express server and after a couple of secs you should see a home page.
6. Use the Navbar on top of the Home page to see some examples of what this page can do, more will be added as i expand this Project.
