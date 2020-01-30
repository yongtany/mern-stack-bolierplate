import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {
    return (
        <>
        <div className="app">
            <FaCode style={{ fontSize: '4rem' }} /><br />
            <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
        </div>
        <div style={{ float:'right', marginRight: '2rem' }}>Thanks For Using This BoilerPlate by Yongtany</div>
        </>
    )
}

export default LandingPage;