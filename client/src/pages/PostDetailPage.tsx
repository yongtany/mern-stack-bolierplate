import React, { useState, useEffect } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, Row, Col, Typography } from 'antd';
import SidePost from '../components/SidePost/SidePost';
import { POST_SERVER } from '../components/Config';
const { Title, Text } = Typography


function PostDetailPage(props: any) {
  const postId = props.match.params.postId;

  const [post, setPost]: any = useState([]);
  dayjs.extend(relativeTime);

  window.scrollTo(0,0);

  useEffect(() => {
    const variable: any = { postId }

    axios.get(`${POST_SERVER}/${postId}`, variable)
      .then(response => {
        if(response.data.success) {
          setPost(response.data.post)
        } else {
          alert('Couldnt get post')
        }
      })
  }, [postId])

  if (post.writer) {
    return (
        <>
          <div style={{ width: "100%", height: '20rem', backgroundImage: `url(${post.thumbnail})`}} />
          <div style={{ maxWidth: '900px', margin: '0 auto'}}>
            <Row>
              <Col lg={18} xs={24}>
                <div className="postPage" style={{ width: '100%', margin: '3rem 0 3rem 0', padding: '3rem', backgroundColor: 'white' }}>
                  <Title level={3}>{post.title}</Title>
                  <br />
                  <Avatar src={post.writer.image} /> 
                  <Text strong style={{fontSize: '1rem', marginLeft: '0.3rem'}}>{post.writer.username}</Text>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Text style={{opacity: '70%'}}>{dayjs(post.createdAt).fromNow()}</Text>
                  </div>
                  <div 
                    style={{marginTop: '3rem'}}
                    dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>
              </Col>
              <Col lg={6} xs={24}>
                <div style={{padding: '3rem 1rem'}}>
                  <SidePost />
                </div>
              </Col>
            </Row>
          </div>
        </>
    )
  } else {
      return (
          <div style={{ width: '100%', margin: '3rem auto' }}>loading...</div>
      )
  }
}

export default PostDetailPage;
