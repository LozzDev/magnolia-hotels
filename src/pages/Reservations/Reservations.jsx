import React from 'react';
import RoomCard from '../../components/RoomCard/RoomCard';
import SearchResult from '../../components/SearchResult/SearchResult';
import './Reservations.css';
const rooms = [
  { title: 'Habitación Doble',description:"Disfruta de la combinación perfecta entre elegancia y confort en nuestra Suite Junior, un espacio diseñado para brindar una estancia exclusiva y relajante.", stars: 3, price: 43, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg'},
  { title: 'Habitación Individual',description:"Disfruta de la combinación perfecta entre elegancia y confort en nuestra Suite Junior, un espacio diseñado para brindar una estancia exclusiva y relajante.", stars: 4, price: 38, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg'  },
  { title: 'Suite Deluxe', stars: 5,description:"Disfruta de la combinación perfecta entre elegancia y confort en nuestra Suite Junior, un espacio diseñado para brindar una estancia exclusiva y relajante.", price: 99, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg'  },
  { title: 'Habitación Superior',description:"Disfruta de la combinación perfecta entre elegancia y confort en nuestra Suite Junior, un espacio diseñado para brindar una estancia exclusiva y relajante.", stars: 4, price: 55, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg' },
  { title: 'Habitación Económica',description:"Disfruta de la combinación perfecta entre elegancia y confort en nuestra.", stars: 3, price: 30, img: 'https://res.cloudinary.com/dc732dg4w/image/upload/v1739780013/habitacion-superior_hdbplp.jpg'  },
];

//la variable room es un array de prueba para comprobar como se veria si extrayesemos los datos de una api o un json local

const Reservations = () => {
  return (
    <div className="container">
      <div className='search-result-container'>
        <SearchResult />
      </div>

      <div className="row justify-content-center">
        {rooms.map((room, index) => (
          <div key={index} className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center g-2">
            <RoomCard {...room} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;