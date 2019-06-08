This is an example php application made up of two docker containers (NGINX/PHPFM) and listens on HTTP 8080.

The application uses forms-based authentication to protect index.php.

Example credentials for /login.php
* Username = admin
* Password = password

To start this application run the following command
- docker-compose up -d
