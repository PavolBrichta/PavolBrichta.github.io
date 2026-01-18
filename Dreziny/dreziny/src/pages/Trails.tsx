import { useLanguage } from '../i18n/LanguageContext'

export default function Trails() {
	const { t } = useLanguage()

	return (
		<section className="page">
			<h2>{t('trailsTrail1')}</h2>
			<p>
				{t('trailsLocation')}
			</p>
			<p>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17746.998962808462!2d17.419270960080006!3d48.60779999772335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476cb3d919cb6d8f%3A0x98444982549541ab!2sJablonica%2019%2C%20906%2032%20Jablonica!5e0!3m2!1ssk!2ssk!4v1768750955188!5m2!1ssk!2ssk"
					width="600"
					height="450"
					style={{maxWidth:"100%"}}
					loading="lazy"></iframe>
			</p>
			<p>
				{t('trailsOpeningHours')}
			</p>
			<p>
				{t('trailsPrice')}20 €.
			</p>
			<p>
				{t('trailsDescription')}{' '}
				<a href="mailto:hello@example.com">briketaraketa@gmail.com</a>
				{' '}{t('trailsOrCall')}{' '}<a href="tel:+421 908 082 881">0908 082 881</a>.
			</p>
		</section>
	)
}