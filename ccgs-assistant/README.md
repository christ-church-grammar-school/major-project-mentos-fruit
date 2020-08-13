
## Getting Started

### Auth0 Configuration

Create a **Regular Web Application** in the [Auth0 Dashboard](https://manage.auth0.com/). If you're using an existing application you'll want to verify that the following settings are configured as follows:

- **Json Web Token Signature Algorithm**: `RS256`
- **OIDC Conformant**: `True`

Go ahead and configure the URLs for your application:

- **Allowed Callback URLs**: http://localhost:3000/api/callback
- **Allowed Logout URLs**: http://localhost:3000/

Take note of the **Client ID**, **Client Secret** and **Domain** of your application because you'll need it in the next step.

Also update Auth0 rules with files present under ```major-project-mentos-fruit/auth0/rules``` to expose the Microsoft Graph API values.

#### Runtime Configuration

Please replace the ```.env.dummy``` with a ```.env.local``` file containing your auth0 values.

### Nextjs

#### Running Project

Now run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## --Nextjs Bootstrapped--

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
