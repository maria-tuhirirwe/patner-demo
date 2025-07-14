"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ImageModal } from "@/components/ui/image-modal"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Farmer {
  id: string
  name: string
  contact: string
  location: string
  registrationDate: string
}

interface Produce {
  id: string
  name: string
  quantity: number
  image: string
  lastUpdated: string
}

interface Bid {
  id: string
  buyerName: string
  farmerName: string
  produce: string
  quantity: number
  bidPrice: number
  status: string
  date: string
}

const AgentDetailsPage = ({ params }: { params: { id: string } }) => {
  const agentData = {
    name: "Joseph Kiprotich",
    contact: "+256 700 123 456",
    email: "joseph.kiprotich@email.com",
    cooperative: "Green Valley Cooperative",
    location: "Jinja District, Uganda",
    registrationDate: "2023-12-01",
    status: "Active",
    totalFarmers: 25,
    totalProduce: 8,
    totalBids: 45,
  }

  const farmers: Farmer[] = [
    {
      id: "1",
      name: "Amina Nakato",
      contact: "+256 701 234 567",
      location: "Kampala District, Uganda",
      registrationDate: "2024-01-10",
    },
    {
      id: "2",
      name: "Grace Wanjiku",
      contact: "+256 702 345 678",
      location: "Wakiso District, Uganda",
      registrationDate: "2024-01-08",
    },
    {
      id: "3",
      name: "Fatuma Mwalimu",
      contact: "+256 703 456 789",
      location: "Mbarara District, Uganda",
      registrationDate: "2024-01-05",
    },
  ]

  const produce: Produce[] = [
    {
      id: "1",
      name: "Maize",
      quantity: 15000,
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      name: "Rice",
      quantity: 8500,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      lastUpdated: "2024-01-14",
    },
    {
      id: "3",
      name: "Coffee",
      quantity: 3200,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
      lastUpdated: "2024-01-13",
    },
    {
      id: "4",
      name: "Beans",
      quantity: 5800,
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop",
      lastUpdated: "2024-01-12",
    },
    {
      id: "5",
      name: "Sweet Potato",
      quantity: 4200,
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop",
      lastUpdated: "2024-01-11",
    },
  ]

  const bids: Bid[] = [
    {
      id: "1",
      buyerName: "Kampala Grain Traders",
      farmerName: "Amina Nakato",
      produce: "Maize",
      quantity: 5000,
      bidPrice: 2.5,
      status: "pending",
      date: "2024-01-15",
    },
    {
      id: "2",
      buyerName: "Jinja Mills Ltd",
      farmerName: "Grace Wanjiku",
      produce: "Rice",
      quantity: 3000,
      bidPrice: 3.2,
      status: "accepted",
      date: "2024-01-14",
    },
    {
      id: "3",
      buyerName: "Uganda Coffee Export",
      farmerName: "Fatuma Mwalimu",
      produce: "Coffee",
      quantity: 1500,
      bidPrice: 4.8,
      status: "accepted",
      date: "2024-01-13",
    },
  ]

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

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/agents">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Agents
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-green-800">Agent Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-base">{agentData.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <p className="text-base">{agentData.contact}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base">{agentData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Cooperative</p>
              <p className="text-base">{agentData.cooperative}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-base">{agentData.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Registration Date</p>
              <p className="text-base">{agentData.registrationDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{agentData.status}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Farmers</p>
              <p className="text-base">{agentData.totalFarmers}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="farmers">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="farmers">Farmers ({farmers.length})</TabsTrigger>
                <TabsTrigger value="produce">Produce ({produce.length})</TabsTrigger>
                <TabsTrigger value="bids">Bids ({bids.length})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="farmers" className="px-6 pb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Registration Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell className="font-medium">{farmer.name}</TableCell>
                      <TableCell>{farmer.contact}</TableCell>
                      <TableCell>{farmer.location}</TableCell>
                      <TableCell>{farmer.registrationDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="produce" className="px-6 pb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produce.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <ImageModal
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="rounded object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity.toLocaleString()} kg</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="bids" className="px-6 pb-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Buyer Name</TableHead>
                      <TableHead>Farmer Name</TableHead>
                      <TableHead>Produce</TableHead>
                      <TableHead>Quantity (kg)</TableHead>
                      <TableHead>Bid Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.buyerName}</TableCell>
                        <TableCell>{bid.farmerName}</TableCell>
                        <TableCell>{bid.produce}</TableCell>
                        <TableCell>{bid.quantity.toLocaleString()} kg</TableCell>
                        <TableCell>${bid.bidPrice.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(bid.status)}</TableCell>
                        <TableCell>{bid.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AgentDetailsPage
