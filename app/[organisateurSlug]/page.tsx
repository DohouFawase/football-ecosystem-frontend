// import React from 'react';
// import HeroSection from './_components/organisationHero';
// import OrganzationFeaturesSection from './_components/FeaturesSection';
// import HowItWorks from './_components/howtitwork';
// import ExploreChampionships from './_components/championships';
// import FeaturesDeepDive from './_components/benefit';
// import FAQSection from './_components/faqSection';
// import BlogPreview from './_components/organisationBlog';

// const Page = () => {
//     return (
//         <div >
//          
           
//         </div>
//     );
// }

// export default Page;




"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { useOrgs } from "@/context/OrgContext";

// Tes imports de composants
import HeroSection from './_components/organisationHero';
import OrganzationFeaturesSection from './_components/FeaturesSection';
import HowItWorks from './_components/howtitwork';
import ExploreChampionships from './_components/championships';
import FeaturesDeepDive from './_components/benefit';
import FAQSection from './_components/faqSection';
import BlogPreview from './_components/organisationBlog';

const Page = () => {
    const params = useParams();
    const { organizations, isInitialized } = useOrgs();

    // On cherche l'organisation correspondante
    const org = organizations.find((o) => o.slug === params.slug);

    // Attendre que le localStorage soit chargé
    if (!isInitialized) return <div className="p-20 text-center">Chargement...</div>;

    // Si l'organisation n'existe pas
    if (!org) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Organisation "{params.slug}" introuvable</h1>
            </div>
        );
    }

    return (
        <div>
           {/* On passe les données de l'org aux composants si nécessaire */}
          <ExploreChampionships />
            <FeaturesDeepDive />
           <HowItWorks />
            <FAQSection />
           <BlogPreview />
        </div>
    );
}

export default Page;