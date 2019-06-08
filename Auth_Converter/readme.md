This is an example application that demonstrates converting Basic Authentication to Forms Based Auth and seamlessly passes the HTTP cookie to any upstream server.

NJS is used to
1. Send HTTP subrequest to /login.php to generate cookie (PHPSESSID) with a unique session id
2. Insert PHPSESSID as an HTTP cookie for future requests
⋅⋅* auth_request_set starts with an empy value and is updated with PHPSESSID value
3. Convert Basic Auth creds to the required format for Forms Based Auth and submit to /login.php

To start this application run the following command
- docker-compose up -d

```bash
 curl 127.0.0.1/index.php --user 'admin:password'
```
