import { useState } from 'react';

function App() {
  const [start, setStart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function getCoords(e) {
    console.log('Image clicked at:', e.clientX, e.clientY);
    setShowModal(true);
    console.log('showModal set to:', true);
  }

  return (
    <div className="container">
      {!start ? (
        <>
          <h1>Where's Waldo</h1>
          <button onClick={() => setStart(true)}>Play</button>
        </>
      ) : (
        <div className="imageContainer">
          <img
            src="/whereswaldo.jpg"
            alt="whereswaldo"
            onClick={getCoords}
            style={{width:"150vh"}}
          />
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>×</button>
            <div id='modalContainer'>
              <img src="/facehugger.jpg" alt="facehugger" className="findImage" style={{width:"100px", height:"100px"}}/>
              <img src="/jerry.jpg" alt="jerry" className="findImage" style={{width:"100px", height:"100px"}}/>
              <img src="/alien.jpg" alt="alien" className="findImage" style={{width:"100px", height:"100px"}}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 