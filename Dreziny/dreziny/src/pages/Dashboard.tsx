import './Dashboard.css'
import { useLanguage } from '../i18n/LanguageContext'

export default function Dashboard() {
  const { t } = useLanguage()

  return (
    <div className='dashboard-container'>
      <section className="page">
        <div>
          <h1>{t('homeTitle')}</h1>
          <div className='description-paragraph'>
            {t('homeDescription1')}
          </div>
          <div className='description-paragraph'>
            {t('homeDescription2')}
          </div>
          <div className='description-paragraph'>
            {t('homeDescription3')}
          </div>
          <div className='description-paragraph'>
            {t('homeDescription4')}
          </div>
          <div className='description-paragraph'>
            {t('homeDescription5')}
          </div>
        </div>
      </section>
    </div>
  )
}