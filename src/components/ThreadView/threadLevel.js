import React, { useState, useEffect } from 'react';
import '../../index.css';
import axios from 'axios';
import renderHTML from 'react-render-html';

export default function ThreadLevel(props) {

 	const kids = props.kids || [];
 	const [kidsContents, setKidsContents] = useState([]); //story details fetched by id from API
  
  useEffect(() => {
    const fetchKidsContents = async () => {
      
      //use "kid" ids to get their contents
      if (kids) {
        setKidsContents([]);

	      for (let i=0; i<kids.length; i++) {
	        const thisKidId = kids[i];

	        const thisKidResult = await axios(
	          `https://hacker-news.firebaseio.com/v0/item/${thisKidId}.json`            
	        );
	        
	        setKidsContents(oldArray => [...oldArray, thisKidResult.data]);
	      }
	    }
    };

    fetchKidsContents(); //execute
  }, [kids]);

  const classes = 'threaded-comment nested-' + String(props.nesting);

  const addBlankTargets = (s) => {
    return (""+s).replace(/<a\s+href=/gi, '<a target="_blank" href=');
  } 

  const renderCommentHtml = (txt) => {
    let html = null;

    try {
      html = renderHTML('<div>' + addBlankTargets(txt) + '</div>');
    }
    catch(e) {
      console.error(e);
    }
    finally {
      //return plain text as fallback, since parsing html from text is always risky
      return html ? html : txt;
    }  
  }

  return (
    <div>
      {kidsContents.map(kidItem => (
        <div key={kidItem.id}>
          {kidItem.type === 'comment' ?
        	<div key={kidItem.id} className={classes}>    		
          	<div className="author">
          		by: {kidItem.by}
          	</div>
          	<div className="time">
          		at: {new Date(kidItem.time * 1000).toString()}
          	</div>
          	<div>
          		{renderCommentHtml(kidItem.text)}            
          	</div>

          	{kidItem.kids && kidItem.kids.length ?
        			<ThreadLevel nesting={props.nesting + 1} kids={kidItem.kids} />
        			: null}
          </div>
          : null}
        </div>
      ))}
    </div>
  );
}
