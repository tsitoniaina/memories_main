"use client";
import { inter, lexendDeca } from "@/app/fonts";
import cn from "@utils/class-names";
import NextProgress from "@components/next-progress";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import { ThemeProvider, JotaiProvider } from "@/app/shared/theme-provider";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";

import "./globals.css";
import { isRoutingWithoutLayout, routes } from "@/config/routes.ts";
import React from "react";
import AuthProvider from "@/app/api/auth/[...nextauth]/auth-provider";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
const langReg = new RegExp(
  `\/(${Object.values(routes.languages.lang).join("|")})`,
);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const pathname = usePathname().replace(langReg, "").trim();
  const LayoutComponent = isRoutingWithoutLayout(
    pathname !== "" ? pathname : routes.signIn,
  )
    ? React.Fragment
    : HydrogenLayout;
  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <AuthProvider>
          <ThemeProvider>
            <NextProgress />
            <JotaiProvider>
              <LayoutComponent>{children}</LayoutComponent>
              <GlobalDrawer />
              <GlobalModal />
            </JotaiProvider>
          </ThemeProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
