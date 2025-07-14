"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserPlus, Package, DollarSign, Bell } from "lucide-react"

interface Notification {
  id: string
  type: "farmer_registered" | "produce_added" | "bid_sent"
  title: string
  description: string
  time: string
  read: boolean
}

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all")

  const allNotifications: Notification[] = [
    {
      id: "1",
      type: "farmer_registered",
      title: "New Farmer Registration",
      description: "Amina Nakato has been registered under Green Valley Cooperative in Kampala District",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "produce_added",
      title: "New Produce Added",
      description: "Coffee beans (500kg) added by Grace Wanjiku from Wakiso District",
      time: "4 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "bid_sent",
      title: "New Bid Received",
      description: "A bid has been sent to Fatuma Mwalimu for Maize (2000kg) in Mbarara District",
      time: "6 hours ago",
      read: true,
    },
    {
      id: "4",
      type: "farmer_registered",
      title: "New Farmer Registration",
      description: "Mary Uwimana has been registered under Gulu Agricultural Collective in Gulu District",
      time: "1 day ago",
      read: true,
    },
    {
      id: "5",
      type: "produce_added",
      title: "New Produce Added",
      description: "Rice (1200kg) added by John Mwesigwa from Kabarole District",
      time: "1 day ago",
      read: true,
    },
    {
      id: "6",
      type: "bid_sent",
      title: "New Bid Received",
      description: "A bid has been sent to Ibrahim Ssali for Beans (800kg) in Jinja District",
      time: "2 days ago",
      read: true,
    },
    {
      id: "7",
      type: "farmer_registered",
      title: "New Farmer Registration",
      description: "Zainab Mwangi has been registered under Mukono Farmers Union in Mukono District",
      time: "2 days ago",
      read: false,
    },
    {
      id: "8",
      type: "produce_added",
      title: "New Produce Added",
      description: "Sweet Potato (900kg) added by Emmanuel Nkurunziza from Mbale District",
      time: "3 days ago",
      read: true,
    },
    {
      id: "9",
      type: "bid_sent",
      title: "New Bid Received",
      description: "A bid has been sent to Halima Juma for Coffee (600kg) in Lira District",
      time: "3 days ago",
      read: false,
    },
    {
      id: "10",
      type: "farmer_registered",
      title: "New Farmer Registration",
      description: "Robert Kiggundu has been registered under Central Uganda Alliance in Kasese District",
      time: "4 days ago",
      read: true,
    },
  ]

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return allNotifications.filter((n) => !n.read)
      case "farmer_registered":
        return allNotifications.filter((n) => n.type === "farmer_registered")
      case "produce_added":
        return allNotifications.filter((n) => n.type === "produce_added")
      case "bid_sent":
        return allNotifications.filter((n) => n.type === "bid_sent")
      default:
        return allNotifications
    }
  }

  const filteredNotifications = getFilteredNotifications()
  const unreadCount = allNotifications.filter((n) => !n.read).length

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "farmer_registered":
        return <UserPlus className="h-4 w-4 text-green-600" />
      case "produce_added":
        return <Package className="h-4 w-4 text-green-600" />
      case "bid_sent":
        return <DollarSign className="h-4 w-4 text-green-600" />
      default:
        return <Bell className="h-4 w-4 text-green-600" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "farmer_registered":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Farmer Registration</Badge>
      case "produce_added":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Produce Added</Badge>
      case "bid_sent":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Bid Received</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTabCount = (tabType: string) => {
    switch (tabType) {
      case "unread":
        return allNotifications.filter((n) => !n.read).length
      case "farmer_registered":
        return allNotifications.filter((n) => n.type === "farmer_registered").length
      case "produce_added":
        return allNotifications.filter((n) => n.type === "produce_added").length
      case "bid_sent":
        return allNotifications.filter((n) => n.type === "bid_sent").length
      default:
        return allNotifications.length
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Bell className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-green-800">Notifications</h1>
          {unreadCount > 0 && <p className="text-sm text-gray-600">{unreadCount} unread notifications</p>}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All ({getTabCount("all")})</TabsTrigger>
              <TabsTrigger value="unread">Unread ({getTabCount("unread")})</TabsTrigger>
              <TabsTrigger value="farmer_registered">Farmers ({getTabCount("farmer_registered")})</TabsTrigger>
              <TabsTrigger value="produce_added">Produce ({getTabCount("produce_added")})</TabsTrigger>
              <TabsTrigger value="bid_sent">Bids ({getTabCount("bid_sent")})</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 p-4 rounded-lg border transition-colors ${
                        !notification.read
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <Avatar className={`${!notification.read ? "bg-green-100 border-green-300" : "bg-gray-100"}`}>
                        <AvatarFallback>{getTypeIcon(notification.type)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-medium ${!notification.read ? "text-green-800" : "text-gray-900"}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                          </div>
                          {getTypeBadge(notification.type)}
                        </div>

                        <p className={`text-sm ${!notification.read ? "text-green-700" : "text-gray-600"}`}>
                          {notification.description}
                        </p>

                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No notifications found</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {activeTab === "unread"
                        ? "All notifications have been read"
                        : "No notifications match the selected filter"}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotificationsPage
