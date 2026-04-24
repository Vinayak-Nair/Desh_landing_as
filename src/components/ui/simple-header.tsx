'use client';

import React, { useEffect } from 'react';
import { Sheet, SheetContent, SheetFooter } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';
import { MenuToggle } from '@/components/ui/menu-toggle';
import posthog from 'posthog-js';

export function SimpleHeader() {
	const [open, setOpen] = React.useState(false);

	const links = [
		{ 
			label: 'Book a call with us', 
			href: 'https://cal.com/vinayak-nair-vbtd74/1-1-call-with-aswin-investing-from-abroad',
			isCal: true 
		},
	];

	useEffect(() => {
		(function (C, A, L) {
			let p = function (a: any, ar: any) { a.q.push(ar); };
			let d = C.document;
			(C as any).Cal = (C as any).Cal || function () {
				let cal = (C as any).Cal;
				let ar = arguments;
				if (!cal.loaded) {
					cal.ns = {};
					cal.q = cal.q || [];
					d.head.appendChild(d.createElement("script")).src = A;
					cal.loaded = true;
				}
				if (ar[0] === L) {
					const api: any = function () { p(api, arguments); };
					const namespace = ar[1];
					api.q = api.q || [];
					if(typeof namespace === "string"){
						cal.ns[namespace] = cal.ns[namespace] || api;
						p(cal.ns[namespace], ar);
						return cal.ns[namespace];
					}
					p(cal, ar);
					return cal;
				}
				p(cal, ar);
			};
		})(window, "https://app.cal.com/embed/embed.js", "init");
		(window as any).Cal("init", {origin:"https://cal.com"});
		(window as any).Cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
	}, []);

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
