import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse'
import "./Admin.css";
import Link from "next/link";

const Admin = () => {
  // State and handling functions for the first input field
  const [inputValue1, setInputValue1] = useState('');
  const [csvData, setCsvData] = useState([]);
  const [options1, setOptions1] = useState([
    'Sarjapur Road',
    'MG Road',
    'Bellary Road',
  ]);
  const [showDropdown1, setShowDropdown1] = useState(false);

  const handleInputChange1 = (event) => {
    const value = event.target.value;
    setInputValue1(value);
    setShowDropdown1(value.length > 0);
  };

  const handleOptionSelect1 = (option) => {
    setInputValue1(option);
    setShowDropdown1(false);
  };

  // State and handling functions for the second input field
  const [inputValue2, setInputValue2] = useState('');
  const [options2, setOptions2] = useState([
    "Car","Bike","Truck",
    'Tuk Tuk',
    'Ambulance',
    "Bus", 'People',"Potholes","Lorry"
  ]);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const handleInputChange2 = (event) => {
    const value = event.target.value;
    setInputValue2(value);
    setShowDropdown2(value.length > 0);
  };

  const handleOptionSelect2 = (option) => {
    setInputValue2(option);
    setShowDropdown2(false);
  };

  // State and handling functions for video upload and playback
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null); // Create a ref for the video element
  const [frameNum, setFrameNum] = useState(0);
  const [videoUploaded, setVideoUploaded] = useState(false); // Track if video is uploaded
  const [loading, setLoading] = useState(false); // Track loading state

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
      setVideoUploaded(true); // Set video uploaded to true
      setLoading(true); // Start loading animation
      setTimeout(() => setLoading(false), 5000); // Stop loading animation after 5 seconds
    }
  };

  const handleTimeUpdate = () => {
    // Calculate current time in milliseconds
    const currentTimeInMillis = Math.floor(videoRef.current.currentTime * 1000);
    setFrameNum(Math.round((currentTimeInMillis/10319)*608));
    // console.log(csvData.)
    console.log('Current time in milliseconds:', csvData[parseInt(frameNum)]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/newFrames.csv');
        const reader = response.body.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvText = decoder.decode(result.value);

        Papa.parse(csvText, {
          header: true,
          complete: (parsedCsv) => {
            // console.log(parsedCsv.data);
            setCsvData(parsedCsv.data); // Use setCsvData from the closure
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error);
      }
    };
    
    fetchData();
  }, [setCsvData]); // Add setCsvData as a dependency to the useEffect hook


  return (
    <div className="main-layout">
      <div className="page_layout">
        {loading ? (
          <div className="loading"></div>
        ) : (
          <>
            <section className="left">
              <div className="video-card">
                {videoSrc && (
                  <video loop
                    muted
                    autoPlay
                    controls
                    className="video-player"
                    ref={videoRef} // Set ref to access video element
                    onTimeUpdate={handleTimeUpdate} // Call function on time update
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <div className="upload-btn">
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={handleVideoUpload} 
                    id="video-upload" 
                  /> 
                </div>
              </div>
            </section>
            <section className="right">
              <div className="top">
                <div className="typeIn">
                  <div className="landp">
                    <input
                      type="text"
                      value={inputValue1}
                      onChange={handleInputChange1}
                      placeholder="Location"
                      className="input_field1"
                    />
                    {showDropdown1 && (
                      <div className="menu">
                        <div className="dropdown-menu">
                          {options1.map((option, index) => (
                            <div
                              key={index}
                              className="dropdown-item"
                              onClick={() => handleOptionSelect1(option)}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="typeIn">
                  <div className="landp">
                    <select
                      value={inputValue2}
                      onChange={handleInputChange2}
                      className="input_field2"
                    >
                      <option value="" className="option">Choose a parameter</option>
                      {options2.map((option, index) => (
                        <option className="options" key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="Located_in">Located in: <FontAwesomeIcon icon={faMapMarkerAlt} className="location_icon" /> Bangalore</div><br />
                <div className="camera">Camera No. 46</div><br />
                {/* <div className="input_answer">The number of cycles on the Bellary Road are 273.</div> */}
                <div className="statsTop2">
                  <div className="cars">Cars<div className="value">{videoUploaded && csvData[frameNum] ? csvData[frameNum]['car'] : 0}</div></div>
                  <div className="bikes">Bikes<div className="value">{videoUploaded && csvData[frameNum] ? csvData[frameNum]['bike'] : 0}</div></div><br />
                  <div className="cycles">Tuk Tuk<div className="value">{videoUploaded && csvData[frameNum] ? csvData[frameNum]['tuk tuk'] : 0}</div></div>
                  <div className="trucks">Trucks<div className="value">{videoUploaded && csvData[frameNum] ? csvData[frameNum]['truck'] : 0}</div></div><br />
                  <div className="seatbelts">Bus<div className="value">{videoUploaded && csvData[frameNum] ? csvData[frameNum]['bus'] : 0}</div> </div>
                  <div className="helmet">Person<div className="value">{videoUploaded && csvData[frameNum] ? csvData[frameNum]['person'] : 0}</div></div>
                </div>
              </div>
              <div className="bottom">
              </div>
            </section>
          </>
        )}
      </div>
      <div className="footer">
        Explore our <Link href="/benchmarks">Benchmarks</Link> page, showcasing Signal Time Optimization benchmarks, including Reinforcement Learning Benchmarks, Traffic Signal Control and Traffic Flow Forecasting Benchmark: STD-MAE and our YOLOWorld Benchmarks.
      </div>
    </div>
  );
};

export default Admin;
