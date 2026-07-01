import Link from 'next/link';
import { prisma } from '@/lib/db';
import { 
  Terminal, Database, Cloud, Smartphone, Palette, 
  Mail, Users, ArrowRight 
} from 'lucide-react';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5 fill-current"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className || "w-5 h-5 fill-current"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const metadata = {
  title: 'Our Team | Together Tech Groups',
  description: 'Meet our professional engineers and interface designers specializing in Flutter app development and custom web systems.',
};

export const revalidate = 60; // Cache and revalidate every 60 seconds (ISR)

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'asc' },
  });

  const aarsha = teamMembers.find((m) => m.id === 'k-aarsha');
  const priya = teamMembers.find((m) => m.id === 'p-priyadharshini');
  const vel = teamMembers.find((m) => m.id === 'm-velmurugan');
  
  // Filter out the featured bento members to list any other team members in a secondary grid below
  const otherMembers = teamMembers.filter(
    (m) => !['k-aarsha', 'p-priyadharshini', 'm-velmurugan'].includes(m.id)
  );

  return (
    <div className="relative min-h-screen bg-white text-brandDark overflow-hidden pt-36 pb-24 border-t border-slate-100">
      <main className="relative z-10 max-w-7xl mx-auto px-6 space-y-24">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <span className="text-brandGreen font-extrabold text-sm uppercase tracking-wider bg-brandGreen/10 border border-brandGreen/25 rounded-full px-4 py-1.5 inline-block">
            Our Professionals
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-brandDark">
            Architects of Innovation
          </h1>
          <p className="text-lg text-brandGray leading-relaxed font-biooris">
            Our multidisciplinary team combines technical rigor with creative flair to build digital experiences that redefine industry standards.
          </p>
        </section>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[vel, aarsha, priya].filter(Boolean).map((member) => {
            const Icon = member.id === 'm-velmurugan' ? Palette : member.id === 'k-aarsha' ? Terminal : Smartphone;
            const iconColor = member.id === 'm-velmurugan' ? 'text-brandGreen' : member.id === 'k-aarsha' ? 'text-brandGreen' : 'text-blue-500';

            return (
              <div 
                key={member.id}
                className="bg-white border border-slate-200/80 rounded-[2rem] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:border-brandGreen/35 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className="space-y-6">
                  {/* Photo Frame */}
                  <div className="w-32 h-32 rounded-3xl overflow-hidden border-2 border-slate-100 p-1 group-hover:border-brandGreen/50 transition-colors mx-auto shadow-inner relative bg-slate-50">
                    <img 
                      className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" 
                      alt={member.name} 
                      src={member.photo} 
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="text-center space-y-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block ${member.id === 'p-priyadharshini' ? 'text-blue-600 bg-blue-50/80 border border-blue-100/50' : 'text-brandGreen bg-brandGreenLight border border-brandGreen/25'}`}>
                      {member.role}
                    </span>
                    <h2 className="text-2xl font-black tracking-tight text-brandDark font-outfit">{member.name}</h2>
                  </div>
                  
                  <p className="text-brandGray text-xs sm:text-sm leading-relaxed text-center font-medium min-h-[72px]">
                    {member.bio}
                  </p>
                </div>
                
                {/* Footer skills & icon */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.split(',').slice(0, 3).map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-600 text-[10px] font-extrabold uppercase tracking-wide border border-slate-100"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                  <div className={`p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0 ${iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Join Card (Full Width) */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-[2rem] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-sm hover:border-brandGreen/35 transition-all duration-500">
          <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none">
            <Users className="w-64 h-64 text-brandDark" />
          </div>
          <div className="max-w-md space-y-6 relative z-10">
            <h3 className="text-3xl font-extrabold tracking-tight text-brandDark">Ready to Innovate With Us?</h3>
            <p className="text-brandGray text-sm leading-relaxed">
              We are always looking for passionate engineers and creative thinkers to join our mission of technical excellence.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full border border-brandGreen text-brandGreen font-bold text-sm tracking-wide transition-all duration-300 hover:bg-brandGreen hover:text-white"
            >
              <span>View Open Roles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Secondary Grid for any newly added active team members */}
        {otherMembers.length > 0 && (
          <section className="space-y-8 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-brandDark">Additional Professionals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherMembers.map((member) => {
                const socialObj = JSON.parse(member.socialLinks || '{}');
                return (
                  <div
                    key={member.id}
                    className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-brandGreen/35 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="space-y-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-200 p-1">
                        {member.photo ? (
                          <img className="w-full h-full object-cover rounded-full" alt={member.name} src={member.photo} />
                        ) : (
                          <div className="w-full h-full bg-brandGreen/10 flex items-center justify-center text-brandGreen text-xl font-bold rounded-full">
                            {member.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xxs font-bold text-brandGreen uppercase tracking-widest block mb-1">
                          {member.role}
                        </span>
                        <h4 className="text-xl font-bold text-brandDark">{member.name}</h4>
                      </div>
                      <p className="text-brandGray text-xs leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {member.skills.split(',').map((skill, index) => (
                          <span key={index} className="px-2 py-0.5 rounded bg-slate-100 text-brandDark text-[10px] font-bold">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-6 mt-6 border-t border-slate-100 flex space-x-4">
                      {socialObj.linkedin && (
                        <a href={socialObj.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brandGreen transition-colors">
                          <LinkedinIcon className="w-4 h-4" />
                        </a>
                      )}
                      {socialObj.github && (
                        <a href={socialObj.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brandGreen transition-colors">
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {socialObj.email && (
                        <a href={`mailto:${socialObj.email}`} className="text-slate-400 hover:text-brandGreen transition-colors">
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
