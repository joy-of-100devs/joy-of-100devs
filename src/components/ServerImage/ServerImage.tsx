import axios from 'axios';
import * as React from 'react';
import NextImage from 'next/image';
import {ErrorBoundary} from "react-error-boundary";

const axiosInstance = axios.create({
    baseURL: new URL("/api", process.env.NEXT_PUBLIC_ASSET_SERVER_URL).toString()
})

interface ImageProps {
    slug: string,
    className?: string,
    alt: string,
}

function ServerImage(props: ImageProps) {
    return <ErrorBoundary fallback={<p>Error!</p>} >
        <React.Suspense fallback={<p>Loading...</p>}>
            <_Image {...props}></_Image>
        </React.Suspense>
    </ErrorBoundary>;
}

async function _Image(props: ImageProps) {
    let asset;
    try {
        asset = await axiosInstance.get<{
            success: boolean,
            data: {
                width: number,
                height: number,
                url: string,
            }
        }>(props.slug).then(res => res.data)
    } catch (e) {
        throw new Error(`Failure to get file ${props.slug}`)
    }

    return <NextImage src={asset.data.url} width={asset.data.width} height={asset.data.height} alt={props.alt}
                      className={`${props.className || ''} rounded-[8px] mx-auto my-4`}></NextImage>;
}


export default ServerImage;
