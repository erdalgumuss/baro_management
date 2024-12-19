import React from 'react'

export interface TimelineItemProps {
  title: string
  content: string
  date: string
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ title, content, date }) => (
  <div className="mb-8 flex justify-between items-center w-full">
    <div className="order-1 w-5/12"></div>
    <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
      <h1 className="mx-auto font-semibold text-lg text-white">{title[0]}</h1>
    </div>
    <div className="order-1 bg-gray-700 rounded-lg shadow-xl w-5/12 px-6 py-4">
      <h3 className="mb-3 font-bold text-white text-xl">{title}</h3>
      <p className="text-sm leading-snug tracking-wide text-white text-opacity-100">{content}</p>
      <p className="mt-2 text-xs text-gray-400">{date}</p>
    </div>
  </div>
)

export const Timeline: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="container mx-auto w-full h-full">
    <div className="relative wrap overflow-hidden p-10 h-full">
      <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
      {children}
    </div>
  </div>
)

