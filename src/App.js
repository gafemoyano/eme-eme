import React, { Component } from 'react';
import styled from 'styled-components';
import PostPreview from './PostPreview'
import firebase from 'firebase';
import Player from 'react-dock-player/lib/'
import { tablet } from './style-variables'

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
  max-width: ${tablet-90}px;
  overflow: visible;
  padding: 0 1rem;
  @media (min-width: ${tablet}px){
    padding: 0
  }
`;

class App extends Component {
  state = {
  posts: [],
  }
  componentDidMount() {
    const db = firebase.database();
    const root = db.ref().child('/');
    const posts = root.child('posts');

    posts.on('value', snap => {
      var result = snap.val();
      if(Array.isArray(result)) {
        this.setState({posts: [...result].reverse()})
      }
    })
  }

   handlePlay = async(event, audioLocation, details) => {
    event.preventDefault();
    const storage = firebase.storage();
    const gsReference = storage.refFromURL(audioLocation);
    //TODO: Use Promise.all to await multiple calls to Firebase
    const url = await gsReference.getDownloadURL();

    this.setState({
      audio: url,
      details: {
        song: details.song,
        artist: details.artist,
        title: details.title,
        art: details.artUrl,
      },
    });
    this.player.play();
  }

  render() {
    const posts = this.state.posts
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
            const postNumber = posts.length - index;
            const title = `${post.artist} - ${post.song}`;
            return(<PostPreview
              key={index}
              number={postNumber}
              title={title}
              text={post.text}
              date={post.date}
              audioLocation={post.audio}
            />);
           })
          }
          </Content>
          <Player
            ref={node => this.player = node}
            audioTitle={this.state.audioTitle}
            playerTitle={this.state.playerTitle}
            audioUrl={this.state.audioUrl}
            artUrl={this.state.artUrl}
          />
        </Main>
      </div>
    );
  }
}


export default App;
