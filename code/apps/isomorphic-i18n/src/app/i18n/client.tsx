"use client";

import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "@/app/i18n/settings";
import { useEffect } from "react";

const runsOnServerSide = typeof window === "undefined";

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? getOptions().supportedLngs : [],
  });

export function useTranslation(lang: string, ns?: string, options?: object) {
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;
  if (runsOnServerSide && i18n.resolvedLanguage !== lang) {
    i18next.changeLanguage(lang);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (i18n.resolvedLanguage === lang) return;
      i18n.changeLanguage(lang);
    }, [lang, i18n]);
  }
  return ret;
}
