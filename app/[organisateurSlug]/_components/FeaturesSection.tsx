// import React from 'react';
// import { 
//   Trophy, Users, Landmark, UserPlus, 
//   Calendar, Layout, ClipboardList, BarChart3, 
//   ShieldCheck, Zap, Target, Search 
// } from 'lucide-react';

// const OrganzationFeaturesSection = () => {
//   return (
//     <section id="features" className="py-24 bg-[#020408] text-white">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* EN-TÊTE DE SECTION */}
//         <div className="text-center mb-20">
//           <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter mb-6 uppercase">
//             Powerful Tools for <br />
//             <span className="text-blue-600">Every Professional.</span>
//           </h2>
//           <p className="text-gray-500 max-w-2xl mx-auto font-medium">
//             A complete ecosystem designed to elevate your sports organization to the next level.
//           </p>
//         </div>

//         {/* --- 1. FOR ORGANIZERS --- */}
//         <div className="mb-32">
//           <div className="flex items-center gap-4 mb-10">
//             <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center animate-float">
//               <Trophy className="text-white" size={28} />
//             </div>
//             <h3 className="text-3xl font-black italic uppercase tracking-tight">For Championship Organizers</h3>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <FeatureCard 
//               icon={<Layout className="text-blue-400" />}
//               title="Effortless Management"
//               desc="Create brackets, schedule matches, and monitor everything from one powerful dashboard."
//             />
//             <FeatureCard 
//               icon={<ShieldCheck className="text-blue-400" />}
//               title="Team Control"
//               desc="Review applications, manage approvals, and keep all team info organized."
//             />
//             <FeatureCard 
//               icon={<Landmark className="text-blue-400" />}
//               title="Financial Oversight"
//               desc="Track entry fees, payments, and expenses with complete transparency."
//             />
//             <FeatureCard 
//               icon={<Users className="text-blue-400" />}
//               title="Operator Management"
//               desc="Assign referees and staff members. Manage permissions and smooth operations."
//             />
//           </div>
//         </div>

//         {/* --- 2. FOR TEAM MANAGERS --- */}
//         <div className="mb-32">
//           <div className="flex items-center gap-4 mb-10">
//             <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center animate-float">
//               <UserPlus className="text-white" size={28} />
//             </div>
//             <h3 className="text-3xl font-black italic uppercase tracking-tight">For Team Managers</h3>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-8">
//             <FeatureCard 
//               variant="purple"
//               icon={<Search />}
//               title="Smart Recruitment"
//               desc="Find and recruit talented players. Build the perfect squad for your ambitions."
//             />
//             <FeatureCard 
//               variant="purple"
//               icon={<Calendar />}
//               title="Match & Schedule"
//               desc="View upcoming matches and organize friendly games with an integrated calendar."
//             />
//             <FeatureCard 
//               variant="purple"
//               icon={<ClipboardList />}
//               title="Transfer Management"
//               desc="Handle player transfers smoothly with complete digital documentation."
//             />
//           </div>
//         </div>

//         {/* --- 3. FOR COACHES --- */}
//         <div className="mb-10">
//           <div className="flex items-center gap-4 mb-10">
//             <div className="h-12 w-12 bg-emerald-600 rounded-xl flex items-center justify-center animate-float">
//               <Target className="text-white" size={28} />
//             </div>
//             <h3 className="text-3xl font-black italic uppercase tracking-tight">For Coaches</h3>
//           </div>
          
//           <div className="grid md:grid-cols-2 gap-8">
//             <div className="group bg-gradient-to-br from-emerald-600/20 to-transparent border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500">
//               <Zap className="text-emerald-500 mb-6 group-hover:scale-125 transition-transform" size={40} />
//               <h4 className="text-2xl font-black italic uppercase mb-4 italic">Tactical Board</h4>
//               <p className="text-gray-400 leading-relaxed">Design formations, plan strategies, and prepare your team for victory with our advanced tactical tools.</p>
//             </div>
//             <div className="group bg-gradient-to-br from-emerald-600/20 to-transparent border border-white/5 p-8 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500">
//               <BarChart3 className="text-emerald-500 mb-6 group-hover:scale-125 transition-transform" size={40} />
//               <h4 className="text-2xl font-black italic uppercase mb-4 italic">Performance Analytics</h4>
//               <p className="text-gray-400 leading-relaxed">Access detailed statistics and reports. Make data-driven decisions to optimize team performance.</p>
//             </div>
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// // COMPOSANT CARTE REUTILISABLE
// const FeatureCard = ({ icon, title, desc, variant = "blue" }: any) => {
//   const colors: any = {
//     blue: "hover:border-blue-500/50 group-hover:text-blue-400",
//     purple: "hover:border-purple-500/50 group-hover:text-purple-400",
//   };

