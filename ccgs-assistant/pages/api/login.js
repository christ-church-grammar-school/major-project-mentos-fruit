import auth0 from '../../lib/auth0'
import URLSafeBase64 from 'urlsafe-base64'

export default async function login(req, res) {
   try {
     await auth0.handleLogin(req, res, { redirectTo: URLSafeBase64.decode(req.query.redirect).toString('utf8'), authParams: {connection : "rgtesting123"} })
   } catch (error) {
     console.error(error)
     res.status(error.status || 500).end(error.message)
   }
}
