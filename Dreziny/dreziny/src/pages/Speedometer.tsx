import './Speedometer.css'
import { useEffect, useState } from 'react';

import ReactSpeedometer from "react-d3-speedometer";

import { useLanguage } from '../i18n/LanguageContext';


export default function Speedometer() {
  const { t } = useLanguage();

  const [speed, setSpeed] = useState(0); // Rýchlosť v km/h
  const [accuracy, setAccuracy] = useState<number | null>(null); // Presnosť GPS v metroch
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    let watchId = null;

    if (isTracking) {
      if (!navigator.geolocation) {
        setError('Geolokácia nie je podporovaná týmto prehliadačom.');
        setIsTracking(false);
        return;
      }

      const options = {
        enableHighAccuracy: true, // Vynúti použitie GPS čipu namiesto Wi-Fi/mobilných buniek
        timeout: 10000,
        maximumAge: 0, // Nechceme staré dáta v cache
      };

      // Sleduje pohyb zariadenia v reálnom čase
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          // position.coords.speed je v metroch za sekundu (m/s)
          const speedMps = position.coords.speed;
          
          if (speedMps !== null && speedMps >= 0) {
            // Prepočet m/s na km/h (* 3.6)
            const speedKmh = speedMps * 3.6;
            setSpeed(Math.round(speedKmh * 10) / 10);
          } else {
            // Niektoré prehliadače/zariadenia nevracajú speed priamo, 
            // vtedy ukážeme 0 (alebo by sa musela dopočítat z predošlých súradníc)
            setSpeed(0);
          }

          setAccuracy(position.coords.accuracy);
          setError(null);
        },
        (err: any) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError('Prístup k polohe bol zamietnutý. Povoľte GPS v nastaveniach prehliadača.');
              break;
            case err.POSITION_UNAVAILABLE:
              setError('Informácie o polohe nie sú dostupné.');
              break;
            case err.TIMEOUT:
              setError('Vypršal časový limit na získanie polohy.');
              break;
            default:
              setError('Nastala neznáma chyba.');
          }
          setIsTracking(false);
        },
        options
      );
    }

    // Cleanup: zastavenie sledovania pri odpojení komponentu alebo vypnutí
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isTracking]);

  return (
    <section className="page page-limited-width">
      <h1>{t('speedometerTitle')}</h1>
      <div className='description-paragraph'>
        {t('speedometerDescription')}
      </div>
      <div>
        {error && <p style={{ color: '#ff4d4d', maxWidth: '300px', margin: '0 auto 15px' }}>{error}</p>}

        <div style={{ 
          fontSize: '64px', 
          fontWeight: 'bold', 
          margin: '20px 0',
          color: isTracking ? '#2ecc71' : '#7f8c8d',
          backgroundColor: isTracking ? '#ecf0f1' : '#bdc3c7',
          padding: '20px',
          borderRadius: '12px',
        }}>
          {speed} <span style={{ fontSize: '24px' }}>km/h</span>
        </div>

        <p style={{ fontSize: '14px', color: '#666' }}>
            {t('speedometerAccuracy').replace('{accuracy}', Math.round(accuracy ?? 0).toString())}
        </p>

        <div style={{ marginTop: '20px' }}>
          {!isTracking ? (
            <button 
              onClick={() => setIsTracking(true)}
              style={{ 
                padding: '12px 24px', 
                fontSize: '16px', 
                backgroundColor: '#27ae60', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer' 
              }}
            >
              {t('speedometerStartButton')}
            </button>
          ) : (
            <button 
              onClick={() => setIsTracking(false)}
              style={{ 
                padding: '12px 24px', 
                fontSize: '16px', 
                backgroundColor: '#c0392b', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer' 
              }}
            >
              {t('speedometerStopButton')}
            </button>
          )}
        </div>
        
        <ReactSpeedometer
          value={speed}
          minValue={0}
          maxValue={50}
          segments={5}
          needleColor="#464A4F"
          startColor="#10b981"
          endColor="#ef4444"
          textColor="#1f2937"
        />

      </div>
    </section>
  )
}