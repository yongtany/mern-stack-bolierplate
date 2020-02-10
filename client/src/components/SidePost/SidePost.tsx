import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link  } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, Typography } from 'antd';
import { POST_SERVER } from '../Config';
const { Text } = Typography;

function SidePost() {
    dayjs.extend(relativeTime);
    const [SidePosts, setSidePosts]: any = useState([])

    useEffect(() => {
        axios.get(`${POST_SERVER}/popular`)
            .then(response => {
                if (response.data.success) {
                    setSidePosts(response.data.posts)
                } else {
                    alert('Failed to get Posts')
                }
            })
    }, [])

    const SidePostItem = SidePosts.map(( post: any, index: number) => {
       return (
        <div style={{ display: 'flex', margin: '1.5rem 0 1.5rem 0'}} key={index}>
          <Link to={`/post/${post._id}`}>
            <Avatar 
              src={post.thumbnail} 
              alt={post.title} 
              style={{
                width: '4rem',
                height: '4rem'
              }}
            />
          </Link>
          <div style={{ paddingLeft: '0.5rem' }}>
            <Text>{post.title}</Text>
            <br />

            <Text style={{ marginTop: '1rem', fontSize: '0.8rem',opacity: '60%'}}>{dayjs(post.createdAt).fromNow()}</Text>
          </div>
        </div>
      )
    })

    return (
        <div style={{ backgroundColor: 'white', padding: '1rem'}}>   
          {SidePostItem}
        </div>
    )
}

export default SidePost;