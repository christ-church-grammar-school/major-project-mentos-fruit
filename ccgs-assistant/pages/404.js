import Error from 'next/error'

function LostPage({ statusCode }) {
    return <Error statusCode={404}/>
}

LostPage.getLayout = page => {return page}

export default LostPage