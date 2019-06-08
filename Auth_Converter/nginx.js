function basic_to_forms(r) {
    // Only enter this section if Auth header included in request
    if (r.headersIn['Authorization']) {
        // Parse the HTTP Auth header to find B64Encoded string
        var _auth = r.headersIn['Authorization'].split(' ')[1];

        // Convert B64Encoded string to Username and Password
        var _decode = String.bytesFrom(_auth, 'base64').split(':');

        // Generate PHP Session Cookie
        r.subrequest('/login.php', {method: 'GET'}, function(res_a) {
            r.variables.session_cookie = 'PHPSESSID=' + res_a.variables.upstream_cookie_phpsessid;

            // Enable for debugging of data sent to login endpoint
            // njs_subrequest happens after proxy_set_header, echo.php displays
            // information missed by headersOut

            // r.subrequest('/echo.php', {method: 'GET'}, function(a) {
            //     r.log(a.responseBody);
            // })

            // Format credentials into form-based authentication
            var _body =  'username='+_decode[0]+'&password='+_decode[1];

            // Format arguments for subrequest
            var _subArgs = {
                method: 'POST',
                body: _body
            }

            // Update PHP session to an authenticated state
            r.subrequest('/login.php', _subArgs, function(res_b) {
                // Store PHP Cookie as an HTTP Header so it can be used by auth_request_set
                r.headersOut['session_cookie'] = r.variables.session_cookie;
                // Successfully complete auth_request with 200 status
                r.return(200);
            })
        })
    } else {
        // Authorization header was not included in the request
        r.return(505);
    }
}
