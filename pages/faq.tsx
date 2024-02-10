import Accordion from "components/support/FAQAccordion";
import Head from "next/head";

const FAQ = () => {
    return (
        <>
            <Head>
                <title>
                    NorthExpress | Travel with comfort.
                    Comfortable. Efficient. Affordable .
                    At North Express, we are redefining the luxury transport, and setting new standards of excellence and reliability.

                    |Travel with comfort.
                    Comfortable. Efficient. Affordable .
                    At North Express, we are redefining the luxury transport, and setting new standards of excellence and reliability.

                    |Travel with comfort.
                    Comfortable. Efficient. Affordable .
                    At North Express, we are redefining the luxury transport, and setting new standards of excellence and reliability.


                </title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                    name="description"
                    content="NorthExpress is your one-stop destination for finding the right bookings and talented taskers. Post any booking, pick the best person, and get it done. Join now to earn money as a tutor or post your bookings for free."
                />
                <meta name="keywords" content="NorthExpress, bookings, tutor, earn money, post booking" />
                <meta name="author" content="NorthExpress" />
                <meta name="robots" content="index, follow" />
                <meta name="og:title" property="og:title" content="NorthExpress | Get More Done" />
                <meta
                    name="og:description"
                    property="og:description"
                    content="NorthExpress is your one-stop destination for finding the right bookings and talented taskers. Post any booking, pick the best person, and get it done. Join now to earn money as a tutor or post your bookings for free."
                />
                <meta name="og:image" property="og:image" content="public/sync-my-socials-logo.png" />

                <meta name="og:url" property="og:url" content="https://www.northexpresskenya.com" />
            </Head>

            <div className="container mx-auto p-4">
                <Accordion />
            </div>
        </>
    );
};

export default FAQ;
