import { Calendar, Clock, MapPin, Users, Star, Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Meeting } from '@/types'
import { formatDate } from '@/lib/utils'

interface MeetingCardProps {
    meeting: Meeting
    variant?: 'default' | 'featured'
}

export function MeetingCard({ meeting, variant = 'default' }: MeetingCardProps) {
    const isFeatured = variant === 'featured'

    return (
        <div className={`
      bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden
      ${isFeatured ? 'ring-2 ring-happy-yellow scale-105' : ''}
    `}>
            {/* Meeting Header */}
            <div className="aspect-video bg-gradient-to-br from-loyal-blue to-loyal-blue-700 relative p-6 flex items-center justify-center">
                <div className="text-center text-white">
                    <Calendar className="h-12 w-12 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold">{meeting.theme}</h3>
                    <p className="text-sm text-blue-200 mt-1">{meeting.type}</p>
                </div>
                {isFeatured && (
                    <Badge className="absolute top-4 right-4 bg-happy-yellow text-loyal-blue">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                    </Badge>
                )}
            </div>

            <div className="p-6">
                {/* Meeting Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-cool-gray-600 mb-4 gap-2">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(meeting.date)}
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        7:00 PM - 8:30 PM
                    </div>
                </div>

                <div className="flex items-center text-sm text-cool-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {meeting.location}
                </div>

                {/* Toastmaster */}
                <div className="mb-4">
                    <h4 className="font-semibold text-loyal-blue mb-2">Toastmaster</h4>
                    <p className="text-sm text-cool-gray-700">{meeting.toastmaster}</p>
                </div>

                {/* Speakers */}
                <div className="mb-4">
                    <h4 className="font-semibold text-loyal-blue mb-2 flex items-center">
                        <Mic className="h-4 w-4 mr-1" />
                        Speakers
                    </h4>
                    <div className="space-y-2">
                        {meeting.speakers.slice(0, 2).map((speaker, index) => (
                            <div key={index} className="text-sm">
                                <span className="font-medium">{speaker.name}</span>
                                <span className="text-cool-gray-600"> - {speaker.project}</span>
                                {speaker.speechTitle && (
                                    <div className="text-xs text-cool-gray-500 mt-1">
                                        "{speaker.speechTitle}"
                                    </div>
                                )}
                            </div>
                        ))}
                        {meeting.speakers.length > 2 && (
                            <div className="text-sm text-cool-gray-600">
                                +{meeting.speakers.length - 2} more speakers
                            </div>
                        )}
                    </div>
                </div>

                {/* Table Topics Master */}
                <div className="mb-4">
                    <h4 className="font-semibold text-loyal-blue mb-2">Table Topics Master</h4>
                    <p className="text-sm text-cool-gray-700">{meeting.tableTopicsMaster}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mb-4 pt-4 border-t border-cool-gray-200">
                    <div className="flex items-center text-sm text-cool-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        {meeting.attendance} attended
                    </div>
                    <Badge variant={meeting.status === 'Completed' ? 'default' : 'secondary'}>
                        {meeting.status}
                    </Badge>
                </div>

                {/* Action Button */}
                <Button
                    className="w-full"
                    variant={isFeatured ? 'accent' : 'primary'}
                    size="sm"
                >
                    {meeting.status === 'Completed' ? 'View Details' : 'RSVP Now'}
                </Button>
            </div>
        </div>
    )
}