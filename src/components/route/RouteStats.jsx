'use client'

import { StarIcon, ClockIcon, BusIcon } from "lucide-react"

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-gray-300 rounded-lg sm:rounded-full p-3 sm:p-4 text-center">
      <div className="flex items-center justify-center">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-red-700" />
        <span className="ml-1 sm:ml-2 text-sm sm:text-base font-medium">{title}</span>
      </div>
      <div className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 text-red-700">{value}</div>
    </div>
  )
}

export function RouteStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
      <StatCard icon={ClockIcon} title="On Time" value={stats.onTime} />
      <StatCard icon={StarIcon} title="Overall" value={stats.overall} />
      <StatCard icon={BusIcon} title="Reliability" value={stats.reliability} />
    </div>
  )
} 