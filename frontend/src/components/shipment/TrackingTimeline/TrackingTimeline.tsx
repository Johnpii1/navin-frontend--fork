import React from 'react';

export interface Milestone {
  id: string;
  name: string;
  timestamp: string;
  location: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface TrackingTimelineProps {
  milestones: Milestone[];
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ milestones }) => {
  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return (
          <svg
            className="w-6 h-6 shrink-0 z-10 text-accent-blue"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg" aria-label="Completed"
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'current':
        return (
          <svg
            className="w-6 h-6 shrink-0 z-10 text-accent-blue animate-timeline-pulse"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg" aria-label="Current"
          >
            <circle cx="12" cy="12" r="10" fill="currentColor" />
            <circle cx="12" cy="12" r="4" fill="white" />
          </svg>
        );
      case 'upcoming':
        return (
          <svg
            className="w-6 h-6 shrink-0 z-10 text-text-secondary"
            width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg" aria-label="Upcoming"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col p-4 sm:p-2 max-w-[600px]" role="list" aria-label="Shipment tracking timeline">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex gap-4 sm:gap-3 relative" role="listitem">
          {/* Marker */}
          <div className="flex flex-col items-center shrink-0">
            {getStatusIcon(milestone.status)}
            {index < milestones.length - 1 && (
              <div
                className={`w-0.5 grow min-h-[40px] mt-1 mb-1 ${
                  milestone.status === 'completed'
                    ? 'bg-accent-blue'
                    : 'connector-dashed'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
          {/* Content */}
          <div className={`grow pb-8 last:pb-0`}>
            <h3 className={`text-base sm:text-[0.9375rem] font-semibold m-0 mb-1 ${
              milestone.status === 'upcoming' ? 'text-text-secondary' : 'text-[#111827]'
            }`}>
              {milestone.name}
            </h3>
            <p className={`text-sm sm:text-[0.8125rem] m-0 mb-1 ${
              milestone.status === 'upcoming' ? 'text-text-secondary' : 'text-[#6b7280]'
            }`}>
              {milestone.timestamp}
            </p>
            <p className={`text-sm sm:text-[0.8125rem] m-0 ${
              milestone.status === 'upcoming' ? 'text-text-secondary' : 'text-[#6b7280]'
            }`}>
              {milestone.location}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
