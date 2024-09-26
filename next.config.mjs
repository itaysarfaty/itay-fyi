import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        appIsrStatus: false,
    },
}

export default withPayload(nextConfig)
