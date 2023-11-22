import React, { useState } from 'react';
import './style.css'; // Arquivo de estilos CSS
import fullImage from './images/map.png'; // Importe a imagem completa

function App() {
  const [revealed, setRevealed] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [hideAdditionalButtons, setHideAdditionalButtons] = useState(false);

  const handleButtonClick = () => {
    setRevealed(!revealed);
    setHideAdditionalButtons(!hideAdditionalButtons); // Alternando a visibilidade dos botões adicionais
  };

  const handleButton2Click = () => {
    setShowModal2(true);
  };

  const handleButton3Click = () => {
    setShowModal3(true);
  };

  const handleCloseModal = (modal) => {
    if (modal === 'modal2') {
      setShowModal2(false);
    } else if (modal === 'modal3') {
      setShowModal3(false);
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <div className={`image ${revealed ? 'revealed' : ''}`} style={{ backgroundImage: `url(${fullImage})` }}></div>
      </div>
      <button className="reveal-button" onClick={handleButtonClick}>
        {/* Conteúdo do botão principal */}
      </button>
      {!hideAdditionalButtons && (
        <>
          <button className={`additional-button ${hideAdditionalButtons ? 'hidden' : ''}`} onClick={handleButton2Click}>
  {/* Conteúdo do botão adicional 1 */}
</button>
<button className={`additional-button ${hideAdditionalButtons ? 'hidden' : ''}`} onClick={handleButton3Click}>
  {/* Conteúdo do botão adicional 2 */}
</button>
        </>
      )}

      {/* Modal para o botão 2 */}
      {showModal2 && (
        <div className="modal show">
          <div className="modal-content">
            <span className="close" onClick={() => handleCloseModal('modal2')}>&times;</span>
            <p>Conteúdo do Pop-up do Botão 2</p>
          </div>
        </div>
      )}

      {/* Modal para o botão 3 */}
      {showModal3 && (
        <div className="modal show">
          <div className="modal-content">
            <span className="close" onClick={() => handleCloseModal('modal3')}>&times;</span>
            <p>Conteúdo do Pop-up do Botão 3</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
