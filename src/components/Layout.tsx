// components/Layout.tsx
import { NavLink, Outlet } from "react-router";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm transition-colors hover:text-slate-900 ${
        isActive ? "font-medium text-slate-900" : "text-slate-500"
    }`;

export default function Layout() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <nav className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
          <span className="mr-auto font-semibold tracking-tight">
            Energy Readings
          </span>
                    <NavLink to="/readings" className={navLinkClass}>
                        Readings
                    </NavLink>
                    <NavLink to="/dailyaggs" className={navLinkClass}>
                        Daily Aggregates
                    </NavLink>
                </nav>
            </header>

            <main className="mx-auto max-w-5xl px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
}