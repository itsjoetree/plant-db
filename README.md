# Plant DB

A web application that processes generic data, made with React and C#.

## Setup

To setup the frontend, navigate to "plant-db-frontend" and run the following command:

```bash
npm install
```
For the backend code I recommend using [Visual Studio](https://visualstudio.microsoft.com/) and then you can easily open PlantDB_Backend.sln found in the root directory to load up the project files and debug.

## Frontend

For the frontend I decided to use React and TypeScript, and [Mantine](https://mantine.dev/) for the main styling library.

The core components that showcase my take on handling generic data from the server are **DbForm, DbItem, and DbTable**.

**DbTable** only handles pagination as of now, but more complex features are to come.

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