// app/talents/loading.tsx

import { Loader2 } from "lucide-react";

const SkeletonTalentCard = () => (
    <div className="group flex flex-col overflow-hidden rounded-2xl border bg-card/80 dark:bg-neutral-900/50 border-neutral-800 animate-pulse">
        <div className="p-6 pb-0 flex flex-col items-center text-center">
            {/* Pulsing circle for the avatar */}
            <div className="rounded-full bg-neutral-700 h-24 w-24 -mt-16 mb-2"></div>
            {/* Placeholders for name and headline */}
            <div className="h-6 w-3/4 bg-neutral-700 rounded-md mb-2"></div>
            <div className="h-4 w-1/2 bg-neutral-700 rounded-md"></div>
             {/* Placeholder for availability badge */}
            <div className="h-6 w-24 bg-neutral-700 rounded-full mt-2"></div>
        </div>
        
        <div className="p-6 pt-4 flex-grow flex flex-col">
            {/* Placeholder for skills badges */}
            <div className="flex flex-wrap gap-2 justify-center mb-5 min-h-[52px]">
                <div className="h-5 w-16 bg-neutral-700 rounded-full"></div>
                <div className="h-5 w-20 bg-neutral-700 rounded-full"></div>
                <div className="h-5 w-14 bg-neutral-700 rounded-full"></div>
            </div>

            {/* Placeholder for location and points */}
            <div className="flex justify-between items-center text-sm pt-4 border-t border-white/10 mt-auto">
                 <div className="h-4 w-24 bg-neutral-700 rounded-md"></div>
                 <div className="h-4 w-16 bg-neutral-700 rounded-md"></div>
            </div>
        </div>
        {/* Placeholder for footer buttons */}
        <div className="p-4 grid grid-cols-1 gap-2 border-t border-white/10">
            <div className="h-10 w-full bg-neutral-700 rounded-full"></div>
            <div className="h-10 w-full bg-neutral-700 rounded-full"></div>
        </div>
    </div>
);


export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
        {/* Header placeholder */}
        <div className="text-center mb-12">
            <div className="h-12 w-1/2 bg-neutral-800 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-3/4 bg-neutral-800 rounded-lg mx-auto animate-pulse"></div>
        </div>
        {/* Filters placeholder */}
        <div className="sticky top-16 bg-neutral-900/80 py-4 z-40 rounded-lg mb-12 animate-pulse">
             <div className="h-14 bg-neutral-800 rounded-full"></div>
        </div>
        {/* Grid of skeleton cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SkeletonTalentCard />
            <SkeletonTalentCard />
            <SkeletonTalentCard />
            <SkeletonTalentCard />
            <SkeletonTalentCard />
            <SkeletonTalentCard />
            <SkeletonTalentCard />
            <SkeletonTalentCard />
        </div>
    </div>
  );
}
