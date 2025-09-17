import { useState, useEffect } from "react";
import axios from "axios";

export default function TimeRenderer() {
    const[currTime, setCurrTime] = useState(null);
    const[userTimeZone, setUserTimeZone] = useState(null);

    useEffect(() => {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setUserTimeZone(zone);
    }, [])

    useEffect(() => {
        if (!userTimeZone) return;

        const fetchTime = async (zone) => {
            try {
                const encodedZone = encodeURIComponent(zone);
                const res = await axios.get(`https://localhost:7048/api/Time/currtime/${encodedZone}`);

                // turn backend response into a Date object
                const { year, month, day, hour, minute, seconds } = res.data;
                const dateObj = new Date(year, month - 1, day, hour, minute, seconds);
                setCurrTime(dateObj);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTime(userTimeZone);
    }, [userTimeZone]);

    useEffect(() => {
        if (!currTime) return;

        const interval = setInterval(() => {
            setCurrTime((prev) => new Date(prev.getTime() + 1000));
        }, 1000);

        return () => clearInterval(interval);
    })

    return (
        <div className="time-container">
            {currTime && (
                <span>
                    {currTime.getDate()}/{currTime.getMonth() + 1}/{currTime.getFullYear()} -{" "}
                    {currTime.getHours().toString().padStart(2, "0")}:
                    {currTime.getMinutes().toString().padStart(2, "0")}:
                    {currTime.getSeconds().toString().padStart(2, "0")}
                </span>
            )
            }
        </div>
    )
}
