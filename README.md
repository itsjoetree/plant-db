# Plant DB

A web application that processes dynamic data created with React + C#.

The goal of this repository is to provide a template on an application that processes dynamic data and requires minimal tweaks to add new entities.

With this template the backend is responsible for structuring what properties the frontend will render. A unified data structure is used to display table and form data. Adding a new entity to the backend should require little to no updates to frontend code (aside from translations).

While this may not be optimal for every application, it provides insight into implementing form heavy applications and 
how to handle potentially complex data manipulations on the frontend.

## Setup

To setup the frontend, navigate to "PlantDB-Frontend" and run the following command:

```bash
pnpm i
```
For the backend code I recommend using [Visual Studio](https://visualstudio.microsoft.com/) and then you can easily open PlantDB_Backend.sln found in the root directory to load up the project files and debug.

## Frontend

For the frontend I decided to use Vite + React/TypeScript, and Panda CSS for creating components.

```bash
├── components # Components of app built with Panda CSS 
├── helpers # Helper functions
├── i18n # Translation namespaces
├── layouts # Layouts of application
├── sections # Main content/sections of app                      
│   ├── add # Add a new entry
│   ├── dashboard # Viewing an entry
|   ├── edit # Editing an entry
```

The frontend code for this template exhibits code splitting, suspense, building components with Panda CSS and translations.

The core of the app is within `sections`, where each section is built to utilize dynamic data to build form, tables and dashboards.

With the dynamic nature of `sections`, we can add hundreds of entities to our backend without having to add additional frontend code (aside from translations).

## Backend
I chose C# to showcase the usage of generics, reflection and services in the application.

The database for this application is created in SQLite, and if you startup the **DatabaseGenerator** project you can tweak the schemas and create a new database to replace the default provided.

**PlantDBContext** - Scaffoled and tweaked a bit to ensure functionality. If you plant to scaffoled I highly recommend keeping this original file as a reference as SQLite can be a bit quirky with scaffolding.

This project does not use migrations but you can easily scaffold a new DB instance you create with the [dotnet CLI](https://dotnet.microsoft.com/en-us/download) and this command:
```bash
dotnet ef dbcontext scaffold "DataSource=./PlantDB.db" Microsoft.EntityFrameworkCore.Sqlite -o Models —force
```

**IPlantService, PlantService** : The goal of the PlantService is to use generics and reflection in order to preform various actions such as create, edit, and delete.

**PlantBase** - A model that holds repetitive properties that each plant will have.

**Cactus, Fern** - The two plant models I created from the database.

**PlantRecord** - The data mapping for a specific property in the schema.

**PlantProperty** - Information regarding the plant property.

**PlantInfo** - Organizes the data to be send to the client, this can be used easily with tables and also with any other component.

**AppInfoController** - Sends data to the client about spelling of different plant names, their api path and home page image.

**CactusController, FernController** - API endpoints that the frontend interacts with. Note how we can easily create a whole new API with minimal lines of code for each action thanks to the **PlantService**, generics and reflection.