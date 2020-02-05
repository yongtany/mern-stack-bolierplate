import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Card } from 'antd';;
const { Meta } = Card;
function SidePost() {

    const [SidePosts, setSidePosts]: any = useState([])

    useEffect(() => {
        axios.get('/post/popular')
            .then(response => {
                if (response.data.success) {
                    console.log(response)
                    setSidePosts(response.data.posts)
                } else {
                    alert('Failed to get Posts')
                }
            })
    }, [])

    const SidePostItem = SidePosts.map(( post: any, index: number) => {
       return (
        <Card
          hoverable
          key={index}
          style={{ width: '100%', marginBottom: '2rem', padding: '0.5rem' }}
          cover={<img 
            alt="example" 
            src={`http://localhost:5000/uploads/${post.thumbnail}`} 
          />}
        >
          <Meta title={post.title} description={post.writer.username} />
        </Card>
      )
    })

    return (
        <React.Fragment>
          {SidePostItem}
        </React.Fragment>
    )
}

export default SidePost;