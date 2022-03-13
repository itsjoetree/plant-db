import Head from "next/head"
import Link from "next/link"

function SomethingWentWrong() {
    return (
        <>
            <Head>
                <title>Not Found - Plant DB</title>
            </Head>

            <div className="text-center">
                <h2>Something went wrong!</h2>

                <p>
                    It appears that there was an issue processing your request.
                </p>

                <div className="m-2">
                    <Link href="/">
                        <a className="btn btn-dark btn-responsive mx-auto">Go Home</a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SomethingWentWrong