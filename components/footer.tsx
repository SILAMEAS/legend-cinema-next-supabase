import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import {EnumPage} from "@/utils/enum/EnumPage";

export function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900">
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
                    {/* Brand Section */}
                    <div>
                        <div className="flex flex-col items-start mb-4">
                            <div className="flex gap-[2px] mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-red-600 rounded-sm" />
                                ))}
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold tracking-[0.3em] text-white">LEGEND</h2>
                            <div className="text-[8px] tracking-[0.2em] text-zinc-400">CINEMAS</div>
                        </div>
                        <p className="text-zinc-400 text-sm mb-4">
                            Experience premium movie entertainment at Legend Cinemas. Your destination for the latest blockbusters and
                            unforgettable cinema experiences.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="p-2 bg-zinc-900 hover:bg-red-600 rounded-full transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-zinc-900 hover:bg-red-600 rounded-full transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-zinc-900 hover:bg-red-600 rounded-full transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="p-2 bg-zinc-900 hover:bg-red-600 rounded-full transition-colors"
                                aria-label="YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href={EnumPage.USER_CINEMAS} className="text-zinc-400 hover:text-white transition-colors">
                                    Our Cinemas
                                </Link>
                            </li>
                            <li>
                                <Link href={EnumPage.USER_OFFERS} className="text-zinc-400 hover:text-white transition-colors">
                                    Special Offers
                                </Link>
                            </li>
                            <li>
                                <Link href={EnumPage.USER_FNB} className="text-zinc-400 hover:text-white transition-colors">
                                    Food & Beverage
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                    Membership
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-2 text-zinc-400">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>Vattanac Capital Mall, Level 5, Phnom Penh, Cambodia</span>
                            </li>
                            <li className="flex items-center gap-2 text-zinc-400">
                                <Phone className="w-5 h-5 flex-shrink-0" />
                                <span>+855 23 969 696</span>
                            </li>
                            <li className="flex items-center gap-2 text-zinc-400">
                                <Mail className="w-5 h-5 flex-shrink-0" />
                                <span>info@legend.com.kh</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-900 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-zinc-500 text-sm">© 2025 Legend Cinemas. All rights reserved.</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            Sitemap
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            Accessibility
                        </Link>
                        <Link href="#" className="text-zinc-500 hover:text-white transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
