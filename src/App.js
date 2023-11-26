import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import map1 from './images/mapalt 1.png';
import map2 from './images/mapalt 2.png';
import './Carousel.css';
import image1 from './images/img_popup.png';

class App extends Component {
  componentDidMount() {
    const slider = this.slider;
    if (slider) {
      slider.innerSlider.list.addEventListener('wheel', this.handleScroll, { passive: false });
      window.addEventListener('orientationchange', this.handleOrientationChange);
      this.handleOrientationChange(); // Verificar a orientação ao carregar
    }
  }
  
  componentWillUnmount() {
    const slider = this.slider;
    if (slider) {
      slider.innerSlider.list.removeEventListener('wheel', this.handleScroll);
      window.removeEventListener('orientationchange', this.handleOrientationChange);
    }
  }
  

  handleOrientationChange = () => {
    const orientation = window.orientation;
    if (orientation === 0 || orientation === 180) {
      alert('Por favor, gire o celular para utilizar o site na horizontal.');
    }
  };
  componentDidMount() {
    window.addEventListener('wheel', this.handleScroll, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener('wheel', this.handleScroll);
  }

  handleScroll = (event) => {
    const deltaY = event.deltaY;
    const { showPopup } = this.state;
  
    if (!showPopup && Math.abs(deltaY) > 20) {
      const slider = this.slider;
      if (slider) {
        if (deltaY > 0) {
          slider.slickPrev && slider.slickPrev();
        } else {
          slider.slickNext && slider.slickNext();
        }
        event.stopPropagation();
        event.preventDefault();
      }
    }
  };
  
  
  
  

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      slideUp: false,
      popupContent: [
        {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra pulvinar ipsum, vel facilisis erat varius eget. Donec quis magna ac ex tristique iaculis. Nam aliquam tellus enim, commodo mattis velit accumsan vitae. Fusce cursus iaculis velit a dictum. Quisque et convallis elit, eu pellentesque dolor. In auctor ac elit eu ultricies. Nullam vehicula blandit ullamcorper. Suspendisse ultricies ac ante non eleifend. Aenean tincidunt tincidunt pulvinar. Nulla sit amet feugiat quam. Suspendisse potenti. Proin tincidunt vitae velit non imperdiet. Vivamus ac interdum neque. Quisque cursus, lorem pharetra volutpat pellentesque, erat magna bibendum ante, vehicula ultricies leo nisl in augue. Sed at ligula semper, tincidunt erat ac, lacinia lacus. Nulla vitae tortor nisl.",
          imageUrl1: image1
        },
        {
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra pulvinar ipsum, vel facilisis erat varius eget. Donec quis magna ac ex tristique iaculis. Nam aliquam tellus enim, commodo mattis velit accumsan vitae. Fusce cursus iaculis velit a dictum. Quisque et convallis elit, eu pellentesque dolor. In auctor ac elit eu ultricies. Nullam vehicula blandit ullamcorper. Suspendisse ultricies ac ante non eleifend. Aenean tincidunt tincidunt pulvinar. Nulla sit amet feugiat quam. Suspendisse potenti. Proin tincidunt vitae velit non imperdiet. Vivamus ac interdum neque. Quisque cursus, lorem pharetra volutpat pellentesque, erat magna bibendum ante, vehicula ultricies leo nisl in augue. Sed at ligula semper, tincidunt erat ac, lacinia lacus. Nulla vitae tortor nisl.",
          imageUrl1: image1
        }
      ],
      activePopupIndex: 0
    };
  }
  



  handleBeforeChange = (oldIndex, newIndex) => {
    this.setState({ activeSlideIndex: newIndex, showPopup: false });
  };

  handleShowPopup = () => {
    this.setState({ showPopup: true });
  };

  handleClosePopup = () => {
    this.setState({ slideUp: true }); // Ativa a animação slide-up
  
    // Atraso para exibir a animação antes de fechar o popup
    setTimeout(() => {
      this.setState({ showPopup: false, slideUp: false });
    }, 300); // Ajuste o tempo conforme a duração da transição em CSS
  };

  handleButtonClick = (index) => {
    this.setState({ showPopup: true, activePopupIndex: index });
  };

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      cssEase: 'linear',
      beforeChange: this.handleBeforeChange,
    };

    return (
      <div className="carousel-wrapper">
        <Slider ref={(slider) => (this.slider = slider)} {...settings}>
          <div className="carousel-item">
            <img src={map1} alt="Descrição da Imagem 1" />
            <div className="button-overlay1">
              <button onClick={() => this.handleButtonClick(0)}>Show</button>
            </div>
          </div>
          <div className="carousel-item">
            <img src={map2} alt="Descrição da Imagem 2" />
            <div className="button-overlay2">
              <button onClick={() => this.handleButtonClick(1)}>Show</button>
            </div>
          </div>
        </Slider>

        {this.state.showPopup && (
          <div className={`popup-overlay ${this.state.slideUp ? 'slide-down' : 'slide-up'}`} onClick={this.handleClosePopup}>
            <div className={`popup ${this.state.showPopup ? '' : 'popup-hidden'}`} onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={this.handleClosePopup}>&times;</span>
              <div className="popup-content">
                <p>{this.state.popupContent[this.state.activePopupIndex].text}</p>
                <img
                  src={this.state.popupContent[this.state.activePopupIndex].imageUrl1}
                  alt="Descrição da Imagem"
                  className="popup-image" // Adicionando a classe "popup-image" à tag img
                />
              </div>
            </div>
          </div>
)}


      </div>
    );
  }
}

export default App;
