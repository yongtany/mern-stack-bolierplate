import React, { useState, useEffect } from 'react'
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Avatar, Row, Col, Typography } from 'antd';
import SidePost from '../components/SidePost/SidePost';
import Comments from '../components/Comments/Comments';
import { POST_SERVER, COMMENT_SERVER } from '../components/Config';

const { Title, Text } = Typography


function PostDetailPage(props: any) {
  dayjs.extend(relativeTime);

  const postId = props.match.params.postId;
  const [post, setPost]: any = useState([]);
  const [CommentLists, setCommentLists ]: any = useState([]);

  

  useEffect(() => {
    axios.get(`${POST_SERVER}/${postId}`)
      .then(response => {
        if(response.data.success) {
          setPost(response.data.post)
        } else {
          alert('Couldnt get post')
        }
      })

    axios.get(`${COMMENT_SERVER}/${postId}/getComments`)
      .then(response => {
        if (response.data.success) {
          setCommentLists(response.data.comments)
        } else {
          alert('Failed to get comments Info')
      }
    })
  }, [postId])

  const updateComment = (newComment: any) => {
    setCommentLists(CommentLists.concat(newComment));
  }

  if (post.writer) {
    return (
        <>
          <div style={{ maxWidth: '1200px', margin: '0 auto'}}>
            <Row>
              <Col lg={17} xs={24}>
                <div className="postPage" style={{ color: 'white', width: '100%', margin: '3rem 0 3rem 0', padding: '3rem'}}>
                  <Title style={{ color: 'white'}} level={3}>{post.title}</Title>
                  <img style={{ width: '100%' }} src={post.thumbnail} alt={post.title} />
                  <Avatar src={post.writer.image} /> 
                  <Text strong style={{ color: 'white', fontSize: '1rem', marginLeft: '0.3rem'}}>{post.writer.username}</Text>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Text style={{ color: 'white', opacity: '70%'}}>{dayjs(post.createdAt).fromNow()}</Text>
                  </div>
                  <div 
                    className="post-content"
                    style={{ marginTop: '3rem'}}
                    dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <Comments
                  CommentLists={CommentLists}
                  postId={postId}
                  refreshFunction={updateComment}
                />
              </Col>
              <Col lg={7} xs={24}>
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
