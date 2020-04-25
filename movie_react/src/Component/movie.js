import React,{Component} from 'react';
import PropTypes from "prop-types";
import './movie.css'
import movietop1  from '../img/Homelogo.png'
import { sizing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

var cardStyle = {
    
    width: '13%',
    height: '40%',
    
    display: "inline-block"
  }
  
  
class Movie extends Component {
  render(){
      

    return (

    <div id="movie">
      <Card class={Movie} style={cardStyle} >
      <CardActionArea >
      <Link to={this.props.main.name}>
        <CardMedia
          component="img"
          alt="영화제목"
          
          
          image={movietop1}
          //title="Contemplative Reptile"
        /> </Link>
        <CardContent>
          {/* <Typography color="secondary" gutterBottom variant="h5" component="h2">
            {this.props.main.name}
          </Typography> */}
          {/* <Typography variant="body2" color="secondary" component="p">
          {this.props.main.desc.slice(0,18)}
            
          </Typography> */}
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="secondary">
          리뷰확인
        </Button>
        <Button size="small" color="secondary">
         더보기
        </Button>
      </CardActions> */}
    </Card>
    </div>
  );
}

// Movie.propTypes = {
//   id: PropTypes.number.isRequired,
//   year: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   summary: PropTypes.string.isRequired,
//   poster: PropTypes.string.isRequired,
//   genres: PropTypes.arrayOf(PropTypes.string).isRequired
// };
}

export default Movie;