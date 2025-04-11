import React, { useEffect, useState } from 'react';

const Countdown = ({ lockUntil }) => {

    const [timeLeft, setTimeLeft] = useState(getRemainingTime());

    function getRemainingTime() {
        const diff = new Date(lockUntil) - new Date(); // ms
        return diff > 0 ? diff : 0;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = getRemainingTime();
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lockUntil]);

    const formatTime = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return (
        <>
            {
                timeLeft  &&
                <p className='text-red-500'>
                    🚫 Account is locked. Try again in {formatTime(timeLeft)} minutes.
                </p>
            }
        </>
    );
};

export default Countdown;