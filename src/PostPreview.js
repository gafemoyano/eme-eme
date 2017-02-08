import React, {PropTypes} from 'react';
import styled from 'styled-components';
import PostNavigation from './PostNavigation';
import {
    tablet,
    smartphone,
    borderColor,
    paddingExtraLarge,
 } from './style-variables';

const Article = styled.article`
  border-top: 1px solid ${borderColor};
  margin: .92857rem auto;
  padding: 0 0.5rem;
  position: relative;

  @media (min-width: ${tablet}px) {
    padding: 0 75px 0 0;
  }

  @media (max-width: ${smartphone}px) {
      padding-top: 4rem;
  }
`;

const PostDate = styled.time`
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 1.3px;
  font-family: 'Arial Narrow', sans-serif;
  color: rgba(18,25,33,.25);
  font-size: 0.85em;
  display: block;
  line-height: ${paddingExtraLarge};
  @media (max-width: ${smartphone}px) {
    line-height: 1em;
    margin-top: 1.8rem;
    position: absolute;
    right: 0;
    top: 0;
    }
`;
const Content = styled.div`
  @media (min-width: ${smartphone}px) {
    position: relative;
    padding-left: ${paddingExtraLarge}
  }
`;
const Wrap = styled.div`
  padding-right: 20px;
`;
const Title = styled.h3`
  font-size: 1.5em;
  line-height: 1.25em;
  margin: 0 0 0.5em;

  @media (min-width: $smartphone) {
      position: relative;
  }
`;
const Number = styled.span`
  position: absolute;
  display: block;
  font-weight: 300;
  margin: 1em 0 0.5em;
  top: 0px;

  @media (min-width: ${smartphone}px) {
    left: -1rem;
    margin: 0;
    width: 1rem;
  }
`
const TextContainer = styled.div`
  display: flex;
`
const Text = styled.div`
  flex: 0 1 auto;
`;
const AccesibilityTitle = styled.h4`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`;

const PostPreview = ({number, title, text, date, handlePlay}) => {
  const formatDate = new Date(date).toDateString();
    return(
      <Article>
          <PostDate>{formatDate}</PostDate>
          <Content>
          <Wrap>
              <Title>
              <a href="" style={{color: 'inherit'}}>
              <Number>{`#${number}`}&nbsp;</Number>
              {title}
              </a>
              </Title>
              <TextContainer>
                <Text>
                  <p style={{marginTop: '0px'}} >
                    {text.substring(0, 200)}
                    {'...'}
                  </p>
                </Text>
              </TextContainer>
          </Wrap>
          <AccesibilityTitle>Post Navigation</AccesibilityTitle>
          <PostNavigation
            handlePlay={handlePlay}
          />
          </Content>
      </Article>
    )};

PostPreview.PropTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default PostPreview;