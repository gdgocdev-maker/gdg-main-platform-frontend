import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import WhatWeOffer from "@/components/home/WhatWeOffer"
import FeaturedProjects from "@/components/home/FeaturedProjects";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import SponsorSection from "@/components/home/SponsorsSection";
import JoinCommunity from "@/components/home/JoinCommunity";
import LeadershipTeam from "@/components/home/LeadershipTeam"
import Committees from "@/components/home/Committees"
import Footer from "@/components/Footer"
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import { announcementFixtures } from "@/data/announcements";

export default function Home() {
  return (
    <>
      
      <main>
        <HeroSection />
        <AboutSection />
        <WhatWeOffer/>
        <LeadershipTeam/>
        <FeaturedProjects/>
        <AnnouncementsSection announcements={announcementFixtures} />
        <UpcomingEvents/>
        <SponsorSection/>
        {/* <LeadershipTeam/> */}
        <Committees/>
        <JoinCommunity/>
        <Footer/>
      </main>
    </>
  );
}
