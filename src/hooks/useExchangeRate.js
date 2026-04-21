import { useState, useEffect } from "react";

export const useExchangeRate = () => {
    const [rate, setRate] = useState(1350);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                if (!res.ok) throw new Error();

                const data = await res.json();
                if (data?.rates?.KRW) {     
                    setRate(data.rates.KRW);
                }
                console.log("실시간 환율 데이터 로드 완료", data.rates.KRW);
            } catch (error) {
                console.error("팩트: 환율 로드 실패, 기본값(1350) 사용");
                setRate(1350);
            }   
        } 
        fetchRate();  
    }, []);

    return rate;
}