import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function SideMenu() {
	const [open, setOpen] = useState(false)
	const { language, setLanguage, t } = useLanguage()
	const firstLinkRef = useRef<HTMLElement | null>(null)

	// close drawer on Escape key
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])

	// hide body scroll when drawer is open
	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	// focus first link when opening (mobile)
	useEffect(() => {
		if (open) {
			setTimeout(() => firstLinkRef.current?.focus(), 80)
		}
	}, [open])

	const linkClass = ({ isActive }: { isActive: boolean }) =>
		isActive ? 'active' : undefined

	// simple runtime mobile check (used for aria-hidden)
	const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 640 : false

	return (
		<>
			<button
				className="menu-toggle"
				aria-label="Toggle menu"
				aria-expanded={open}
				onClick={() => setOpen((s) => !s)}
			>
				☰
			</button>

			<nav
				className={`side-menu ${open ? 'open' : ''}`}
				role="navigation"
				aria-hidden={isMobile ? !open : false}
			>
				<div className="side-menu-inner">
					<NavLink
						to="/"
						end
						className={linkClass}
						onClick={() => setOpen(false)}
						ref={(el) => {
							if (el && !firstLinkRef.current)
								firstLinkRef.current = el as unknown as HTMLElement
						}}
					>
						{t('home')}
					</NavLink>

					<NavLink
						to="/gallery"
						className={linkClass}
						onClick={() => setOpen(false)}
					>
						{t('gallery')}
					</NavLink>

					<NavLink
						to="/contact"
						className={linkClass}
						onClick={() => setOpen(false)}
					>
						{t('contact')}
					</NavLink>
				</div>

				<div
					className="language-switcher fixed-lang"
					role="group"
					aria-label="Language selector"
				>
					<button
						className={`lang-btn ${language === 'sk' ? 'active' : ''}`}
						onClick={() => setLanguage('sk')}
						aria-label="Slovak"
					>
						🇸🇰
					</button>
					<button
						className={`lang-btn ${language === 'en' ? 'active' : ''}`}
						onClick={() => setLanguage('en')}
						aria-label="English"
					>
						🇬🇧
					</button>
				</div>
			</nav>

			{open && <div className="menu-backdrop" onClick={() => setOpen(false)} />}
		</>
	)
}
