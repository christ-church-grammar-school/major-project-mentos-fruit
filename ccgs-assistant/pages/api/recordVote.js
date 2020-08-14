import auth0 from '../../lib/auth0'

export default async function me(req, res) {
    const session = await auth0.getSession(req)
    if (!session || !session.user) {
        res.status(401).end()
        
    } else { // User is logged in
        console.log(req.body)
        console.log(session.user)
        res.status(200).end()
    }
}
