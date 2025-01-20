import { useState, useEffect } from 'react';

function App() {
  const [start, setStart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [found, setFound] = useState([]);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const items = {
    facehugger: { x: [430, 450], y: [1250, 1290] },
    jerry: { x: [610, 624], y: [1040, 1055] },
    alien: { x: [340, 360], y: [650, 670] }
  };

  useEffect(() => {
    if (found.length === Object.keys(items).length) {
      alert('Congratulations! You found all items!');
    }
  }, [found]);

  function handleItemClick(itemId) {
    const { x, y } = clickPosition;
    const itemCoords = items[itemId]; 

    if (!itemCoords) return;

    const isInXRange = x >= itemCoords.x[0] && x <= itemCoords.x[1];
    const isInYRange = y >= itemCoords.y[0] && y <= itemCoords.y[1];

    if (isInXRange && isInYRange && !found.includes(itemId)) {
      setFound(prev => [...prev, itemId]);
      setShowModal(false);
    } else {
      alert('Try again! Not quite the right spot.');
    }
  }

  function getCoords(e) {
    const image = e.target;
    const rect = image.getBoundingClientRect();
    
    const xCoords = Math.round(e.clientX - rect.left);
    const yCoords = Math.round(e.clientY - rect.top);
    
    console.log('Click coordinates:', xCoords, yCoords);
    
    setClickPosition({ x: xCoords, y: yCoords });
    setShowModal(true);
  }
  
  return (
    <div className="container">
      {!start ? (
        <div className="start-screen">
          <h1>Where's Waldo?</h1>
          <p>Find these items:</p>
          <div className="items-to-find">
            {Object.keys(items).map(item => (
              <div key={item} className="item-preview">
                <img 
                  src={`/${item}.jpg`} 
                  alt={item}
                  className="preview-image"
                />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setStart(true)}>
            Start Game
          </button>
        </div>
      ) : (
        <div className="game-container">
          <div className="game-header">
            <div>Found: {found.length}/{Object.keys(items).length}</div>
            <button 
              className="reset-button"
              onClick={() => setStart(false)}
            >
              Reset Game
            </button>
          </div>
          <div className="imageContainer">
            <img
              src="/whereswaldo.jpg"
              alt="Find the items!"
              onClick={getCoords}
              style={{ width: "150vh", cursor: "crosshair" }}
            />
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            <div id="modalContainer">
              {Object.keys(items).map(item => (
                !found.includes(item) && (
                  <button
                    key={item}
                    className="item-button"
                    onClick={() => handleItemClick(item)}
                  >
                    <img 
                      src={`/${item}.jpg`} 
                      alt={item}
                      className="findImage"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;