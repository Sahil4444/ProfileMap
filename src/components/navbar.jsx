"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Menu, Users, Home, Settings } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => {
  return location.pathname === `/ProfileMap/${path}`;
};

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-950"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 mt-8 pl-4">
                <Link
                  to="/ProfileMap/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  to="/ProfileMap/profiles"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Users className="h-5 w-5" />
                  Profiles
                </Link>
                <Link
                  to="/ProfileMap/admin"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Settings className="h-5 w-5" />
                  Admin
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/ProfileMap/" className="flex items-center gap-2">
            <div className="relative">
              <MapPin className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              <div className="absolute -top-1 -right-1">
                <Users className="h-3 w-3 text-teal-700 dark:text-teal-300" />
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              Profile
              <span className="text-emerald-600 dark:text-emerald-400">
                Map
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/ProfileMap/"
            className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              isActive("/ProfileMap/")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            to="/ProfileMap/profiles"
            className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              isActive("/ProfileMap/profiles") ||
              location.pathname.startsWith("/ProfileMap/profiles")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Profiles
          </Link>
          <Link
            to="/ProfileMap/admin"
            className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
              isActive("/ProfileMap/admin")
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
