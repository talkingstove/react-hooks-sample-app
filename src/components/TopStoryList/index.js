import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Story from '../Story';
import { Button } from 'reactstrap';

export default function TopStoryList(props) {

  const paginationSize = 30;
  const maxPage = Math.round(500/paginationSize) - 1; //account for pages being 0 indexed

  const [topStoriesIds, setTopStoriesIds] = useState([]);
  const [stories, setStories] = useState([]); //story details fetched by id from API
  const [currentPaginationPage, setCurrentPaginationPage] = useState(0);
  
  useEffect(() => {
    const fetchTopStories = async () => {
      const result = await axios(
        'https://hacker-news.firebaseio.com/v0/topstories.json'
      );
      
      setTopStoriesIds(result.data);

      const startIndex = paginationSize * currentPaginationPage;
      const endIndex = startIndex + paginationSize;

      const newStoryArray = [];

      //ater getting the ids, get the first page's stories in a series of data
      for (let i=startIndex; i<endIndex; i++) {
        const thisStoryId = result.data[i];

        if (thisStoryId) {
          const thisStoryResult = await axios(
            `https://hacker-news.firebaseio.com/v0/item/${thisStoryId}.json`            
          );

          newStoryArray[i] = thisStoryResult.data; //preserver order
        }
      }

      setStories(newStoryArray);
    };

    fetchTopStories(); //execute
  }, [currentPaginationPage]);

  const decrementPage = () => {
    if (currentPaginationPage > 0) {
      setStories([]);
      setCurrentPaginationPage(currentPaginationPage - 1);
    }
    else {
      alert('Already on first page!')
    }
  }

  const incrementPage = () => {
    if (currentPaginationPage < maxPage) {
      setStories([]);
      setCurrentPaginationPage(currentPaginationPage + 1);  
    }
    else {
      alert('On last page!')
    } 
  }

  const pagination = <div className="pagination">
    <Button onClick={decrementPage}>
      PREVIOUS PAGE
    </Button>
    <div className="pagination-pagenumber">
      Page {currentPaginationPage + 1}
    </div>
    <Button onClick={incrementPage}>
      NEXT PAGE
    </Button>
  </div>;

  return (
    <div>
      {pagination}
      <ul>
        {!stories.length ? 
          <div>
            loading stories...
          </div>
          : null
        }
        {stories.map(item => (
          <Story key={item.id} storyData={item} showThreadView={props.showThreadView} />
        ))}
      </ul>
      {pagination}
    </div>
  );
}
