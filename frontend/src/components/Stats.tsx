'use client';

interface StatItem {
  id: number;
  value: string;
  label: string;
}

interface StatsProps {
  stats: StatItem[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="bg-white text-black py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/10">
          {stats.map((stat, index) => (
            <div key={stat.id} className={`flex-1 text-center w-full py-4 md:py-0 ${index === 0 ? 'md:pr-8' : index === stats.length - 1 ? 'md:pl-8' : 'md:px-8'}`}>
              <p className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">{stat.value}</p>
              <p className="text-sm font-medium uppercase tracking-widest text-black/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
