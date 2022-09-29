
<h2>
    System usage
</h2>
<ol>
    <li>Make sure you have the latest stable versions for Node.js , YARN & NPM installed</li>
    <li> MAMP(https://www.mamp.info/en/downloads/) v6.6 (Mac OSX)/ MAMP v5.0.5 (Windows)</li>
    <li>PHP v8.1.8</li>
    <li>Composer v2.4.2</li>
    <li>mysql v5.7.34 (include MAMP)</li>
</ol>

---

<h2>
    Installation
</h2>
<p>
    <li>Clone repository: <code>git clone https://github.com/lookmann30/restaurent_laravel.git</code></li>
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

1. Clone repository: <code>git clone https://github.com/lookmann30/restaurent_laravel.git</code>

2. Create project laravel in MAMP path htdocs <code>composer create-project laravel/laravel restaurent_backend <project name></code>

3. Copy all file in database/migrations from repo to database/migrations

4. Create database name 'laravel_restaurent' in mysql

5. change database detail in .env


```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=8889(MacOS)/3306(windows)
DB_DATABASE=laravel_restaurent
DB_USERNAME=root
DB_PASSWORD=root
```

6. type <code>php artisan migrate</code> in terminal

7. type <code>composer require php-open-source-saver/jwt-auth</code> in terminal

8. type <code>php artisan vendor:publish --provider="PHPOpenSourceSaver\JWTAuth\Providers\LaravelServiceProvider"</code> in terminal

9. type <code>php artisan jwt:secret</code> in terminal

10. Copy config/auth.php from repo to config/auth.php

11. Copy all file in app/Models from repo to app/models replace all

12. Copy all file in app/http/controllers from repo to app/http/controllers replace all

13. Copy file routes/api.php from from repo to replace routes/api.php

14. import menu.sql and users.sql to tables on database

15. Type <code>php artisan serve</code> to run server
