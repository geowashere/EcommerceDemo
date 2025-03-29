"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const hideNavbarPaths = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarPaths.some((path) =>
    pathname?.startsWith(path)
  );

  if (shouldHideNavbar) return null;
  return <Navbar />;
}
