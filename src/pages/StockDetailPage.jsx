import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import finnHub from "../api/finnHub"
import { StockChart } from "../components/StockChart"

const formatData = (data) =>{
    return data.t.map((el,index)=>{
        return{
            x:el *1000, //because the api doesnt in second
            y:data.c[index]

        }
    })
}
export const StockDetailPage =() =>{
    const {symbol} = useParams()
    const [chartData, setChartData] = useState() 

    useEffect(() => {
        const fetchData = async() =>{
            const date = new Date()
            const currentTime = Math.floor(date.getTime()/1000)
            let oneDay
            //const oneDay = currentTime - 60*60*24;
            //const oneWeek = currentTime - 60*60*24*7;

            if(date.getDay() === 6){
                oneDay = currentTime - 2*60*60*24;//get Friday's data
            }
            else if (date.getDay() === 0){
                oneDay = currentTime - 3*60*60*24;//get Friday's data
            }
            else{
                oneDay = currentTime - 60*60*24;//get yesterday's data
            }

            const oneWeek = currentTime - 60*60*24*7;
            const oneYear = currentTime - 60*60*24*365;
            
            try{
                const responses =await Promise.all([
                    finnHub.get("/stock/candle",{
                        params:{
                            symbol,
                            from:oneDay,
                            to:currentTime, 
                            resolution:30 // every 30mins
                        }
                    }),
                    finnHub.get("/stock/candle",{
                        params:{
                            symbol,
                            from:oneWeek,
                            to:currentTime, 
                            resolution:60 //per hour
                        }
                    }),
                    finnHub.get("/stock/candle",{
                        params:{
                            symbol,
                            from:oneYear,
                            to:currentTime, 
                            resolution: "W" //weekly,"D"everyday
                        }
                    })])
            console.log(responses)
            
            setChartData({
                day: formatData(responses[0].data),
                week:formatData(responses[1].data),
                year:formatData(responses[2].data)
            })
            }catch(err){
                console.log(err)
            }

            
        }
        fetchData()
    },[symbol])
    return <div>{           
        chartData && (<div>
            <StockChart charData={chartData} symbol={symbol}/>
            </div>)//if chartData is not null (have value) then render out this data, if chartData is null return null
        }
    </div>
}