import * as React from 'react'
import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}


