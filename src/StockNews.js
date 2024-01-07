import React from 'react';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import './App.css';

const StockNews = ({ API_KEY }) => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const recentNews = async() => {
            const API_URL = "https://api.polygon.io/v2/reference/news";
            const headers = { 'Authorization': 'Bearer ' + API_KEY.API_KEY };
            const response = await fetch(`${API_URL}`, { headers });
            const data = await response.json();
            let value;
            response.ok ? value = data : value = [];
            return value;
        };

        const fetchNews = async () => {
            const data = await recentNews();
            setNews(data.results);
        };

        fetchNews();
    }, [API_KEY]);

    return(
        <div className="card-container">
            {
                news.map((story, i) => {
                    return (
                    <Card sx={{ maxWidth: 350, minHeight: 350 }} key={i}>
                        <CardActionArea onClick={
                            () => {
                                window.open(story.article_url, "_blank")
                            }
                        }>
                          <CardMedia
                            component="img"
                            height="200"
                            image={ story.image_url }
                            alt={ story.title }
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="div" className="card-text">
                              { story.title }
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="card-text">
                              {
                                story.description
                              }
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    )
                })
            
            }
        </div>
    )
}

export default StockNews;