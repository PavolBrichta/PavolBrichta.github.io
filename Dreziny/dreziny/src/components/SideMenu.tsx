import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'

export default function SideMenu() {
	const [open, setOpen] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const { language, setLanguage, t } = useLanguage()
	const firstLinkRef = useRef<HTMLElement | null>(null)

	// detect mobile on mount and resize
	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 640)
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

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
		if (!isMobile) {
			return;
		}
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

	const linkClass = ({ isActive }: { isActive: boolean }) => isActive ? 'active' : undefined

	const toggleOpenMenu = useCallback(() => { setOpen((s) => !s) }, []);
	const closeMenu = useCallback(() => { setOpen((s) => !s) }, []);
	const setLangSk = useCallback(() => {
		setLanguage('sk');
		setOpen(false);
	}, []);
	const setLangEn = useCallback(() => {
		setLanguage('en');
		setOpen(false);
	}, []);
	const setLangDe = useCallback(() => {
		setLanguage('de');
		setOpen(false);
	}, []);

	return (
		<>
			{isMobile && (
				<button className={`menu-toggle ${open ? 'menu-open' : ''}`} aria-label="Toggle menu" aria-expanded={open} onClick={toggleOpenMenu}>☰</button>
			)}

			<nav className={`side-menu ${open ? 'open' : ''}`} role="navigation" aria-hidden={isMobile ? !open : false}>
				<div className="side-menu-inner">
					<NavLink to="" end className={linkClass} onClick={closeMenu}
						ref={(el) => {
							if (el && !firstLinkRef.current)
								firstLinkRef.current = el as unknown as HTMLElement
						}}
					>
						{t('home')}
					</NavLink>

					<NavLink to="trails" className={linkClass} onClick={closeMenu}>
						{t('trails')}
					</NavLink>

					<NavLink to="activities" className={linkClass} onClick={closeMenu}>
						{t('activities')}
					</NavLink>

					<NavLink to="gallery" className={linkClass} onClick={closeMenu}>
						{t('gallery')}
					</NavLink>

					<NavLink to="contact" className={linkClass} onClick={closeMenu}>
						{t('contact')}
					</NavLink>
				</div>

				<div className="language-switcher fixed-lang" role="group" aria-label="Language selector">
					<button className={`lang-btn ${language === 'sk' ? 'active' : ''}`} onClick={setLangSk} aria-label="Slovak">SK</button>
					<button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={setLangEn} aria-label="English">EN</button>
					<button className={`lang-btn ${language === 'de' ? 'active' : ''}`} onClick={setLangDe} aria-label="German">DE</button>
				</div>
			</nav>

			{open && <div className="menu-backdrop" onClick={closeMenu} />}
		</>
	)
}
