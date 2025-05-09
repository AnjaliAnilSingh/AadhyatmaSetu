import React from 'react'
import mandalaHome from '../assets/mandalaHome.png'

const Slogan = () => {
    return (
        <div className="flex items-center justify-center h-[250px] relative">
            <img
                src={mandalaHome}
                alt="logo"
                className="h-[230px] w-[230px]"
            />
            <div className="absolute text-[#482B19] text-center font-bold">
                <p className="text-4xl">We're dedicated</p>
                <p className="text-3xl">to bring light in your <br/> life & make you feel better.</p>
            </div>
        </div>
    )
}

export default Slogan
