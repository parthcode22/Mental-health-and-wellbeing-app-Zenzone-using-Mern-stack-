import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import axios from 'axios';

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/posts'); // Adjust the URL if needed
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle new post submission
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPost.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:8000/api/posts', {
          content: newPost,
          author: 'User', // Adjust as needed
        });
        setPosts([response.data, ...posts]);
        setNewPost('');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Community Forum
      </Typography>
      
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <form onSubmit={handlePostSubmit}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Write your post here..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
        </form>
      </Paper>

      <List>
        {posts.map((post) => (
          <ListItem key={post._id} alignItems="flex-start" sx={{ marginBottom: 2 }}>
            <ListItemText
              primary={
                <React.Fragment>
                  <Avatar sx={{ marginRight: 1, display: 'inline-block', verticalAlign: 'middle' }}>
                    {post.author[0]}
                  </Avatar>
                  <Typography component="span" variant="body1" color="text.primary">
                    {post.author}
                  </Typography>
                  <Typography component="span" variant="body2" color="text.secondary" sx={{ marginLeft: 1 }}>
                    {new Date(post.timestamp).toLocaleString()}
                  </Typography>
                </React.Fragment>
              }
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {post.content}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommunityForum;
