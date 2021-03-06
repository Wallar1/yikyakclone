import React,{Component} from 'react'
import { Box, Flex, Text, Image } from 'rebass'
import { FaRegThumbsDown,  FaRegThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { ANIMALS } from '../constants';

// import animal_icon from "../animal_icons/" + animal + "_128px.png";

export default class Post extends Component{

  handleClick = (e) => {
    this.props.handleClick(this.props.post.id)
  }

  userPostVote = ()=> {
    const votes = [...this.props.user.votes]
    const vote = votes.find(v => v.post_id === this.props.post.id)
    return vote ? vote.value : 0
  }

  vote_value = () => {
    if(this.props.post.votes.length === 0){return 0}
    return this.props.post.votes.reduce((total,vote) => total + vote.value,0)
  }

  hand_style = () => {
    let {post} = this.props
    let vote = this.props.user.votes.find(v => v.post_id === post.id)
    let style = {up: 15, down: 15, red: 'darkRed', green: 'green'}
    if(!vote){
      return style
    }
    else if(vote.value > 0){
      style.up = 20
      style.green = 'lightGreen'
    }
    else if(vote.value < 0){
      style.down = 20
      style.red = 'red'
    }
    return style
  }

  render = () => {
    const vote_style = this.hand_style()
    // const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
    // const animal_icon = import(`../animal_icons/${animal}_128px.png`)
    // <Image src={animal_icon} variant={`${animal} avatar`}/>
    return (
      <>
        <Flex justifyContent="space-between">
          <Box>
          </Box>
          <Box>
            <Text>
              {this.props.post.content}
            </Text>
          </Box>
          <Box>
            {this.props.post.created_at}
          </Box>
          <Box>
            <p onClick={() => this.props.changeVotes(this.props.post.id,1)}>
              <FaRegThumbsUp color={vote_style.green} size={vote_style.up}/>
            </p>
            <p>{this.vote_value()}</p>
            <p  onClick={() => this.props.changeVotes(this.props.post.id,-1)}>
              <FaRegThumbsDown color={vote_style.red} size={vote_style.down}/>
            </p>
          </Box>
        </Flex>
        <Link to={`/posts/${this.props.post.id}`}>
          {`${this.props.post.replies.length} replies`}
        </Link>
        <hr/>
      </>
    )
  }
}