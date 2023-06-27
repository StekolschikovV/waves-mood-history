import React, {useState} from 'react';
import './App.scss';
import Header from "./components/header";
import Promo from "./components/promo";
import {Helmet} from "react-helmet";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useSWR from "swr";
import {Preloader} from "./components/preloader";

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
            <Helmet>
                <meta property="og:title" content="Waves Mood History: Draw, Burn, and Shape History Together"
                      data-rh="true"/>
                <meta property="og:title" content="Waves Mood History: Draw, Burn, and Shape History Together"/>
                <meta property="og:description"
                      content="Immerse yourself in the captivating world of Waves Mood History. Collaborate in real-time, express your feelings through art, and witness the power of burning tokens as strokes on the canvas. Shape a unique history of emotions, where each stroke becomes a permanent mark on the blockchain. Join us and be part of a revolutionary artistic journey."
                      data-rh="true"/>
                <meta property="description"
                      content="Immerse yourself in the captivating world of Waves Mood History. Collaborate in real-time, express your feelings through art, and witness the power of burning tokens as strokes on the canvas. Shape a unique history of emotions, where each stroke becomes a permanent mark on the blockchain. Join us and be part of a revolutionary artistic journey."/>
                <meta property="og:image"
                      content="https://raw.githubusercontent.com/StekolschikovV/waves-mood-hostory/main/public/og-image-2.png"
                      data-rh="true"/>
                <title>Waves Mood History</title>
            </Helmet>
            <Header onLoaded={onLoadedHandler}/>
            <Promo onLoaded={onLoadedHandler}/>
            <MoodCanvasLazy data={data}/>
            <TopBurnersLazy data={data}/>
            <FAQLazy/>
            <FooterLazy/>
            <ToastContainer />
        </>
    )
}

export default App;
