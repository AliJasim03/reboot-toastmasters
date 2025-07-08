
// src/components/ClubStatsSection.tsx - Real Data Component
'use client'

import { useClubStats } from '@/lib/hooks/use-clubStats'
import { Loading } from '@/components/ui'

export const ClubStatsSection = () => {
  const { stats, loading, error } = useClubStats()

  if (loading) {
    return (
      <section className="py-12 bg-fair-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <Loading size="md" />
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return null // Hide section on error
  }

  return (
    <section className="py-12 bg-fair-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-loyal mb-2">{stats.members}</div>
            <div className="text-sm text-gray-600">Club Members</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-maroon mb-2">{stats.completedSpeeches}</div>
            <div className="text-sm text-gray-600">Speeches Given</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow text-rich-black mb-2">{stats.meetings}</div>
            <div className="text-sm text-gray-600">Meetings Held</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-gray mb-2">{stats.activeOfficers}</div>
            <div className="text-sm text-gray-600">Active Officers</div>
          </div>
        </div>
      </div>
    </section>
  )
}
