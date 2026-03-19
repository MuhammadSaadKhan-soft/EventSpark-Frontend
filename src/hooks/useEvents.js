import { useState, useEffect } from 'react';
import API from '../api/axios';
const useEvents = () => {
  const [events, setEvents]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    API
      .get('/api/events')          
      .then((res) => {
        setEvents(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch events');
        setLoading(false);
      });
  }, []);

  return { events, loading, error };
};

export default useEvents;
