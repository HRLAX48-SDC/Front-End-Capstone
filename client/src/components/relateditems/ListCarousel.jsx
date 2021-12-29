import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard.jsx';
import axios from 'axios';
import API_KEY from '../../config/config.js';

// sample data
// import getProducts from './data/sampleDataProducts.js';

function ListCarousel(props) {

  const [grid, setGrid] = useState([]);
  let scrollPos = 0;
  let scrollDistance = 320;

  useEffect(() => {
    populateCarousel();
    return () => {
      setGrid([]);
    }
  }, [props.items])

  const populateCarousel = () => {
    let grid = [];
    props.items.map((productid) => {
      axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-lax/products/${productid}`, {
        headers: {
          'Authorization': `${API_KEY}`
        }
      })
      .then((result) => {
        grid.push(result.data);
        if(grid.length === props.items.length){
          setGrid(grid);
        }
      })
      .catch((err) => {
        console.log(err);
      })
    })
  }

  const checkPos = (e) => {
    let leftButton = document.getElementById(props.uniqueid + 'left');
    let rightButton = document.getElementById(props.uniqueid + 'right');
    if(scrollPos <= 0){
      scrollPos = 0;
      leftButton.innerHTML = ' ';
    } else {
      leftButton.innerHTML = '<';
    }
    if(scrollPos >= scrollDistance * (props.items.length - 2)) {
      rightButton.innerHTML = ' ';
    } else {
      rightButton.innerHTML = '>';
    }
  }

  const scrollLeft = (e) => {
    let element = e.target.parentElement.firstElementChild;
    element.scrollTo({
      top: 0,
      left: (scrollPos -= scrollDistance),
      behavior: "smooth"
    })
    checkPos(e);
  }

  const scrollRight = (e) => {
    let element = e.target.parentElement.firstElementChild;
    if(scrollPos <= element.scrollWidth - element.clientWidth) {
      element.scrollTo({
        top: 0,
        left: (scrollPos += scrollDistance),
        behavior: "smooth"
      })
    }
    checkPos(e);
  }

  return (
    <div className='carousel'>
      <div className='carouselContainer'>
        <div className="carouselBox">
        {grid.length === 0 ? 'Loading...' : grid.map((product, index) => (
          <div className="carouselItem" key={index}><ProductCard product={product} chooseProduct={props.chooseProduct}/></div>
        ))}
        </div>
        <div className="moveLeft slideButton" onClick={scrollLeft} id={props.uniqueid + 'left'}>{' '}</div>
        <div className="moveRight slideButton" onClick={scrollRight} id={props.uniqueid + 'right'}>{'>'}</div>
      </div>
    </div>
  )
}

export default ListCarousel;