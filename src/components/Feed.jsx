import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { searchQuery, feedQuery } from '../utils/data';

const Feed = () => {
  const [loading, setloading] = useState(false);
  const [pins, setPins] = useState(null);
  const {categoryId} = useParams();

  useEffect(() => {
    setloading(true);

    if(categoryId){
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data)=>{
          setPins(data)
          setloading(false)
        })
    }else{
      client.fetch(feedQuery)
        .then((data)=>{
          console.log("feedQuery")
          console.log(data)
          setPins(data)
          setloading(false)
        })
    }
    
  }, [categoryId]);

  if(loading) return <Spinner message="We are adding new ideas to your feed!"/>

  if(!pins?.length) <h2>No pins available</h2>

  return (
    <div>
        {pins && <MasonryLayout pins={pins}/>}
    </div>
  )
}

export default Feed