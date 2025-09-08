import React, { useState, useEffect } from 'react';
import './ItemList.css'; 

const ItemList = () => {
  const [items, setItems] = useState([]);
  const API_URL = 'https://wishlist-server-beta.vercel.app/items';


  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Помилка 33333333:", err));
  }, []);

  const handleBook = (id) => {
    fetch(`${API_URL}/${id}/book`, { method: 'POST' })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.success) {
          setItems(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, isbooked: true } : item
            )
          );
        } else {
          alert(data.message || "Не вдалось забронювати."); 
        }
      })
      .catch(err => console.error("Помилка бронюваня:", err));
      window.location.reload();
  };

  return (
    <div className="item-list-container">
      <h1 className="main-title">✨ Wish List Dmitry Korch✨</h1>
      <div className="item-grid">
        {items.map(item => (
          <div key={item.id} className={`item-card ${item.isbooked ? 'booked' : ''}`}>
            {item.isbooked && <div className="ribbon"></div>}
            <div className="item-content">
              <div className="item-icon">🎁</div>
              <h3 className="item-name">{item.name}</h3>
              {!item.isbooked ? (
                <button className="book-button" onClick={() => handleBook(item.id)}>
                  Забронювати <span role="img" aria-label="gift">🎁</span>
                </button>
              ) : (
                <div className="booked-message">
                  <span role="img" aria-label="check">✔️</span> Заброньовано
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
