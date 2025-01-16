'use client'

import { StarIcon, ClockIcon, BusIcon } from "lucide-react"

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-gray-300 rounded-full p-4 text-center">
      <div className="flex items-center justify-center">
        <Icon className="h-5 w-5 text-red-700" />
        <span className="ml-2 font-medium">{title}</span>
      </div>
      <div className="text-2xl font-bold mt-2 text-red-700">{value}</div>
    </div>
  )
}

export function RouteStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <StatCard icon={ClockIcon} title="On Time" value={stats.onTime} />
      <StatCard icon={StarIcon} title="Overall" value={stats.overall} />
      <StatCard icon={BusIcon} title="Reliability" value={stats.reliability} />
    </div>
  )
} 