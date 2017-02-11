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
  };
  componentDidMount() {
    const db = firebase.database();
    const posts = db.ref('posts');

    posts.orderByChild('week').startAt(1).endAt(5).on('value', snap => {
      const result = snap.val();
      console.log(snap.key)
      this.setState({ posts: [...result].reverse() });
    });
  }

  handlePlay = async post => {
    event.preventDefault();
    console.log(post)
    const storage = firebase.storage();
    const audioReference = storage.refFromURL(post.audio);
    const artReference = storage.refFromURL(post.art);
    //TODO: Use Promise.all to await multiple calls to Firebase
    // audioReference.getDownloadURL().then(url => this.setState({audio:}))
    const [audio, art] = await Promise.all([
      audioReference.getDownloadURL(),
      artReference.getDownloadURL(),
    ]);
    console.log(audio)
    console.log(art)
    this.setState({
      audioTitle: `${post.artist} - ${post.song}`,
      playerTitle: `#${post.week}`,
      audioUrl: audio,
      artUrl: art,
    });
    this.player.play();
  };

  render() {
    const posts = this.state.posts;
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
            {posts.map((post, index) => {
              return (
                <PostPreview
                  key={index}
                  post={post}
                  handlePlay={this.handlePlay}
                />
              );
            })}
          </Content>
          <Player
            ref={node => this.player = node}
            audioTitle={this.state.audioTitle}
            playerTitle={this.state.playerTitle}
            audioUrl={this.state.audioUrl}
            artUrl={this.state.artUrl}
            loadAudio={this.handlePlay}
          />
        </Main>
      </div>
    );
  }
}

export default App;
