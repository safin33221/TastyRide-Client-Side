import React, { useEffect, useState } from 'react';
import eid from '../../public/Eid.json'
import Lottie from 'lottie-react';
const CountDown = () => {
    const eidDate = new Date('March 31, 2025 00:00:00').getTime()
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())


    function calculateTimeLeft() {
        const now = new Date().getTime()
        const difference = eidDate - now;


        if (difference <= 0) {
            return { day: 0, hours: 0, minutes: 0, second: 0, isEid: true }
        }
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
            isEid: false,

        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
        return () => clearInterval(timer)
    }, [])
    return (
        <div className="  w-fit ">
            {/* <div className=' '>
                <Lottie className='w-full  rounded-full   h-52 ' animationData={eid} ></Lottie>
            </div> */}
            <div className='flex items-center '>

                {timeLeft.isEid ? (
                    <p className="text-xl font-semibold text-red-500 ">🎉 Eid Mubarak! 🎉</p>
                ) : (
                    <div className="flex justify-center gap-4 text-xl font-semibold black">
                        <h2 className="text-xl font-bold text-red-500 ">🕌 Eid-ul-Fitr is Almost Here!:</h2>
                        <div className=" px-1 py-2  ">{timeLeft.days} <span className="text-sm">Days</span></div>
                        <div className=" px-1 py-2  ">{timeLeft.hours} <span className="text-sm">Hours</span></div>
                        <div className=" px-1 py-2  ">{timeLeft.minutes} <span className="text-sm">Minutes</span></div>
                        <div className=" px-1 py-2  ">{timeLeft.seconds} <span className="text-sm">Seconds</span></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountDown;