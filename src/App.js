import React, { Component } from 'react';
import styled from 'styled-components';
import PostPreview from './PostPreview'
import firebase from 'firebase';


const Layout = styled.div`
`;
const NavBar = styled.header`
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 1);
  text-transform: uppercase;
  font-weight: bold;
  padding: 2rem 8rem;
`;

const NavBarLeft = styled.div`
  flex: 1;
  font-size: 16px;
  display: block;
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
  color: black;
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  height: 100%;
  padding: 7vh 5vw;
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
      this.setState({posts: snap.val()})
    })
  }
  render() {
    const posts = this.state.posts
    console.log(posts)
    return (
      <Layout>
        <NavBar>
        <NavBarLeft>Música. Mucha Música.</NavBarLeft>
          <Navigation>
            <NavLink href="#">Blog</NavLink>
            <NavLink href="#">Playlist</NavLink>
            <NavLink href="#">Acerca</NavLink>
            <NavLink href="#">Contacto</NavLink>
          </Navigation>
        </NavBar>
        <Content>
        {posts.map(post => {
          console.log(post);
          return(<PostPreview
            title={post.title}
            text={post.text}
          />);
        })
        }
        </Content>
      </Layout>
    );
  }
}


export default App;
