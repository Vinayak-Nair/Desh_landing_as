'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import posthog from 'posthog-js';

type CalApi = ((...args: unknown[]) => unknown) & {
	loaded?: boolean;
	ns?: Record<string, CalApi>;
	q?: unknown[][];
};

type CalWindow = Window &
	typeof globalThis & {
		Cal?: CalApi;
	};

export function SimpleHeader() {
	const [open, setOpen] = React.useState(false);
	const [hidden, setHidden] = useState(false);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentY = window.scrollY;
			const scrolledPastThreshold = currentY > 80;
			const scrollingDown = currentY > lastScrollY.current;
			setHidden(scrollingDown && scrolledPastThreshold);
			lastScrollY.current = currentY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const links = [
		{ 
			label: 'Book a call with us', 
			href: 'https://cal.com/vinayak-nair-vbtd74/1-1-call-with-aswin-investing-from-abroad',
			isCal: true 
		},
	];

	useEffect(() => {
		(function (C: CalWindow, A: string, L: string) {
			const p = function (a: CalApi, ar: unknown[]) {
				a.q = a.q || [];
				a.q.push(ar);
			};
			const d = C.document;
			C.Cal = C.Cal || function (...args: unknown[]) {
				const cal = C.Cal as CalApi;
				if (!cal.loaded) {
					cal.ns = {};
					cal.q = cal.q || [];
					d.head.appendChild(d.createElement("script")).src = A;
					cal.loaded = true;
				}
				if (args[0] === L) {
					const api: CalApi = function (...apiArgs: unknown[]) {
						p(api, apiArgs);
					};
					const namespace = args[1];
					api.q = api.q || [];
					if(typeof namespace === "string"){
						const namespaces = cal.ns || {};
						cal.ns = namespaces;
						namespaces[namespace] = namespaces[namespace] || api;
						p(namespaces[namespace], args);
						return namespaces[namespace];
					}
					p(cal, args);
					return cal;
				}
				p(cal, args);
			};
		})(window, "https://app.cal.com/embed/embed.js", "init");
		const calWindow = window as CalWindow;
		calWindow.Cal?.("init", {origin:"https://cal.com"});
		calWindow.Cal?.("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
	}, []);

	return (
		<header
			className="sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out"
			style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
		>
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-6 lg:px-[100px]">
				{/* Logo */}
				<div className="flex items-center gap-2">
					<Image
						src="/desh-logo.svg"
						alt="Desh"
						width={134}
						height={68}
						priority
						className="h-9 w-auto"
					/>
				</div>

				{/* Desktop links */}
				<div className="hidden items-center gap-1 lg:flex">
					{links.map((link) => (
						<a
							key={link.label}
							className={buttonVariants({ variant: 'ghost' })}
							href={link.href}
							onClick={() => {
								posthog.capture('book_a_call_clicked', { location: 'header' });
							}}
							{...(link.isCal ? {
								'data-cal-link': "vinayak-nair-vbtd74/1-1-call-with-aswin-investing-from-abroad",
								'data-cal-config': '{"layout":"month_view"}'
							} : {})}
						>
							{link.label}
						</a>
					))}
					<Button 
						className="ml-2 rounded-[8px] bg-[#121212] px-6 text-white hover:bg-[#2a2a2a]"
						onClick={() => {
							posthog.capture('whatsapp_community_clicked', { location: 'header' });
							window.open("https://chat.whatsapp.com/KmasCJMGJ42Bqn9a4PkMw6?mode=gi_t", "_blank", "noopener,noreferrer");
						}}
					>
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
									onClick={() => {
										posthog.capture('book_a_call_clicked', { location: 'header_mobile' });
									}}
									{...(link.isCal ? {
										'data-cal-link': "vinayak-nair-vbtd74/1-1-call-with-aswin-investing-from-abroad",
										'data-cal-config': '{"layout":"month_view"}'
									} : {})}
								>
									{link.label}
								</a>
							))}
						</div>
						<SheetFooter>
							<Button 
								className="rounded-full bg-[#121212] text-white hover:bg-[#2a2a2a]"
								onClick={() => {
									posthog.capture('whatsapp_community_clicked', { location: 'header_mobile' });
									window.open("https://chat.whatsapp.com/KmasCJMGJ42Bqn9a4PkMw6?mode=gi_t", "_blank", "noopener,noreferrer");
								}}
							>
								Join us
							</Button>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	);
}
