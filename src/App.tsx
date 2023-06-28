import React, {useState} from 'react';
import * as Sentry from "@sentry/react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useSWR from "swr";
import './App.scss';
import Header from "./components/header";
import Promo from "./components/promo";
import {Preloader} from "./components/preloader";

// const TRACKING_ID = "G-JNWMFZRRK5"; // OUR_TRACKING_ID
// ReactGA.initialize(TRACKING_ID);

Sentry.init({
    dsn: "https://9cc1778cd77d43fbbc0d206de3230437@o4505432426479616.ingest.sentry.io/4505432432443392",
    integrations: [
        new Sentry.BrowserTracing({
            // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ["localhost", /^https:\/\/waves-mood-history\.com/],
        }),
        new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const MoodCanvasLazy = React.lazy(() => import("./components/mood-canvas"))
const TopBurnersLazy = React.lazy(() => import("./components/top-burners"))
const FAQLazy = React.lazy(() => import("./components/FAQ"))
const FooterLazy = React.lazy(() => import("./components/footer"))

const fetcher = (url: string) => fetch(url)
    .then((res) => res.json())

let loadedCount = 0

function App() {

    const [isShowPreloader, setIsShowPreloader] = useState(true)

    const {data, error, isLoading, mutate} = useSWR(
        "https://nodes.wavesnodes.com/addresses/data/3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",
        fetcher,
        {refreshInterval: 1000}
    );

    const onLoadedHandler = () => {
        loadedCount = loadedCount + 1
        if (loadedCount > 1)
            setTimeout(() => {
                setIsShowPreloader(false)
            }, 1500)
    }

    return (
        <>
            <Preloader isShow={isShowPreloader}/>
            <Header onLoaded={onLoadedHandler}/>
            <Promo onLoaded={onLoadedHandler}/>
            <MoodCanvasLazy data={data}/>
            <TopBurnersLazy data={data}/>
            <FAQLazy/>
            <FooterLazy/>
            <ToastContainer/>
        </>
    )
}

export default App;