//   return (
//     <div className={`group bg-white/5 border border-white/5 p-6 rounded-3xl transition-all duration-300 hover:bg-white/10 ${colors[variant]}`}>
//       <div className={`mb-6 transition-transform group-hover:-translate-y-2 duration-300`}>
//         {React.cloneElement(icon, { size: 32 })}
//       </div>
//       <h4 className="text-lg font-black italic uppercase mb-3">{title}</h4>
//       <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
//         {desc}
//       </p>
//     </div>
//   );
// };

// export default OrganzationFeaturesSection;



import React from 'react';
import { 
  Trophy, Users, Landmark, UserPlus, 
  Calendar, Layout, ClipboardList, BarChart3, 
  ShieldCheck, Zap, Target, Search, ArrowRight
} from 'lucide-react';

const OrganzationFeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-black tracking-widest uppercase text-sm">Features</span>
            <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase mt-2">
              Everything you need <br />
              <span className="text-gray-400">to win the game.</span>
            </h2>
          </div>
          <p className="text-gray-500 font-medium max-w-sm border-l-4 border-blue-600 pl-6">
            A professional ecosystem tailored for high-performance sports management.
          </p>
        </div>

        {/* --- 1. ORGANIZERS (Blue Theme) --- */}
        <div className="mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-black italic uppercase text-xs mb-8 border border-blue-100">
            <Trophy size={16} /> Championship Organizers
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Layout />}
              title="Effortless Management"
              desc="Set up brackets and schedule matches from one powerful dashboard."
              color="blue"
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="Registration Control"
              desc="Review team applications and manage approvals with zero friction."
              color="blue"
            />
            <FeatureCard 
              icon={<Landmark />}
              title="Financial Oversight"
              desc="Track entry fees and payments with automated financial reports."
              color="blue"
            />
            <FeatureCard 
              icon={<Users />}
              title="Staff Management"
              desc="Assign referees and coordinators with specific role permissions."
              color="blue"
            />
          </div>
        </div>

        {/* --- 2. TEAM MANAGERS & COACHES (Split Section) --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Section Managers */}
          <div className="lg:col-span-2 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-50 rounded-full text-purple-600 font-black italic uppercase text-xs border border-purple-100">
              <UserPlus size={16} /> Team Managers
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<Search />}
                title="Smart Recruitment"
                desc="Build the perfect squad by finding and recruiting top talents."
                color="purple"
              />
              <FeatureCard 
                icon={<ClipboardList />}
                title="Transfer Hub"
                desc="Handle incoming and outgoing players with complete digital docs."
                color="purple"
              />
            </div>
          </div>

          {/* Section Coaches */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-full text-emerald-600 font-black italic uppercase text-xs border border-emerald-100">
              <Target size={16} /> Coaches
            </div>
            <div className="group bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-500 h-full">
              <div className="h-14 w-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
                <Zap size={28} />
              </div>
              <h4 className="text-2xl font-black italic uppercase mb-4 tracking-tighter">Tactical Analytics</h4>
              <p className="text-gray-500 font-medium leading-relaxed">
                Design game plans and optimize team performance with data-driven tactical reports.
              </p>
              <div className="mt-8 flex items-center gap-2 text-emerald-600 font-bold text-sm uppercase italic">
                Explore Tools <ArrowRight size={16} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- COMPOSANT CARTE CLEAN ---
const FeatureCard = ({ icon, title, desc, color }: any) => {
  const colorMap: any = {
    blue: "text-blue-600 group-hover:bg-blue-600 shadow-blue-500/5",
    purple: "text-purple-600 group-hover:bg-purple-600 shadow-purple-500/5",
  };

  return (
    <div className="group bg-white p-8 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div className={`h-12 w-12 rounded-xl border border-gray-100 flex items-center justify-center mb-6 transition-all duration-500 ${colorMap[color]} group-hover:text-white group-hover:scale-110`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <h4 className="text-lg font-black italic uppercase mb-3 tracking-tighter group-hover:text-blue-600 transition-colors">
        {title}
      </h4>
      <p className="text-gray-500 text-sm font-medium leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

export default OrganzationFeaturesSection;