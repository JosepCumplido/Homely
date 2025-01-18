# Homely

![Homely](https://github.com/user-attachments/assets/87960b70-85db-4422-bee1-21bb359a666b)


This project was generated using [Next.js](Next-url) version 14.3.0-canary.0

## About the project

Homely is a full-stack rental housing portal built with React, Next.js and Node.js. 
I built this project as a first approach to explore the MERN stack, focusing on Next.js and ElasticSearch database. 

Enhanced the frontend with TypeScript, Tailwind, and Shadcn components. 

The backend is developed with Node.js, utilizing SQL Server for data storage and ElasticSearch for advanced search capabilities.
Key features of this application include property listings, search functionality and user accounts management.

### Built With

[![React][React.js]][React-url] [![Next][Next.js]][Next-url] [![Node][Node.js]][Node-url] [![Elastic Search][ElasticSearch]][Elastic-url] [![Typescript][Typescript]][Typescript-url] [![Tailwind][Tailwind]][Tailwind-url] ![Sql Server][SqlServer]

## Run the project

Follow this guide to run the project locally.


### Prerequisites 
* Npm package manager v10.8.2
* Node interpreter v20.17.0
* Docker Engine for database containerization.
* Postman (or equivalent REST client)

### Installation

1. Clone the repo

```sh
git clone https://github.com/JosepCumplido/Homely.git
```

2. Install NPM packages

Navigate to `.\client\` directory

```sh
npm install
```

Navigate to `.\server\` directory

```sh
npm install
```

4. Dockerize databases

Open a docker terminal and run the following commands.

**SQL Server Database:**

```sh
docker pull mcr.microsoft.com/mssql/server
```

```sh
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Password_123#" -p 1433:1433 --name sql_server_container -d mcr.microsoft.com/mssql/server
```

Run the following DDL queries on a database client (I used Intellij database plugin).

```sh
create table dbo.Chat
(
    chatId      int identity
        primary key,
    user1       varchar(100)
        constraint FK_chats_user1
            references dbo.[User],
    user2       varchar(100)
        constraint FK_chats_user2
            references dbo.[User],
    createdAt   datetime2 default getdate(),
    lastMessage varchar(250)
)
go
```

```sh
create table dbo.Home
(
    id            int identity
        primary key,
    city          nvarchar(255)  not null,
    country       nvarchar(255)  not null,
    imagesUrls    nvarchar(max),
    pricePerNight decimal(10, 2) not null,
    score         float,
    features      nvarchar(max),
    amenities     nvarchar(max),
    categories    nvarchar(max),
    hostUsername  varchar(100)
        constraint hostUsername
            references dbo.[User],
    maxGuests     int
)
go
```

```sh
create table dbo.Message
(
    messageId      int identity
        primary key,
    chatId         int
        references dbo.Chat,
    senderUsername varchar(100)
        references dbo.[User],
    content        text,
    createdAt      datetime2 default getdate()
)
go
```

```sh
create table dbo.Reservations
(
    id         int identity
        primary key,
    username   varchar(100)   not null
        constraint FK_Reservations_Users
            references dbo.[User],
    homeId     int            not null
        constraint FK_Reservations_Properties
            references dbo.Home,
    fromDate   date           not null,
    toDate     date           not null,
    guests     int            not null,
    totalPrice decimal(10, 2) not null
)
go
```

```sh
create table dbo.[User]
(
    name      varchar(100),
    username  varchar(100) not null
        constraint User_pk
            primary key,
    password  varchar(100),
    email     varchar(100) not null,
    surname   varchar(100),
    avatarUrl varchar(150)
)
go
```

Run the following insert
```sh
INSERT INTO dbo.[User] (name, username, password, email, surname, avatarUrl)
VALUES ('Josep', 'josep2', '123', 'josep@example.com', 'Cumplido', '');
```

**Elastic Search Database:**

```sh
docker volume create elasticsearch_data
```

```sh
docker run -d --name elasticsearch-container -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" -e "xpack.security.enabled=false" -e "ELASTIC_PASSWORD=Password_123#" -v elasticsearch_data:/usr/share/elasticsearch/data docker.elastic.co/elasticsearch/elasticsearch:8.10.2
```

Now you can connect to ElasticDB with `host: localhost`, `user: elastic`, `password: Password_123#`. I used the [EDQL Intellij plugin](https://plugins.jetbrains.com/plugin/16364-elasticsearch-query--edql)

Use `Postman` to initialize the database schema:

1. Create `Home` index (table)

```sh
[PUT] http://localhost:9200/home
request body: {
    "mappings": {
        "properties": {
            "amenities": {
                "type": "keyword"
            },
            "categories": {
                "type": "keyword"
            },
            "city": {
                "type": "keyword"
            },
            "country": {
                "type": "keyword"
            },
            "features": {
                "type": "keyword"
            },
            "hostUsername": {
                "type": "keyword"
            },
            "id": {
                "type": "integer"
            },
            "imagesUrls": {
                "type": "keyword"
            },
            "maxGuests": {
                "type": "integer"
            },
            "pricePerNight": {
                "type": "integer"
            },
            "score": {
                "type": "float"
            }
        }
    }
}
```

We will later populate the database.


### Running the project

1. Run the sql and elastic docker containers to start the databases.

2. Populate the databases by sending the following POST request from `Postman`

```sh
http://localhost:4000/home/populate
request body: {}
```

This will generate 30 random home listings.

To build and run the project:

1. Navigate to `.\server\package.json` and run `build` script, once it finishes, run `start` script.

2. Navigate to `.\client\package.json` and run `build` script, once it finishes, run `start` script.

3. Open a browser and navigate to `http://localhost:3000`


### Project Screenshots

![Homely](https://github.com/user-attachments/assets/acd9008b-63cc-4f76-82d7-41118b4f7434)
![Homely-search](https://github.com/user-attachments/assets/89149610-7d66-4c78-a7f7-45b6fbe85f19)
![Homely-detail](https://github.com/user-attachments/assets/750dd277-7c18-4c57-9e49-3d5c3b27fbfa)
![Homely-login](https://github.com/user-attachments/assets/bbbdbf37-adfa-4e79-89d2-e11407a65d0a)
![Homely-signup](https://github.com/user-attachments/assets/be5e26ed-4eda-484c-a22e-24a443d33b45)
![Homely-profile](https://github.com/user-attachments/assets/abcfe4ea-1c2e-473e-879b-ccc7747b92c4)
![Homely-password](https://github.com/user-attachments/assets/b78ba181-f6ce-4ce7-bc17-22bcf6043ce8)
![Homely-host](https://github.com/user-attachments/assets/bf74ee85-03c8-4242-a1cb-40ed666442bd)
![Homely-travel](https://github.com/user-attachments/assets/733c5714-dbb4-428b-bcc8-99d47c5d0cb2)
![Homely-reservation](https://github.com/user-attachments/assets/c19d93a2-9c53-4546-99a6-f7b475df077d)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Typescript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Tailwind]:	https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[ElasticSearch]: https://img.shields.io/badge/Elastic_Search-005571?style=for-the-badge&logo=elasticsearch&logoColor=white
[Elastic-url]: https://www.elastic.co/
[SqlServer]: https://img.shields.io/badge/Microsoft_SQL_Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white
