import './Speedometer.css'
import { useEffect, useState } from 'react';

import ReactSpeedometer from "react-d3-speedometer";

import { useLanguage } from '../i18n/LanguageContext';

const MAX_GPS_ACCURACY_METERS = 20;
const SPEED_SAMPLE_COUNT = 5;
const MIN_SPEED_SAMPLES = 3;


export default function Speedometer() {
  const { t } = useLanguage();

  const [speed, setSpeed] = useState(0); // Rýchlosť v km/h
  const [accuracy, setAccuracy] = useState<number | null>(null); // Presnosť GPS v metroch
  const [error, setError] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    if (!('wakeLock' in navigator)) return;

    let active = true;
    let wakeLock: WakeLockSentinel | null = null;
    let requestPending = false;
    let requestAgain = false;

    const requestWakeLock = async () => {
      if (!active || document.visibilityState !== 'visible') return;
      if (requestPending) {
        requestAgain = true;
        return;
      }

      requestPending = true;
      try {
        const sentinel = await navigator.wakeLock.request('screen');
        if (active) {
          wakeLock = sentinel;
        } else {
          await sentinel.release();
        }
      } catch (requestError) {
        if (active) console.warn('Unable to keep the screen awake:', requestError);
      } finally {
        requestPending = false;
        const shouldRetry = requestAgain && active && document.visibilityState === 'visible';
        requestAgain = false;
        if (shouldRetry) {
          void requestWakeLock();
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        void requestWakeLock();
      } else {
        wakeLock = null;
      }
    };

    void requestWakeLock();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      active = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) void wakeLock.release();
    };
  }, []);

  useEffect(() => {
    let watchId = null;
    const recentSpeeds: number[] = [];

    if (isTracking) {
      if (!navigator.geolocation) {
        setError(t('speedometerErrorPositionUnavailable'));
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
          setAccuracy(position.coords.accuracy);
          setError(null);
          if (position.coords.accuracy > MAX_GPS_ACCURACY_METERS) {
            recentSpeeds.length = 0;
            return;
          }

          // position.coords.speed je v metroch za sekundu (m/s)
          const speedMps = position.coords.speed;
          
          if (speedMps !== null && speedMps >= 0) {
            // Prepočet m/s na km/h (* 3.6)
            const speedKmh = speedMps * 3.6;
            recentSpeeds.push(speedKmh);
            if (recentSpeeds.length > SPEED_SAMPLE_COUNT) recentSpeeds.shift();

            if (recentSpeeds.length >= MIN_SPEED_SAMPLES) {
              const sortedSpeeds = [...recentSpeeds].sort((a, b) => a - b);
              const medianSpeed = sortedSpeeds[Math.floor(sortedSpeeds.length / 2)];
              setSpeed(Math.round(medianSpeed * 10) / 10);
            }
          } else {
            recentSpeeds.length = 0;
            // Niektoré prehliadače/zariadenia nevracajú speed priamo, 
            // vtedy ukážeme 0 (alebo by sa musela dopočítat z predošlých súradníc)
            setSpeed(0);
          }

        },
        (err: GeolocationPositionError) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError(t('speedometerErrorAccessDenied'));
              setIsTracking(false);
              break;
            case err.POSITION_UNAVAILABLE:
              setError(t('speedometerErrorPositionUnavailable'));
              break;
            case err.TIMEOUT:
              setError(t('speedometerErrorTimeout'));
              break;
            default:
              setError(t('speedometerErrorUnknown'));
          }
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

        <ReactSpeedometer
          value={speed}
          minValue={0}
          maxValue={50}
          segments={5}
          needleColor="#464A4F"
          startColor="#10b981"
          endColor="#ef4444"
          textColor="#1f2937"
          height={160}
        />

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
              onClick={() => {
                setError(null);
                setIsTracking(true);
              }}
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
              {error ? t('speedometerRetryButton') : t('speedometerStartButton')}
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
      </div>
    </section>
  )
}