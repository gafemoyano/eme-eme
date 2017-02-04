import React, {PropTypes} from 'react'
import styled from 'styled-components'

const Box = styled.div`
  flex-basis: 1;
  flex: 1;
  border: 1px solid white;
  width: 60rem;
  max-width: 85vw;
  padding: 1rem 1.5rem;
  margin: 5vh;s
`;
const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
`;
const Text = styled.p`
  text-align: justify;
`;
const PostPreview = ({title, text}) =>(
  <Box>
    <Title>
      {title}
    </Title>
    <Text>
      {text.substring(0, 500)}
      {'...'}
    </Text>
    <a href="#">Continue reading</a>
  </Box>
);

PostPreview.PropTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default PostPreview;