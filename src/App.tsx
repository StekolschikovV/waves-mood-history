import React, {useState} from 'react';
import * as Sentry from "@sentry/react";
import 'react-toastify/dist/ReactToastify.css';
import '@/App.scss';
import useSWR from "swr";
import Promo from "@components/promo";
import Header from "@components/header";
import {Preloader} from "@components/preloader";
import {ToastContainer} from "react-toastify";
import MoodCanvas3 from "@components/mood-canvas3";

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
const SashaPanelLazy = React.lazy(() => import("./components/sasha-panel"))

const fetcher = (url: string) => fetch(url)
    .then((res) => res.json())

let loadedCount = 0

function App() {

    const hash = window.location.hash.replace("#", "")
    const hashNum = hash.length > 0 ? +hash : null

    const [isShowPreloader, setIsShowPreloader] = useState(true)
    const [version, setVersion] = useState<number>(hashNum || 1)

    const {data, error, isLoading, mutate} = useSWR(
        "https://nodes.wavesnodes.com/addresses/data/3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",
        fetcher,
        {refreshInterval: 50000}
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
            {/*{version === 1 && <MoodCanvasLazy data={data}/>}*/}
            {/*{version === 2 && <MoodCanvas2/>}*/}
            {/*<MoodCanvas2/>*/}
            <MoodCanvas3/>
            <TopBurnersLazy data={data}/>
            <FAQLazy/>
            <SashaPanelLazy data={data}/>
            <FooterLazy/>
            <ToastContainer/>
        </>
    )
}

export default App;
