
function getAuth() {
    var authorised = fetch('/api/checkToken').then((res, err) => {
        if (res.status === 200) {
            return res.json()
        } else {
            return {loggedIn: false}
        }})
    return authorised
}

function logout() {
    var ok = fetch('/api/logout').then((res, err) => {
        if (res.status === 200) {
            return true
        } else {
            return false
        }})
    return ok
}

export {
    getAuth,
    logout
}