import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import { useLanguage } from '../i18n/LanguageContext'

export default function Dashboard() {
  const [count, setCount] = useState(0)
  const { t } = useLanguage()

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{t('viteReact')}</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          {t('countIs')} {count}
        </button>
        <p>{t('editCode')}</p>
      </div>
      <p className="read-the-docs">{t('clickLogos')}</p>
    </>
  )
}
