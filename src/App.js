import React, { Component } from 'react';
import styled from 'styled-components';
import PostPreview from './PostPreview';
import firebase from 'firebase';
import Player from 'react-dock-player/lib/';
import { tablet } from './style-variables';

const NavBar = styled.header`
  display: flex;
  flex-direction: row;
  background-color: #121921;
  text-transform: uppercase;
  font-weight: bold;
  padding: 2rem 8rem;
`;

const NavBarLeft = styled.div`
  flex: 1;
  font-size: 16px;
  display: block;
  color: white;
`;

const Navigation = styled.nav`
  flex-direction: row;
  font-size: 12px;
  text-align: right;
  flex-grow: 1;
`;
const NavLink = styled.a`
  cursor: pointer;
  margin: 0px 10px;
  width: 100px;
  color: white;
`;

const Main = styled.main`
  max-width: 100%;
  overflow-x: hidden;
  flex: 1 0 auto;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: ${tablet - 90}px;
  overflow: visible;
  padding: 0 1rem;
  @media (min-width: ${tablet}px){
    padding: 0
  }
`;

class App extends Component {
  state = {
    posts: [],
    postsByKey: {},
    orderedPostKeys: [],
    prevPostKey: null,
    nextPostKey: null,
    isPlayerActive: false,
  };
  componentDidMount() {
    const db = firebase.database();
    const posts = db.ref('posts');

    posts.orderByChild('week').startAt(1).endAt(5).on('value', snap => {
      const postsByKey = {};
      const orderedPostKeys = [];

      snap.forEach(child => {
        postsByKey[child.key] = child.val();
        orderedPostKeys.push(child.key);
      });
      const result = snap.val();
      this.setState({
        posts: [...result].reverse(),
        orderedPostKeys: orderedPostKeys.reverse(),
        postsByKey,
      });
    });
  }

  handlePlay = async key => {
    event.preventDefault();
    const {postsByKey, orderedPostKeys} = {...this.state};
    const currentIndex = orderedPostKeys.indexOf(key);
    const nextPostKey = currentIndex < orderedPostKeys.length - 1 ? orderedPostKeys[currentIndex + 1] : null;
    const prevPostKey = currentIndex > 0 ? orderedPostKeys[currentIndex - 1] : null;

    const post = postsByKey[key];

    const storage = firebase.storage();
    const audioReference = storage.refFromURL(post.audio);
    const artReference = storage.refFromURL(post.art);
    const [audio, art] = await Promise.all([
      audioReference.getDownloadURL(),
      artReference.getDownloadURL(),
    ]);
    this.setState({
      audioTitle: `${post.artist} - ${post.song}`,
      playerTitle: `#${post.week}`,
      audioUrl: audio,
      artUrl: art,
      nextPostKey,
      prevPostKey,
    });
    this.player.play();
  };

  render() {
    const postKeys = this.state.orderedPostKeys;
    const {prevPostKey, nextPostKey} = this.state;
    const prevPostLabel = `#${prevPostKey}`;
    const nextPostLabel = `#${nextPostKey}`;

    return (
      <div>
        <NavBar>
          <NavBarLeft>Mucha Música</NavBarLeft>
          <Navigation>
            <NavLink href="#">Blog</NavLink>
            <NavLink href="#">Playlist</NavLink>
            <NavLink href="#">Acerca</NavLink>
            <NavLink href="#">Contacto</NavLink>
          </Navigation>
        </NavBar>
        <Main>
          <Content>
            {postKeys.map((key) => {
              const post = this.state.postsByKey[key];
              return (
                <PostPreview
                  key={key}
                  postKey={key}
                  post={post}
                  handlePlay={this.handlePlay}
                />
              );
            })}
          </Content>
          <Player
            ref={node => this.player = node}
            artUrl={this.state.artUrl}
            audioTitle={this.state.audioTitle}
            audioUrl={this.state.audioUrl}
            loadAudio={this.handlePlay}
            playerTitle={this.state.playerTitle}
            nextAudioId={nextPostKey}
            nextAudioLabel={nextPostLabel}
            prevAudioId={prevPostKey}
            prevAudioLabel={prevPostLabel}
          />
        </Main>
      </div>
    );
  }
}

export default App;
