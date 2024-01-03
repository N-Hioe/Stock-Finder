import React from 'react';
import { useState, useEffect } from 'react';

const StockNews = ({ API_KEY }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const data = await recentNews();
            setNews(data.results);
        };
        fetchNews();
    }, []);

    const recentNews = async() => {
        const API_URL = "https://api.polygon.io/v2/reference/news";
        const headers = { 'Authorization': 'Bearer ' + API_KEY.API_KEY };
        const response = await fetch(`${API_URL}`, { headers });
        const data = await response.json();
        let value;
        response.ok ? value = data : value = [];
        return value;
    };

    console.log(news);

    return(
        <div>
            {
                
                news.map((story, i) => {
                    return <li key={i}>{story.title}</li>
                })
            
            }
        </div>
    )
}

export default StockNews;