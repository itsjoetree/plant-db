using Microsoft.Data.Sqlite;

/*
    This application/script is used to create a SQLite database, this will output the
    database to /bin/Debug/.net6.0/{databaseName}.db when debugging, and /bin/Release... for
    release builds.
*/

string databaseName = "PlantDB";

SqliteConnectionStringBuilder connectionStringBuilder = new SqliteConnectionStringBuilder();
connectionStringBuilder.DataSource = $"./{databaseName}.db";

using (SqliteConnection connection = new SqliteConnection(connectionStringBuilder.ConnectionString))
{
    connection.Open();

    SqliteCommand deleteTableCmd = connection.CreateCommand();
    deleteTableCmd.CommandText = "DROP TABLE IF EXISTS [Fern]; DROP TABLE IF EXISTS [Cactus]; DROP TABLE IF EXISTS [Plant Base]; ";
    deleteTableCmd.ExecuteNonQuery();

    SqliteCommand createTableCmd = connection.CreateCommand();

    createTableCmd.CommandText = @"
        CREATE TABLE [Plant Base] (
            [Id] INTEGER NOT NULL,
            [Name] VARCHAR(100) NOT NULL,
            [Nickname] VARCHAR(100),
            [Description] VARCHAR(200) NOT NULL,
            [Lighting Condition] TINYINT NOT NULL,
            [Watering Interval] TINYINT NOT NULL,
            [Average Height Inches] DECIMAL NOT NULL,
            [Origin] VARCHAR(100),
            [Image] TEXT,
            [Image Type] TEXT,
            CONSTRAINT [PK Plant Base] PRIMARY KEY ([Id]),
            CONSTRAINT [CK Plant Base Lighting Condition <= 2] CHECK ([Lighting Condition] <= 2),
            CONSTRAINT [CK Plant Base Watering Interval <= 2] CHECK ([Watering Interval] <= 2)
        );

        CREATE TABLE [Fern] (
            [Id] INTEGER NOT NULL,
            [Plant Base ID] INTEGER NOT NULL,
            [Blades] INTEGER NOT NULL,
            CONSTRAINT [PK Fern] PRIMARY KEY ([Id]),
            CONSTRAINT [FK Fern Plant Base] FOREIGN KEY ([Plant Base ID]) REFERENCES [Plant Base] ([Id])
        );

        CREATE TABLE [Cactus] (
            [Id] INTEGER NOT NULL,
            [Plant Base ID] INTEGER NOT NULL,
            [Glochids] INTEGER NOT NULL,
            CONSTRAINT [PK Cactus] PRIMARY KEY ([Id]),
            CONSTRAINT [FK Cactus Plant Base] FOREIGN KEY ([Plant Base ID]) REFERENCES [Plant Base] ([Id])
        );
    ";

    createTableCmd.ExecuteNonQuery();
}

