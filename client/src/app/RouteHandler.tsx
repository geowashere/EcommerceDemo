"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { privateRoutes, publicRoutes } from "./utils/routes";

export default function RouteHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, isInitialized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isInitialized) return;

    const isPublic = publicRoutes.some((route) =>
      pathname.toLowerCase().startsWith(route.toLowerCase())
    );

    const isPrivate = privateRoutes.some((route) =>
      pathname.toLowerCase().startsWith(route.toLowerCase())
    );

    // Redirect authenticated users from public routes
    if (isPublic && token) {
      router.push("/");
      return;
    }

    // // Redirect unauthenticated users from protected routes
    if (isPrivate && !token) {
      router.push("/");
      return;
    }

    setIsAuthorized(true);
  }, [token, isInitialized, pathname, router]);

  // Show nothing until auth state is determined
  if (!isInitialized || !isAuthorized) {
    return null;
  }

  return <main className="flex-1">{children}</main>;
}
