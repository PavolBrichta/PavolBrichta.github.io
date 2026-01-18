import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
	const { t } = useLanguage()

	return (
		<section className="page">
			<h2>{t('contact')}</h2>
			<p>
				{t('contactDescription')}{' '}
				<a href="mailto:hello@example.com">briketaraketa@gmail.com</a>
				{' '}{t('contactOrCall')}{' '}<a href="tel:+421 908 082 881">0908 082 881</a>.
			</p>
			<p>
				{t('contactLocation')}
			</p>
			<p>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19920.38180563555!2d17.409322297075498!3d48.60766917681548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476cb165b8992475%3A0x3aa634c89219e9db!2s906%2032%20Jablonica!5e0!3m2!1ssk!2ssk!4v1768150400631!5m2!1ssk!2ssk"
					width="600"
					height="450"
					style={{maxWidth:"100%"}}
					loading="lazy"></iframe>
			</p>
			<p>
				{t('contactOpeningHours')}
			</p>
			<p>
				{t('contactPrice')}28,50 €.
			</p>
		</section>
	)
}