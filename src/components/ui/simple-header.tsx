'use client';

import React from 'react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';

export function SimpleHeader() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{ label: 'About', href: '#' },
		{ label: 'Calculate', href: '#' },
		{ label: 'Contact us', href: '#' },
	];

	return (
		<header className="sticky top-0 z-50 w-full">
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 lg:px-[100px]">
				{/* Logo */}
				<div className="flex items-center gap-2">
					<span className="font-mono text-lg font-bold italic tracking-tight text-[#121212]">Desh</span>
				</div>

				{/* Desktop links */}
				<div className="hidden items-center gap-1 lg:flex">
					{links.map((link) => (
						<a
							key={link.label}
							className={buttonVariants({ variant: 'ghost' })}
							href={link.href}
						>
							{link.label}
						</a>
					))}
					<Button className="ml-2 rounded-[8px] bg-[#121212] px-6 text-white hover:bg-[#2a2a2a]">
						Join us
					</Button>
				</div>

				{/* Mobile menu */}
				<Sheet open={open} onOpenChange={setOpen}>
					<Button size="icon" variant="outline" className="lg:hidden border-black/15">
						<MenuToggle
							strokeWidth={2.5}
							open={open}
							onOpenChange={setOpen}
							className="size-6"
						/>
					</Button>
					<SheetContent
						className="bg-[#fffdf7]/95 backdrop-blur-lg gap-0"
						showClose={false}
						side="left"
					>
						<div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
							{links.map((link) => (
								<a
									key={link.label}
									className={buttonVariants({
										variant: 'ghost',
										className: 'justify-start',
									})}
									href={link.href}
								>
									{link.label}
								</a>
							))}
						</div>
						<SheetFooter>
							<Button className="rounded-full bg-[#121212] text-white hover:bg-[#2a2a2a]">
								Join us
							</Button>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
