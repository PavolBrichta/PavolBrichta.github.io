import { useLanguage } from '../i18n/LanguageContext'

export default function Activities() {
	const { t } = useLanguage()

	return (
		<section className="page">
			<div className='card'>
				<h2>{t('activitiesSport')}</h2>
				<div>
					Tu budu uvedené športové aktivity.
				</div>
			</div>
			<div className='card'>
				<h2>{t('activitiesSocial')}</h2>
				<div>
					Tu budu uvedené spoločenské aktivity.
				</div>
			</div>
		</section>
	)
}