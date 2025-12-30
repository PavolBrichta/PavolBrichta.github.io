import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function SideMenu() {
	const [open, setOpen] = useState(false)

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

	const linkClass = ({ isActive }: { isActive: boolean }) =>
		isActive ? 'active' : undefined

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

			<nav className={`side-menu ${open ? 'open' : ''}`} role="navigation">
				<div className="side-menu-inner">
					<NavLink
						to="/"
						end
						className={linkClass}
						onClick={() => setOpen(false)}
					>
						Home
					</NavLink>
					<NavLink
						to="/contact"
						className={linkClass}
						onClick={() => setOpen(false)}
					>
						Contact
					</NavLink>
				</div>
			</nav>

			{open && <div className="menu-backdrop" onClick={() => setOpen(false)} />}
		</>
	)
}
