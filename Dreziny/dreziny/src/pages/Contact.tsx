import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
	const { t } = useLanguage()

	return (
		<section className="contact-page">
			<h2>{t('contactTitle')}</h2>
			<p>
				{t('contactDescription')}{' '}
				<a href="mailto:hello@example.com">briketaraketa@gmail.com</a>.
			</p>
		</section>
	)
}