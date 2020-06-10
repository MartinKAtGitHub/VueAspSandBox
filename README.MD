## Vue.js + ASP.NET Core sandbox project

---

This is a project for learning and exploring Vue.js with ASP.NET Core WebAPI.

I have separated the front and back end into separate folders while in development.  
In order to get this project to work on your machine, you need to do some setup.

1. Open folder(vuefront) in VS Code and open command line.

2. type -> **npm install**

3. type -> **npm run serve** (this will start the dev server for the front end so the backend can communicate)

4. Open VueSandbox.Core.sln (Located in VueSandbox.Core folder) with Visual studio(VS).
5. Build (Ctrl+b) to be safe, this should restore all the packages you need.

6. (**For Dev Branch**) => Open Package Manager Console, type " **Update-Database** ". IF you are not using VS Package Manager Console try " **dotnet ef database update** " in your preferred environment. This should create an empty localdb under the name of TodoAppLocal.

7. Run (Ctrl+f5), after a couple of seconds you should see a home page.

8. Use the navbar on top of the home page to see some examples of what this project can do, more functionality will be added at some point.
