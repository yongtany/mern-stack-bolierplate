import React, { useState, useEffect } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, Row, Col, Typography } from 'antd';
const { Title, Text } = Typography


function PostDetailPage(props: any) {
  const postId = props.match.params.postId;

  const [post, setPost]: any = useState([]);
  dayjs.extend(relativeTime);

  useEffect(() => {
    const variable: any = { postId }

    axios.get(`/post/${postId}`, variable)
      .then(response => {
        if(response.data.success) {
          setPost(response.data.post)
        } else {
          alert('Couldnt get post')
        }
      })
  }, [])

  if (post.writer) {
    return (
        <div>
          <div style={{ width: "100%", height: '20rem', backgroundImage: `url(${`http://localhost:5000/uploads/${post.thumbnail}`})`}} />
          <Row style={{ maxWidth: '900px', margin: '0 auto'}}>
            <Col lg={18} xs={24}>
              <div className="postPage" style={{ width: '100%', padding: '3rem' }}>
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
                Hello
              </div>
            </Col>
          </Row>
        </div>
    )
  } else {
      return (
          <div style={{ width: '100%', margin: '3rem auto' }}>loading...</div>
      )
  }
}

export default PostDetailPage;
