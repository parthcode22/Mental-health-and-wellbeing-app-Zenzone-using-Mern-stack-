import React, { useState, useEffect } from 'react';
import './TherapistDirectory.css'
const TherapistDirectory = () => {
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterByQualification, setFilterByQualification] = useState('');

  useEffect(() => {
    fetchCSVData();
  }, []);

  const fetchCSVData = async () => {
    try {
      const response = await fetch('/dataset.csv');
      const csvText = await response.text();
      const parsedData = parseCSV(csvText);
      console.log("Parsed CSV data:", parsedData);
      setTherapists(parsedData);
      setFilteredTherapists(parsedData);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching CSV:", err);
      setError("Failed to load therapist data");
      setIsLoading(false);
    }
  };

  const parseCSV = (csvText) => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());

    return lines.slice(1).map((line) => {
      const values = [];
      let insideQuotes = false;
      let currentValue = '';

      for (let char of line) {
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim());

      const obj = {};
      headers.forEach((header, i) => {
        if (header === 'therapist name' || header === 'qualification' || header === 'location' || header === 'availability') {
          obj[header] = values[i];
        } else if (header === 'experience') {
          obj[header] = parseInt(values[i], 10) || 'N/A';
        } else if (header === 'average fees') {
          obj[header] = parseInt(values[i], 10) || 'N/A';
        }
      });
      return obj;
    }).filter(obj => Object.values(obj).some(val => val !== ''));
  };

  const searchTherapists = () => {
    let filtered = therapists.filter(therapist => 
      therapist.location && therapist.location.toLowerCase().includes(location.toLowerCase())
    );

    if (filterByQualification) {
      filtered = filtered.filter(therapist => 
        therapist.qualification.toLowerCase().includes(filterByQualification.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'experience') {
        return b.experience - a.experience;
      } else if (sortBy === 'fees') {
        return a['average fees'] - b['average fees'];
      }
      return 0;
    });

    setFilteredTherapists(filtered);
  };

  if (isLoading) {
    return <div style={styles.loading}>Loading therapist data...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Find Your Therapist</h1>
      <div style={styles.searchContainer}>
        <input 
          type="text" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          style={styles.searchInput}
        />
        <input 
          type="text" 
          value={filterByQualification} 
          onChange={(e) => setFilterByQualification(e.target.value)}
          placeholder="Filter by qualification"
          style={styles.searchInput}
        />
        <button onClick={searchTherapists} style={styles.searchButton}>Search</button>
      </div>
      <div style={styles.results}>
        {filteredTherapists.length === 0 ? (
          <p>No therapists found in this location.</p>
        ) : (
          filteredTherapists.map((therapist, index) => (
            <div key={index} style={styles.therapistCard}>
              <h2>{therapist['therapist name']}</h2>
              <p><strong>Qualification:</strong> {therapist.qualification}</p>
              <p><strong>Location:</strong> {therapist.location}</p>
              <p><strong>Availability:</strong> {therapist.availability}</p>
              <p><strong>Experience:</strong> {therapist.experience === 'N/A' ? 'N/A' : `${therapist.experience} years`}</p>
              <p><strong>Average Fees:</strong> {therapist['average fees'] === 'N/A' ? 'N/A' : `₹${therapist['average fees']}`}</p>
              <button style={styles.bookButton}>Book Appointment</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5em',
    color: '#333',
    textAlign: 'center',
    marginBottom: '30px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  sortSelect: {
    padding: '10px',
    marginRight: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  searchButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  results: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  therapistCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  bookButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginTop: '10px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2em',
    marginTop: '50px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2em',
    marginTop: '50px',
    color: 'red',
  },
};

export default TherapistDirectory;