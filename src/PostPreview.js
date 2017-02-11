import React, { PropTypes, Component } from 'react';
import styled from 'styled-components';
import PostNavigation from './PostNavigation';
import { getMediaURL } from './utils';
import {
  tablet,
  smartphone,
  borderColor,
  paddingExtraLarge,
  lightGrey,
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
`;
const TextContainer = styled.div`
  display: flex;
`;
const Text = styled.div`
  flex: 0 1 auto;
`;
const PostImage = styled.img`
  box-shadow: 10px 10px 0 ${lightGrey};
  margin: 0;
  position: absolute;
  right: -85px;
  @media (max-width: ${tablet}px){
      display: none;
  }
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

class PostPreview extends Component {
  static propTypes = {
    post: PropTypes.shape({
      art: PropTypes.string.isRequired,
      artist: PropTypes.string.isRequired,
      audio: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      song: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      video: PropTypes.string.isRequired,
      week: PropTypes.number.isRequired,
    }).isRequired,
    postKey: PropTypes.string.isRequired,
    handlePlay: PropTypes.func.isRequired,
  };

  state = {
    artUrl: '',
  };
  async componentDidMount() {
    try {
      const artUrl = await getMediaURL(this.props.post.art);
      this.setState({ artUrl: artUrl });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { post, postKey, handlePlay } = this.props;
    const { date, week, artist, song, text } = post;
    const formatDate = new Date(date).toDateString();
    const title = `${artist} - ${song}`;

    return (
      <Article>
        <PostDate>{formatDate}</PostDate>
        <Content>
          <Wrap>
            <Title>
              <a href="" style={{ color: 'inherit' }}>
                <Number>{`#${week}`}&nbsp;</Number>
                {title}
              </a>
              <PostImage src={this.state.artUrl} width="75" height="75" />
            </Title>
            <TextContainer>
              <Text>
                <p style={{ marginTop: '0px' }}>
                  {text.substring(0, 200)}
                  {'...'}
                </p>
              </Text>
            </TextContainer>
          </Wrap>
          <AccesibilityTitle>Post Navigation</AccesibilityTitle>
          <PostNavigation handlePlay={handlePlay} post={post} postKey={postKey} />
        </Content>
      </Article>
    );
  }
}

export default PostPreview;
