import React, { useState } from 'react';
import './Benchmarks.css';

// Import images
import rescoImage from "./resco.png";
import table2Image from './table2.png';
import table3Image from './table3.png';
import table4Image from './table4.png';
import yoloTable1Image from './yolo-table1.png';
import yoloTable2Image from './yolo-table2.png';
import yoloTable3Image from './yolo-table3.png';

function Benchmarks() {
  const [popupImage, setPopupImage] = useState(null);

  const openPopup = (image, e) => {
    e.preventDefault(); // Prevent default behavior of anchor tag
    setPopupImage(image);
  };

  const closePopup = () => {
    setPopupImage(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">Signal Time Optimization Benchmark</h1>
      </header>

      <main>
        <section className="section">
          <div className='table-container'>
            <h2><a href="https://people.engr.tamu.edu/guni/papers/NeurIPS-signals.pdf">Reinforcement Learning Benchmarks for Traffic Signal Control</a></h2>
            <figure className="image-container">
              <a href={rescoImage} target="_blank" rel="noopener noreferrer" onClick={(e) => openPopup(rescoImage, e)}>
                <img src={rescoImage} alt="Extended State MPLight vs Standard MPLight" />
              </a>
              <figcaption>
                We test the <strong>signal time optimization</strong> for a standard dataset - RESCO (Reinforcement Learning Benchmarks for Traffic Signal Control). The networks in the dataset denote <em>congested networks</em> in real-world cities, Cologne and Ingolstadt (Germany), and are accepted benchmarks for traffic control. Our <strong>RL Techniques</strong> perform magnificently in the provided benchmarks as shown in the table.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section">
          <h2><a href="https://arxiv.org/pdf/2312.00516">Traffic Flow Forecasting Benchmark: STD-MAE</a></h2>
          <div className="table-container">
            <div className="image-wrapper">
              <a href={table2Image} target="_blank" rel="noopener noreferrer" onClick={(e) => openPopup(table2Image, e)}>
                <img src={table2Image} alt="Performance Comparison with Baseline Models on PEMS03,04,07,08 Benchmarks" />
              </a>
            </div>
            <figure className="image-container">
              <div className="image-wrapper">
                <a href={table3Image} target="_blank" rel="noopener noreferrer" onClick={(e) => openPopup(table3Image, e)}>
                  <img src={table3Image} alt="Performance on PEMS-BAY Dataset" />
                </a>
                <a href={table4Image} target="_blank" rel="noopener noreferrer" onClick={(e) => openPopup(table4Image, e)}>
                  <img src={table4Image} alt="Performance on METR-LA Dataset" />
                </a>
              </div>
              <figcaption>
                For Traffic Flow Forecasting, the model used- <strong>STD-MAE</strong> is the best performing model on standard benchmarks for this use-case PEMS03,04,07,08. These datasets are collected from the <em>California Transportation Performance Measurement System (PeMS)</em> (Chen et al. 2001) and contain traffic data from different transportation districts, providing diversity in spatial and temporal patterns.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* New YOLOWorld Benchmark Section */}
        <section className="section">
          <h2><a href="https://arxiv.org/pdf/2401.17270">YOLOWorld Benchmarks</a></h2>
          <div className="table-container">
            <figure className="image-container">
              <div className="image-wrapper">
                <a href={yoloTable1Image} target="_blank" rel="noopener noreferrer" onClick={(e) => openPopup(yoloTable1Image, e)}>
                  <img src={yoloTable1Image} alt="YOLOWorld Table 1" />
                </a>
                <a href={yoloTable2Image} target="_blank" rel="noopener noreferrer" onClick={(e) => openPopup(yoloTable2Image, e)}>
                  <img src={yoloTable2Image} alt="YOLOWorld Table 2" />
                </a>
                <a href={yoloTable3Image} target="_blank" rel="noopener noreferrer" onClick={(e) => openPopup(yoloTable3Image, e)}>
                  <img src={yoloTable3Image} alt="YOLOWorld Table 3" />
                </a>
              </div>
              <figcaption>
                <p><strong>YOLOWorld</strong> (used in our project to detect traffic through CCTV) is evaluated on standard Object Detection Benchmarks like <em>LVIS Eval</em> and <em>COCO Object Detection</em>, emerges as one of the best-performing models. Even comparing with various open-vocabulary detectors — models that can understand language and detect objects based on natural language commands — it emerges as one of the frontrunners.</p>
              </figcaption>
            </figure>
          </div>
        </section>
      </main>

      {/* Popup */}
      {popupImage && (
        <div className="popup-container" onClick={closePopup}>
          <div className="popup-content">
            <img src={popupImage} alt="Popup" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Benchmarks;