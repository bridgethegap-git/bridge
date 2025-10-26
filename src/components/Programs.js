import React, { useState, useEffect } from 'react';
import '../styles/Programs.css';

const pic = `${process.env.PUBLIC_URL}/programs-back.png`

function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});

  // Fetch programs from API
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://bridge-server-zb9l.onrender.com/programs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      
      const data = await response.json();
      console.log('Fetched data:', data); // Debug log
      
      const programsArray = data.programs || data || [];
      console.log('Programs array:', programsArray); // Debug log
      
      setPrograms(programsArray);
      
      // Initialize current image indexes for each program
      const initialIndexes = {};
      programsArray.forEach(program => {
        console.log('Program:', program.title, 'Images:', program.images); // Debug log
        initialIndexes[program._id] = 0;
      });
      setCurrentImageIndexes(initialIndexes);
      
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Carousel navigation functions
  const nextImage = (programId, imagesLength) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [programId]: (prev[programId] + 1) % imagesLength
    }));
  };

  const prevImage = (programId, imagesLength) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [programId]: (prev[programId] - 1 + imagesLength) % imagesLength
    }));
  };

  const goToImage = (programId, index) => {
    setCurrentImageIndexes(prev => ({
      ...prev,
      [programId]: index
    }));
  };

  if (loading) {
    return (
      <div className="programs-container">
        <div className="programs-loading">
          <div className="spinner"></div>
          <p>Loading programs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="programs-container">
        <div className="programs-error">
          <p>Error loading programs: {error}</p>
          <button onClick={fetchPrograms} className="retry-btn">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="programs-container">
      <div className="programs-hero" 
       style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.71)), url(${pic})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <h1>Our Programs</h1>
        <p>Empowering communities through education and opportunity</p>
      </div>

      <div className="programs-grid">
        {programs.length > 0 ? (
          programs.map((program) => {
            const currentIndex = currentImageIndexes[program._id] || 0;
            // Extract cloudinaryUrl from images array
            const images = program.images 
              ? program.images.map(img => img.cloudinaryUrl).filter(url => url)
              : [];
            const hasImages = images.length > 0;

            return (
              <div key={program._id} className="program-card">
                <div className="program-carousel">
                  {hasImages ? (
                    <>
                      <div className="carousel-images">
                        <img
                          src={images[currentIndex]}
                          alt={`${program.title} - Image ${currentIndex + 1}`}
                          className="carousel-image"
                        />
                      </div>

                      {images.length > 1 && (
                        <>
                          <button
                            className="carousel-btn prev-btn"
                            onClick={() => prevImage(program._id, images.length)}
                            aria-label="Previous image"
                          >
                            ‹
                          </button>
                          <button
                            className="carousel-btn next-btn"
                            onClick={() => nextImage(program._id, images.length)}
                            aria-label="Next image"
                          >
                            ›
                          </button>

                          <div className="carousel-dots">
                            {images.map((_, index) => (
                              <button
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToImage(program._id, index)}
                                aria-label={`Go to image ${index + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="no-image">
                      <p>No images available</p>
                    </div>
                  )}
                </div>

                <div className="program-content">
                  <h3 className="program-title">{program.title}</h3>
                  <p className="program-description">{program.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-programs">
            <p>No programs available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Programs;