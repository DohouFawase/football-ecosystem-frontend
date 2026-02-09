import React from 'react';
import HeroSection from './_components/organisationHero';
import OrganzationFeaturesSection from './_components/FeaturesSection';
import HowItWorks from './_components/howtitwork';
import ExploreChampionships from './_components/championships';
import FeaturesDeepDive from './_components/benefit';
import FAQSection from './_components/faqSection';
import BlogPreview from './_components/organisationBlog';

const Page = () => {
    return (
        <div >
           <ExploreChampionships />
           <FeaturesDeepDive />
           <HowItWorks />
           <FAQSection />
           <BlogPreview />
           
        </div>
    );
}

export default Page;
