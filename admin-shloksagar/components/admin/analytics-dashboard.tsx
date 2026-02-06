'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { adminApi } from '@/lib/api'
import { Users, BookOpen, Video, Quote } from 'lucide-react'

const initialStats = {
    dailyStats: [],
    totalUsers: 0,
    totalReads: 0,
    totalShares: 0,
    videoPlays: 0,
    popularContent: []
}

export default function AnalyticsDashboard() {
    const [stats, setStats] = useState<any>(initialStats)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true)
                const res = await adminApi.getDashboard('7d')
                if (res.success && res.data) {
                    const daily = res.data.daily || [];
                    const topPages = res.data.topPages || [];

                    const totalReads = daily.reduce((acc: number, curr: any) => acc + (curr.views || 0), 0);
                    const totalUsers = daily.reduce((acc: number, curr: any) => acc + (curr.visitors || 0), 0);

                    setStats({
                        dailyStats: daily,
                        totalUsers,
                        totalReads,
                        totalShares: 0, // Not tracked yet
                        videoPlays: 0, // Not tracked yet
                        popularContent: topPages
                    })
                }
            } catch (error) {
                console.error('Failed to fetch analytics:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return <div className="p-8 text-center">Loading analytics...</div>
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Analytics Overview</h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Reads</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalReads || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            +4% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Video Plays</CardTitle>
                        <Video className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.videoPlays || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            +8% from last month
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
                        <Quote className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalShares || 0}</div>
                        <p className="text-xs text-muted-foreground">
                            +15% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Content Engagement</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.dailyStats}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Content List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {(stats.popularContent || []).map((item: any, i: number) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-full space-y-1">
                                        <p className="text-sm font-medium leading-none">{item.title || item.name || 'Untitled'}</p>
                                        <p className="text-xs text-muted-foreground">{item.category || item.type}</p>
                                    </div>
                                    <div className="ml-auto font-medium">{item.views} views</div>
                                </div>
                            ))}
                            {(!stats.popularContent || stats.popularContent.length === 0) && (
                                <p className="text-sm text-muted-foreground">No data available yet.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
