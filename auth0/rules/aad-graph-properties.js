function addAttributes(user, context, callback) {
    const request = require('request');
    var identityLength = user.identities.length;
    const namespace = 'https://aad.com/';
    var completion = 0;

    function requestCallback() {
        if(completion === 2) {
            callback(null, user, context);
        }
    }

    for (var i = 0; i < identityLength; i++) {
        if (user.identities[i].provider === 'waad') {
            //context.idToken[namespace+'access_token'] = user.identities[i].access_token;
            //context.idToken[namespace+'id'] = user.identities[i].user_id;
            request({
                url: 'https://graph.windows.net/me/memberOf?api-version=1.6',
                headers: {
                    'Authorization': 'Bearer ' + user.identities[i].access_token
                }
            }, (error, response, body) => {
                var metadata = JSON.parse(response.body);
                var boarding = "false";
                for (var i = 0; i < metadata.value.length; i++) {
                    if (metadata.value[i].displayName === 'BOARDING') {
                        boarding = "true";
                    }
                }
                context.idToken[namespace + 'Boarding'] = boarding;
                if (error) {
                    console.error(`MemberOfError: ${error}`);
                }
                completion ++;
                requestCallback();
            });

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
                if (error) {
                    console.error(`Me: ${error}`);
                }
                completion ++;
                requestCallback();
            });
        }
    }
}