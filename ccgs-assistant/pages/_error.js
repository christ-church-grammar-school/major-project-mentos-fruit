import Error from 'next/error'

function ErrorPage({ statusCode }) {
    return <Error statusCode={statusCode}/>
}
  
ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

// Removes nav bar at error page
ErrorPage.getLayout = page => {return page}

export default ErrorPage