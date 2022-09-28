
<h2>
    Requirement
</h2>
<ol>
    <li>Make sure you have the latest stable versions for Node.js , YARN & NPM installed</li>
    <li>Postgesql v14</li>
    
</ol>

---

<h2>
    Installation
</h2>
<p>
    <li>Clone repository: <code>git clone https://github.com/lookmann30/restaurant.git</code></li>
</p>

### Frontend

First, install dependency:

```bash
npm install
# or
yarn add
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


### Backend

First, install dependency:

```bash
npm install
```

Second, run server:

```bash
node server.js
```
or use [nodemon](https://github.com/remy/nodemon)
```bash
nodemon server.js
```

Server is running on port 3001

### Database
> Don't forget install [Postgresql](https://www.postgresql.org/download/)

<ol>
    <li>Start pgAdmin 4 client</li>
    <li>Open menu tools and choose Import/Export Servers</li>
    <li>Import/Export : select file db.json and click next</li>
    <li>Database Servers : select Servers include PostgresSQL14 click next</li>
    <li>Summary : click finnish</li>
    <li>Connect to server with password "P@ssw0rd"</li>
</ol>
