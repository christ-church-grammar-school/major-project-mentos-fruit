function addAttributes(user, context, callback) {
    const request = require('request');
    var identityLength = user.identities.length;
    const namespace = 'https://aad.com/';
    for (var i = 0; i < identityLength; i++) {
        if (user.identities[i].provider === 'waad') {
            //context.idToken[namespace+'access_token'] = user.identities[i].access_token;
            //context.idToken[namespace+'id'] = user.identities[i].user_id;
            request({
                url: 'https://graph.windows.net/me?api-version=1.6',
                headers: {
                    'Authorization': 'Bearer ' + user.identities[i].access_token
                }
            }, (error, response, body) => {
                var metadata = JSON.parse(response.body);
                context.idToken[namespace + 'gradYear'] = metadata.companyName;
                context.idToken[namespace + 'HouseTute'] = metadata.department;
              	context.idToken[namespace + 'YearLevel'] = metadata.jobTitle;
              	context.idToken[namespace + 'EmployeeID'] = metadata.employeeId;
                context.idToken[namespace + 'DisplayName'] = metadata.displayName;
                console.error('error:', error); // Print the error if one occurred
                //console.log(JSON.parse(response.body));
                callback(null, user, context);
            });
        }
    }
}