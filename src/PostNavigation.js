import React from 'react';
import styled from 'styled-components';
import PlayIcon from './icon-play.svg';
import DetailsIcon from './icon-details.svg';
import ShareIcon from './icon-share.svg';

import {
    white,
    green,
    smartphone,
 } from './style-variables';


const ToolBar = styled.nav`
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 1.3px;
  font-family: 'Arial Narrow', sans-serif;
  color: rgba(18,25,33,.25);
  font-size: 0.85em;
  background: ${white};
  border-top: 2px solid ${green};
  color: ${green};
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  padding: 0.625em 1em;
  text-align: left;
  text-transform: uppercase;
  justify-content: space-between;

  @media (min-width: (${smartphone + 50}px)){
    justify-content: flex-start;
  }
`;

const ToolBarItem = styled.a`
  margin: .625em 0;
  transition: opacity .2s ease-in-out;
  background-size: 20px;
  background-position: top;
  background-repeat: no-repeat;
  font-size: 0.9em;
  flex: 0 1 auto;
  margin: 0.625em 1em;
  padding: 30px 0 0;
  // At least as tall as icons;
  min-height: 20px;
  line-height: 1em;

  &:hover{
    opacity: .8;
    outline-width: 0;
  }
  &:active {
    outline-width: 0;
  }
  @media (min-width: ${smartphone + 50}px) {
    background-position: left 3px;
    font-size: 1.125em;
    line-height: 26px;
    padding: 0 0 0 35px;
    margin: .625em 2em .625em 0;
  }
`;

const PlayButton = styled(ToolBarItem)`
  background-image: url('${PlayIcon}');
  color: rgba(18,25,33,.5);
  display: block;
`;
const DetailsButton = styled(ToolBarItem)`
  background-image: url('${DetailsIcon}');
  color: rgba(18,25,33,.5);
  display: block;
`;
const ShareButton = styled(ToolBarItem)`
  background-image: url('${ShareIcon}');
  color: rgba(18,25,33,.5);
  display: block;
`;
const PostNavigation = () => {
  return (
    <ToolBar>
    <PlayButton>Reproducir</PlayButton>
    <DetailsButton>Leer</DetailsButton>
    <ShareButton>Compartir</ShareButton>
    </ToolBar>
  );
}

export default PostNavigation;