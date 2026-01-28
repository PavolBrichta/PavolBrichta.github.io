import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
	const { t } = useLanguage()

	return (
		<section className="page page-limited-width">
			<h2>{t('contact')}</h2>
			<p>
				{t('trailsDescription')}{' '}
				<a href="mailto:hello@example.com">briketaraketa@gmail.com</a>
				{' '}{t('trailsOrCall')}{' '}<a href="tel:+421 908 082 881">0908 082 881</a>.
			</p>
			<h2>{t('contactOperationalRegulations')}</h2>
		</section>
	)
}