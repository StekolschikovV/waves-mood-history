import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import {ProviderKeeper} from "@waves/provider-keeper";
import {InvokeArgs, Signer} from "@waves/signer";
import useSWR from "swr";
import Header from "./components/header";
import Footer from "./components/footer";
import MoodCanvas from "./components/mood-canvas";
import Promo from "./components/promo";
import TimeMachine from "./components/time-machine";
import FAQ from "./components/FAQ";
import TopBurners from "./components/top-burners";
import {Helmet} from "react-helmet";


function App() {
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
            <MoodCanvas/>
            {/*/!*<TimeMachine/>*!/*/}
            <TopBurners/>
            <FAQ/>
            <Footer/>
        </>
    )
}

export default App;
