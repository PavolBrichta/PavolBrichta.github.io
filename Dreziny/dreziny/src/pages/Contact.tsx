import { useLanguage } from '../i18n/LanguageContext'

export default function Contact() {
	const { t } = useLanguage()

	return (
		<section className="contact-page">
			<h2>{t('contactTitle')}</h2>
			<p>
				{t('contactDescription')}{' '}
				<a href="mailto:hello@example.com">hello@example.com</a>.
			</p>

			<form
				className="contact-form"
				onSubmit={(e) => {
					e.preventDefault()
					alert(t('messageSent'))
				}}
			>
				<label>
					{t('name')}
					<input name="name" />
				</label>
				<label>
					{t('email')}
					<input name="email" type="email" />
				</label>
				<label>
					{t('message')}
					<textarea name="message" rows={4} />
				</label>
				<button type="submit">{t('send')}</button>
			</form>
		</section>
	)
}