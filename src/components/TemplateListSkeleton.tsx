import React from 'react';
import { Skeleton } from './Skeleton';

export function TemplateListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 overflow-visible">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 h-44 flex flex-col justify-between">
          <div className="space-y-3">
            <Skeleton className="h-5 w-20 rounded-md" />
            <div className="space-y-2 pt-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="flex justify-end pt-3 border-t border-slate-50">
            <Skeleton className="h-5 w-5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
