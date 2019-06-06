function auth(r) {
    if (r.headersIn['Authorization']) {
        // Parse the HTTP Auth header to find B64Encoded string
        var _auth = r.headersIn['Authorization'].split(' ')[1];

        // Convert B64Encoded string to Username and Password
        var _decode = String.bytesFrom(_auth, 'base64').split(':');

        // Format credentials into form-based authentication
        var _creds = {
            state: {
                user_id: _decode[0],
                password: _decode[1]
            }
        }

        // Format payload for subrequest
        var _subArgs = {
            method: 'POST',
            body: JSON.stringify(_creds)
        }

        // Submit form-based auth to downstream endpoint
        r.subrequest('/api/platform/v1beta2/login', _subArgs,  function(res) {
            // Parse the JSON response
            var _response = JSON.parse(res.responseBody);

            // Check and see if authentication was succesful and if the auth token was returned
            if  (_response.state && _response.state.token) {
                r.headersOut['token'] = _response.state.token;
                // IF exepcted token was returned, return 200
                r.return(200);
            } else {
                // IF exepcted token was NOT returned, return 500
                r.return(500);
            }
        })
    } else {
        // Authorization header was not included in the request
        r.return(505);
    }
}
