import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Row, Col, Card, Icon, Avatar, Typography } from 'antd';
import SidePost from '../components/SidePost/SidePost';

const { Text, Title } = Typography;
const { Meta } = Card;

function PostListPage() {

  const [posts, setPosts]: any = useState([]);
  dayjs.extend(relativeTime);

  useEffect(() => {
    axios.get('/post')
      .then(response => {
        if(response.data.success) {
          setPosts(response.data.posts)
        }
      })
  }, [])

  const renderCards = posts.map((post: any, index: any) => {
    return (
      <Link to={`/post/${post._id}`} key={index}>
        <Card 
          hoverable
          style={{ marginBottom: '2rem' }}
          cover={
            <div style={{padding: '1rem 1rem 0 1rem' }}>
              <Title level={4}>Dev</Title>
              <hr style={{ borderTop: '0.4px solid #E7EAF1'}} />
              <img
                style={{width: '100%'}}
                alt="example"
                src={`http://localhost:5000/uploads/${post.thumbnail}`}
              />
              <div style={{paddingTop: '1rem'}}>
                <Avatar src={post.writer.image} /> 
                <Text strong style={{fontSize: '1rem', marginLeft: '0.3rem'}}>{post.writer.username}</Text>
                <Text style={{ marginLeft: '1rem', opacity: '50%'}}>{dayjs(post.createdAt).fromNow()}</Text>
              </div>
            </div>
        }
        >
        <Meta
          title={<Title level={4}>{post.title}</Title>}
          description={
            <div>
              <Icon type="message" key="message" /> 417 comments
              <Icon style={{ marginLeft: '1rem'}} type="like" key="like" /> 27 Likes 
              <Icon style={{ marginLeft: '1rem'}}type="eye" key="eye" /> {post.views} Views
            </div>
           }
          />
        </Card>
      </Link>
    )
  })

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto'}}>
      <Row>
        <Col lg={18} xs={24}>
          <div className="postPage" style={{ width: '100%', marginTop: '3rem'}}>
            <Text>Recents posts</Text>
            <br />
            <br />
            {renderCards}
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <div style={{padding: '3rem 1rem'}}>
            <Text>Popular posts</Text>
            <br />
            <br />
            <SidePost />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default PostListPage;
