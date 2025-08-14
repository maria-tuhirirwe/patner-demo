"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Users, UserCheck, FileText, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"

interface Bid {
  id: string
  buyerName: string
  farmerName: string
  produce: string
  quantity: number
  bidPrice: number
  farmerPrice: number
  status: "pending" | "accepted" | "rejected"
  date: string
}

interface Registration {
  id: string
  type: "farmer" | "agent" | "cooperative"
  name: string
  location: string
  date: string
}

const Dashboard = () => {
  const [reportPeriod, setReportPeriod] = useState("7days")
  const [bidSearch, setBidSearch] = useState("")
  const [registrationSearch, setRegistrationSearch] = useState("")
  const [bidPage, setBidPage] = useState(1)
  const [registrationPage, setRegistrationPage] = useState(1)
  const itemsPerPage = 5

  // Expanded dummy data with East African names
  const allBids: Bid[] = [
    {
      id: "1",
      buyerName: "Kampala Grain Traders",
      farmerName: "Amina Nakato",
      produce: "Maize",
      quantity: 5000,
      bidPrice: 2.5,
      farmerPrice: 2.3,
      status: "accepted",
      date: "2024-01-15",
    },
    {
      id: "2",
      buyerName: "Jinja Mills Ltd",
      farmerName: "Joseph Kiprotich",
      produce: "Rice",
      quantity: 3000,
      bidPrice: 3.2,
      farmerPrice: 3.0,
      status: "accepted",
      date: "2024-01-14",
    },
    {
      id: "3",
      buyerName: "Mbarara Commodities",
      farmerName: "Grace Wanjiku",
      produce: "Wheat",
      quantity: 7500,
      bidPrice: 1.8,
      farmerPrice: 2.6,
      status: "rejected",
      date: "2024-01-13",
    },
    {
      id: "4",
      buyerName: "Uganda Coffee Export",
      farmerName: "Hassan Mukasa",
      produce: "Coffee",
      quantity: 2000,
      bidPrice: 4.8,
      farmerPrice: 4.5,
      status: "accepted",
      date: "2024-01-12",
    },
    {
      id: "5",
      buyerName: "Gulu Grains Co",
      farmerName: "Fatuma Mwalimu",
      produce: "Beans",
      quantity: 1500,
      bidPrice: 2.0,
      farmerPrice: 3.2,
      status: "rejected",
      date: "2024-01-11",
    },
    {
      id: "6",
      buyerName: "Wakiso Traders",
      farmerName: "Samuel Ochieng",
      produce: "Maize",
      quantity: 4200,
      bidPrice: 2.4,
      farmerPrice: 2.3,
      status: "accepted",
      date: "2024-01-10",
    },
    {
      id: "7",
      buyerName: "Mbale Agricultural Co",
      farmerName: "Mary Uwimana",
      produce: "Rice",
      quantity: 3800,
      bidPrice: 2.8,
      farmerPrice: 3.1,
      status: "pending",
      date: "2024-01-09",
    },
    {
      id: "8",
      buyerName: "Fort Portal Mills",
      farmerName: "Peter Ssemakula",
      produce: "Wheat",
      quantity: 6000,
      bidPrice: 2.2,
      farmerPrice: 2.5,
      status: "pending",
      date: "2024-01-08",
    },
  ]

  const allRegistrations: Registration[] = [
    {
      id: "1",
      type: "farmer",
      name: "Amina Nakato",
      location: "Kampala District, Uganda",
      date: "2024-01-15",
    },
    {
      id: "2",
      type: "agent",
      name: "Joseph Kiprotich",
      location: "Jinja District, Uganda",
      date: "2024-01-14",
    },
    {
      id: "3",
      type: "cooperative",
      name: "Mbarara Coffee Cooperative",
      location: "Mbarara District, Uganda",
      date: "2024-01-13",
    },
    {
      id: "4",
      type: "farmer",
      name: "Grace Wanjiku",
      location: "Wakiso District, Uganda",
      date: "2024-01-12",
    },
    {
      id: "5",
      type: "agent",
      name: "Hassan Mukasa",
      location: "Mukono District, Uganda",
      date: "2024-01-11",
    },
    {
      id: "6",
      type: "farmer",
      name: "Fatuma Mwalimu",
      location: "Gulu District, Uganda",
      date: "2024-01-10",
    },
    {
      id: "7",
      type: "cooperative",
      name: "Fort Portal Farmers Union",
      location: "Kabarole District, Uganda",
      date: "2024-01-09",
    },
    {
      id: "8",
      type: "farmer",
      name: "Samuel Ochieng",
      location: "Mbale District, Uganda",
      date: "2024-01-08",
    },
    {
      id: "9",
      type: "agent",
      name: "Mary Uwimana",
      location: "Lira District, Uganda",
      date: "2024-01-07",
    },
    {
      id: "10",
      type: "farmer",
      name: "Peter Ssemakula",
      location: "Soroti District, Uganda",
      date: "2024-01-06",
    },
  ]

  // Filter data based on search
  const filteredBids = allBids.filter(
    (bid) =>
      bid.buyerName.toLowerCase().includes(bidSearch.toLowerCase()) ||
      bid.farmerName.toLowerCase().includes(bidSearch.toLowerCase()) ||
      bid.produce.toLowerCase().includes(bidSearch.toLowerCase()),
  )

  const filteredRegistrations = allRegistrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(registrationSearch.toLowerCase()) ||
      reg.location.toLowerCase().includes(registrationSearch.toLowerCase()) ||
      reg.type.toLowerCase().includes(registrationSearch.toLowerCase()),
  )

  // Pagination
  const paginatedBids = filteredBids.slice((bidPage - 1) * itemsPerPage, bidPage * itemsPerPage)
  const paginatedRegistrations = filteredRegistrations.slice(
    (registrationPage - 1) * itemsPerPage,
    registrationPage * itemsPerPage,
  )

  const totalBidPages = Math.ceil(filteredBids.length / itemsPerPage)
  const totalRegistrationPages = Math.ceil(filteredRegistrations.length / itemsPerPage)

  // Reports data based on selected period
  const getReportsData = () => {
    const baseData = {
      users: 11036, // farmers + agents
      farmers: 10947,
      agents: 89,
      cooperatives: 45,
      bids: 312,
    }

    switch (reportPeriod) {
      case "yesterday":
        return {
          users: 15,
          farmers: 12,
          agents: 3,
          cooperatives: 1,
          bids: 8,
        }
      case "7days":
        return {
          users: 87,
          farmers: 68,
          agents: 19,
          cooperatives: 5,
          bids: 42,
        }
      case "1month":
        return {
          users: 234,
          farmers: 189,
          agents: 45,
          cooperatives: 12,
          bids: 98,
        }
      case "2months":
        return {
          users: 456,
          farmers: 367,
          agents: 89,
          cooperatives: 23,
          bids: 187,
        }
      default:
        return baseData
    }
  }

  const reportsData = getReportsData()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">ACCEPTED</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">PENDING</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">REJECTED</Badge>
      default:
        return <Badge variant="secondary">{status.toUpperCase()}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "farmer":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">FARMER</Badge>
      case "agent":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">AGENT</Badge>
      case "cooperative":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">COOPERATIVE</Badge>
      default:
        return <Badge variant="secondary">{type.toUpperCase()}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Dashboard Overview</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,323</div>
            <p className="text-xs text-muted-foreground">Farmers + Agents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,234</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">89</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">156</div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle>Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="1month">Last month</SelectItem>
                <SelectItem value="2months">Last 2 months</SelectItem>
                <SelectItem value="custom">Custom period</SelectItem>
              </SelectContent>
            </Select>
            {reportPeriod === "custom" && <DatePickerWithRange className="w-full sm:w-auto" />}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{reportsData.users}</div>
              <div className="text-sm text-gray-600">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{reportsData.farmers}</div>
              <div className="text-sm text-gray-600">Farmers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{reportsData.agents}</div>
              <div className="text-sm text-gray-600">Agents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{reportsData.cooperatives}</div>
              <div className="text-sm text-gray-600">Cooperatives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{reportsData.bids}</div>
              <div className="text-sm text-gray-600">Bids</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Latest Bids Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Latest Bids</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bids..."
                value={bidSearch}
                onChange={(e) => setBidSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer Name</TableHead>
                  <TableHead>Farmer Name</TableHead>
                  <TableHead>Produce</TableHead>
                  <TableHead>Quantity (kg)</TableHead>
                  <TableHead>Bid Price</TableHead>
                  <TableHead>Farmer Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBids.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell className="font-medium">{bid.buyerName}</TableCell>
                    <TableCell>{bid.farmerName}</TableCell>
                    <TableCell>{bid.produce}</TableCell>
                    <TableCell>{bid.quantity.toLocaleString()} kg</TableCell>
                    <TableCell>${bid.bidPrice.toFixed(2)}</TableCell>
                    <TableCell>${bid.farmerPrice.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(bid.status)}</TableCell>
                    <TableCell>{bid.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination for Bids */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {(bidPage - 1) * itemsPerPage + 1} to {Math.min(bidPage * itemsPerPage, filteredBids.length)} of{" "}
              {filteredBids.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBidPage(Math.max(1, bidPage - 1))}
                disabled={bidPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {bidPage} of {totalBidPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBidPage(Math.min(totalBidPages, bidPage + 1))}
                disabled={bidPage === totalBidPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Registrations Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Recent Registrations</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search registrations..."
                value={registrationSearch}
                onChange={(e) => setRegistrationSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Registration Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRegistrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell>{getTypeBadge(registration.type)}</TableCell>
                  <TableCell className="font-medium">{registration.name}</TableCell>
                  <TableCell>{registration.location}</TableCell>
                  <TableCell>{registration.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination for Registrations */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Showing {(registrationPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(registrationPage * itemsPerPage, filteredRegistrations.length)} of{" "}
              {filteredRegistrations.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRegistrationPage(Math.max(1, registrationPage - 1))}
                disabled={registrationPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-sm">
                Page {registrationPage} of {totalRegistrationPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRegistrationPage(Math.min(totalRegistrationPages, registrationPage + 1))}
                disabled={registrationPage === totalRegistrationPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
