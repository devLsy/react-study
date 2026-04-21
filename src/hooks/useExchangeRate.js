import { useState, useEffect } from "react";

export const useExchangeRate = () => {
    const [rate, setRate] = useState(1350);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await res.json();
                setRate(data.rates.KRW);
                console.log("실시간 환율 데이터 로드 완료", data.rates.KRW);
            } catch (error) {
                console.error("환율 데이터 불러오기 실패:", error);
            }
        } 
        fetchRate();  
    }, []);

    return rate;
}