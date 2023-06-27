import React, {useState} from 'react';
import './App.scss';
import Header from "./components/header";
import Promo from "./components/promo";
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
