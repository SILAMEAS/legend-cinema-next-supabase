"use client"

import {Bell, ChevronDown, MapPin, Menu, Search, TicketIcon, User, X} from "lucide-react"
import {Button} from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import React, {useCallback, useMemo, useState} from "react"
import {EnumPage} from "@/utils/enum/EnumPage";
import {AuthButton} from "@/components/auth-button";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setMovie} from "@/redux/slices/counterSlice";
import {debounce} from "lodash";
import {STOP_TYPING_TIMEOUT} from "@/utils/constants/constants";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const movie = useAppSelector(state => state.counter.movie);
    const dispatch = useAppDispatch();
    const debouncedSearch = useMemo(
        () =>
            debounce((search: string) => {
                dispatch(setMovie({ ...movie, search }));
            }, STOP_TYPING_TIMEOUT),
        [dispatch, movie]
    );

    const handleSearchDebounce = useCallback(
        (search: string) => debouncedSearch(search),
        [debouncedSearch]
    );

    return (
        <>
            {/* Top Navigation Bar */}
            <header className="border-b border-zinc-800">
                <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            className="lg:hidden p-2 hover:bg-zinc-900 rounded-md"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                        </button>

                        <div className="hidden lg:flex items-center gap-2 bg-zinc-900 rounded-md px-4 py-2 w-64">
                            <input
                                type="text"
                                placeholder="Search Movies..."
                                className="bg-transparent border-none outline-none text-sm text-zinc-400 placeholder:text-zinc-600 w-full"
                                onChange={(e) => handleSearchDebounce(e.target.value)}
                            />
                            <Search className="w-4 h-4 text-zinc-600"/>
                        </div>

                        {/* Logo - centered on mobile */}
                        <Link href={EnumPage.ROOT} className="flex flex-col items-center flex-1 lg:flex-none">
                            <div className="flex gap-[2px] mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-600 rounded-sm"/>
                                ))}
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-[0.3em] text-white">LEGEND</h1>
                            <div className="text-[7px] md:text-[8px] tracking-[0.2em] text-zinc-400 mt-0.5">CINEMAS
                            </div>
                        </Link>

                        <div className="flex items-center gap-2 md:gap-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden md:flex text-white hover:text-white hover:bg-zinc-900"
                            >
                                <TicketIcon className="w-4 h-4 mr-2"/>
                                Ticket
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden md:flex text-white hover:text-white hover:bg-zinc-900"
                            >
                                <User className="w-4 h-4 mr-2"/>
                                Join Now
                            </Button>
                            <button className="relative p-2 hover:bg-zinc-900 rounded-md">
                                <Bell className="w-4 h-4 md:w-5 md:h-5"/>
                            </button>
                            <button
                                className="hidden md:flex items-center gap-1 px-3 py-2 hover:bg-zinc-900 rounded-md">
                                <Image src="/us-flag-waving.png" alt="EN" width={24} height={16}
                                       className="rounded-sm"/>
                                <span className="text-sm">EN</span>
                                <ChevronDown className="w-4 h-4"/>
                            </button>
                            <AuthButton/>
                        </div>
                    </div>

                    <div className="lg:hidden mt-3">
                        <div className="flex items-center gap-2 bg-zinc-900 rounded-md px-4 py-2">
                            <input
                                type="text"
                                placeholder="Search Movies..."
                                className="bg-transparent border-none outline-none text-sm text-zinc-400 placeholder:text-zinc-600 w-full"
                            />
                            <Search className="w-4 h-4 text-zinc-600"/>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="hidden lg:block border-b border-zinc-900">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-8">
                            <Link href={EnumPage.ROOT}
                                  className="flex items-center gap-2 text-zinc-400 hover:text-white">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                </svg>
                                Home
                            </Link>
                            <Link href={EnumPage.USER_CINEMAS}
                                  className="flex items-center gap-2 text-zinc-400 hover:text-white">
                                <MapPin className="w-5 h-5"/>
                                Cinemas
                            </Link>
                            <Link href={EnumPage.USER_OFFERS}
                                  className="flex items-center gap-2 text-zinc-400 hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                                Offers
                            </Link>
                            <Link href={EnumPage.USER_FNB}
                                  className="flex items-center gap-2 text-zinc-400 hover:text-white">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                                F&B
                            </Link>
                        </div>
                        <button className="flex items-center gap-2 text-red-600">
                            <MapPin className="w-4 h-4"/>
                            All Cinemas
                            <ChevronDown className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </nav>

            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/95">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex items-center justify-between mb-8">
                            <Link href="/" className="flex flex-col items-center"
                                  onClick={() => setMobileMenuOpen(false)}>
                                <div className="flex gap-[2px] mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-2 h-2 bg-red-600 rounded-sm"/>
                                    ))}
                                </div>
                                <h1 className="text-2xl font-bold tracking-[0.3em] text-white">LEGEND</h1>
                                <div className="text-[8px] tracking-[0.2em] text-zinc-400 mt-0.5">CINEMAS</div>
                            </Link>
                            <button className="p-2 hover:bg-zinc-900 rounded-md"
                                    onClick={() => setMobileMenuOpen(false)}>
                                <X className="w-6 h-6"/>
                            </button>
                        </div>

                        <nav className="space-y-4">
                            <Link
                                href={EnumPage.ROOT}
                                className="flex items-center gap-3 text-lg text-zinc-400 hover:text-white py-3 border-b border-zinc-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                </svg>
                                Home
                            </Link>
                            <Link
                                href={EnumPage.USER_CINEMAS}
                                className="flex items-center gap-3 text-lg text-zinc-400 hover:text-white py-3 border-b border-zinc-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <MapPin className="w-6 h-6"/>
                                Cinemas
                            </Link>
                            <Link
                                href={EnumPage.USER_OFFERS}
                                className="flex items-center gap-3 text-lg text-zinc-400 hover:text-white py-3 border-b border-zinc-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                    />
                                </svg>
                                Offers
                            </Link>
                            <Link
                                href={EnumPage.USER_FNB}
                                className="flex items-center gap-3 text-lg text-zinc-400 hover:text-white py-3 border-b border-zinc-900"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                                </svg>
                                F&B
                            </Link>
                            <button className="flex items-center gap-3 text-lg text-red-600 py-3 w-full">
                                <MapPin className="w-6 h-6"/>
                                All Cinemas
                                <ChevronDown className="w-6 h-6 ml-auto"/>
                            </button>

                            <div className="pt-6 space-y-3">
                                <Button className="w-full bg-red-600 hover:bg-red-700 text-white justify-start gap-3">
                                    <TicketIcon className="w-5 h-5"/>
                                    Get Ticket
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full border-zinc-700 hover:bg-zinc-900 text-white justify-start gap-3 bg-transparent"
                                >
                                    <User className="w-5 h-5"/>
                                    Join Now
                                </Button>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}
