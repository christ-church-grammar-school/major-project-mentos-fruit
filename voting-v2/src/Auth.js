
function getAuth() {
    var authorised = fetch('/api/checkToken').then((res, err) => {
        if (res.status === 200) {
            return true
        } else {
            return false
        }})
    return authorised
}


export {
    getAuth,
}