import React, {useEffect, useState} from 'react';
import './App.scss';
import Header from "./components/header";
import Footer from "./components/footer";
import MoodCanvas from "./components/mood-canvas";
import Promo from "./components/promo";
import FAQ from "./components/FAQ";
import TopBurners from "./components/top-burners";
import {Helmet} from "react-helmet";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useSWR from "swr";

const fetcher = (url: string) => fetch(url)
    .then((res) => res.json())

function App() {

    const {data, error, isLoading, mutate} = useSWR(
        "https://nodes.wavesnodes.com/addresses/data/3PAmW4yzC5W9paLoBUN1K5CZU4dfMM4fkWE",
        fetcher,
        {refreshInterval: 1000}
    );

    return (
        <>
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
            <Header/>
            <Promo/>
            <MoodCanvas data={data}/>
            <TopBurners data={data}/>
            <FAQ/>
            <Footer/>
            <ToastContainer />
        </>
    )
}

export default App;
