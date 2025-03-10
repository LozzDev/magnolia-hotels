import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState, useEffect } from 'react';
import './RoomCard.css';

const MySwal = withReactContent(Swal);

const RoomCard = ({ 
  id, 
  title, 
  description, 
  stars, 
  price, 
  img, 
  setRooms, 
  entry, 
  departure, 
  reservationTime, 
  reservationVisibility, 
  priceVisibility, 
  manageReservationButtonVisibility, 
  reservationButtonVisibility, 
  handleDeleteReservation 
}) => {
  
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

 
  const updateUserInLocalStorage = async (userId) => {
    try {
      const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
      const userData = await userResponse.json();
      localStorage.setItem('user', JSON.stringify(userData)); 
      setUser(userData); 
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  useEffect(() => {
    
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      setUser(JSON.parse(userFromLocalStorage));
    }
  }, []);

  const handleReservation = async () => {
    try {
      
      const response = await fetch(`http://localhost:3000/rooms/${id}`);
      const roomData = await response.json();

     
      const totalIds = roomData.reservations.length + 1;

      
      const newReservation = {
        entry: entry.format('YYYY-MM-DD'), 
        departure: departure.format('YYYY-MM-DD'), 
        reservationId: roomData.id + totalIds,
      };

      
      const updatedRoom = {
        ...roomData,
        reservations: [...roomData.reservations, newReservation],
      };

      
      await fetch(`http://localhost:3000/rooms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRoom),
      });

      
      const userId = user.id;

    
      const newReservationId = {
        reservationId: newReservation.reservationId,
      };

      
      const updatedUser = {
        ...user,
        myReservations: [...user.myReservations, newReservationId],
      };

      
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      
      updateUserInLocalStorage(userId);

      
     
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));

      MySwal.close();
      MySwal.fire('¡Reservado!', 'Tu reserva ha sido guardada.', 'success').then(() => {
        location.reload();
      });
    } catch (error) {
      console.error('Error al realizar la reserva:', error);
      MySwal.fire('Error', 'Hubo un problema al hacer la reserva. Intenta de nuevo.', 'error');
    }
  };

  const handleReservationDesktop = () => {
    MySwal.fire({
      html: `
        <div class="main-content">
          <img alt="${title}" src="${img}" class="room-image" /> 
          <div class="sweetalert-info-container">
            <h3 class="title">${title}</h3>
            <div class="description-container">
              <p class="description">${description}</p>
              <h4 class="price">Total: <strong>${price} EUR</strong></h4>
            </div>
            <button id="customConfirmButton" class="custom-confirm-button">Reservar</button>
          </div>
        </div>
      `,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-swal-popup',
        backdrop: 'custom-backdrop',
      },
      didOpen: () => {
        document.getElementById("customConfirmButton").addEventListener("click", handleReservation);
      },
    });
  };

  const handleMyReservationDesktop = () => {
    MySwal.fire({
      html: `
        <div class="main-content-my-reservation">
          <h3 class="title">${title}</h3>
          <img alt="${title}" src="${img}" class="room-image-my-reservation" /> 
          <button id="customConfirmButton" class="custom-confirm-button btn-sm" id="cancel-confirm">Eliminar</button> 
        </div>
      `,
      showConfirmButton: false,
      customClass: {
        popup: 'custom-swal-popup-my-reservation',
        backdrop: 'custom-backdrop',
      },
      didOpen: () => {
        document.getElementById("customConfirmButton").addEventListener("click", handleDeleteReservation);
      },
    });
  };

  return (
    <Card style={{ fontFamily: 'Manrope, sans-serif' }} className='bg-white border-0'>
      <Card.Img variant="top" src={img} className='card-image p-3' alt="card image" />
      <Card.Body className='d-flex flex-column'>
        <Card.Title style={{ fontSize: '23px', minHeight: '55px' }}>{title}</Card.Title>
        <div>
          {Array.from({ length: stars }, (_, i) => (
            <FaStar key={i} color="lightgray" size={20} style={{ marginRight: '5px', marginBottom: '10px' }} data-testid="star-icon"/>
          ))}
        </div>
        <Card.Text style={{ display: `${priceVisibility}` }}>
          Desde {price} EUR/noche
        </Card.Text>
        <Card.Text style={{ display: `${reservationVisibility}` }}>
          {reservationTime}
        </Card.Text>
        <Button onClick={handleReservationDesktop} variant="dark" size='lg' className='w-100 rounded-0 fs-6 mx-auto' style={{ maxWidth: '355px', display: `${reservationButtonVisibility}` }}>
          Reservar
        </Button>
        <Button onClick={() => { 
          handleMyReservationDesktop();
           }} variant="dark" size='lg' className='w-100 rounded-0 fs-6 mx-auto' style={{ maxWidth: '355px', display: `${manageReservationButtonVisibility}` }}>
          Gestionar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;
