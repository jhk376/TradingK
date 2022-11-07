import { useState, useEffect } from "react"
import finnHub from "../api/finnHub"

export const StockList =() =>{
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"])
    const [stock, setStock]=useState([])

    useEffect(()=>{
        let isMounted = true
        const fetchData =async() =>{
            const responses = []
            try{
                const responses = await Promise.all(
                watchList.map((stock)=>{
                    return finnHub.get("/quote", {
                        params:{
                            symbol:stock
                        }
                    })
                })
                )
                console.log(responses)
                const data = responses.map((response) => {
                    return{data: response.data,
                    symbol: response.config.params.symbol 
                    }
                })
                console.log(data)
                if (isMounted){
                setStock(responses)
            }
            }catch(err){

            }
        }
        fetchData()
        return () => (isMounted=false)
    },[])

    return <div>StockList</div>
}
