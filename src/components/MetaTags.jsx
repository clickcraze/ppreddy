import React from 'react'
import { Helmet } from 'react-helmet'

const MetaTags = ({ meta = {} }) => {
    const canonicalUrl = `https://www.ppreddyrehabcare.com${window.location.pathname}`;
    return (
        <>
            <Helmet>
                <title>{meta.meta_title}</title>
                <meta name='description' content={meta.meta_description} />
                <meta name='keywords' content={meta.meta_keywords} />
                <link rel="canonical" href={canonicalUrl} />
                <meta name="robots" content="index" />
                <meta name="google-site-verification" content="S3GW3sqiNniTa6xVvul8fQ727MrhNvFVeC0SLQP5M4s" />
            </Helmet>
        </>
    )
}

export default MetaTags