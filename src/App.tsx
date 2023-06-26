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


function App() {
    return (
        <>
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
