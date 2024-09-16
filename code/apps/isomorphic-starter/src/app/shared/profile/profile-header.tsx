'use client';

import Link from "next/link";
import { routes } from "@/config/routes.ts";
import { useState, useEffect } from 'react';
import { Button, Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import { PiChatCircleText, PiUsers } from 'react-icons/pi';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';
import viewProfile from "@/app/actions/profil/viewProfile";
import { useParams } from "next/navigation";
import ProfileData from "@/app/actions/profil/typerofile";

export default function ProfileHeader() {
  const { layout } = useLayout();
  const { expandedLeft } = useBerylliumSidebars();
  const [dataProfile, setDataProfile] = useState<ProfileData | null>(null);
  const { lang } = useParams<{ lang: string }>();
 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await viewProfile();
        console.log("rogelladata",data);
        setDataProfile(data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!dataProfile){
    return <p>Loading profile...</p>
  }else if (dataProfile instanceof Error) {
    return <p>Error: {dataProfile.message}</p>
  }

  return (
    <div
      className={cn(
        layout === LAYOUT_OPTIONS.LITHIUM ? '3xl:-mt-4' : 'mt-0',
        layout === LAYOUT_OPTIONS.BORON && '-mt-[15px] 2xl:-mt-8'
      )}
    >
      <div
        className={cn(
          '-mx-6 h-[150px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] @5xl:h-[200px] 3xl:-mx-8  3xl:h-[250px] 4xl:-mx-10 4xl:h-[300px]',
          layout === LAYOUT_OPTIONS.BERYLLIUM &&
            (expandedLeft
              ? 'xl:-me-8 3xl:-ms-5 4xl:-ms-4'
              : 'xl:-me-8 4xl:-ms-6')
        )}
      />

      {dataProfile? (
        <div className="mx-auto w-full max-w-[1294px] @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between">
        <div className="flex h-auto gap-4 @5xl:gap-6">
          <div>
            <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-4 border-white bg-white shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] md:border-[6px] 3xl:w-[200px]">
            </div>
          </div>
          <div className="pt-2.5">
            <Title
              as="h1"
              className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
            >
              {dataProfile.name} {dataProfile.firstname}
            </Title>
            <Text className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
              {dataProfile.email}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-2 pt-3 @3xl:pt-4">
          <Button variant="outline" className="font-500 text-gray-900">
            <PiChatCircleText className="h-auto w-[18px]" />
            <Link href={routes.dashboard}>
              <span className="ms-1.5 inline-block">Message</span>
            </Link>
          </Button>
          <Button
            color="primary"
            className="font-500 ms-3.5 text-white"
          >
            <PiUsers className="h-auto w-[18px]" />
            <Link
              href={`/${lang + routes.editprofile}`}
            >
              <span className="ms-1.5 inline-block">Edit profile</span>
            </Link>
          </Button>
        </div>
        </div>
      ): (
        <p>Chargement du profil...</p>
      )}
    </div>
  );
}
