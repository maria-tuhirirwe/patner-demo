"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Package, Users, Globe } from "lucide-react"
import Link from "next/link"
import { ImageModal } from "@/components/ui/image-modal"

interface Farmer {
  id: string
  name: string
  location: string
  quantity: number
  lastUpdated: string
  pricePerKg: number
}

interface Bid {
  id: string
  buyerName: string
  farmerName: string
  quantity: number
  bidPrice: number
  farmerPrice: number
  status: string
  date: string
}

interface Location {
  id: string
  country: string
  district: string
  quantity: number
  farmerCount: number
}

const ProduceDetailsPage = ({ params }: { params: { id: string } }) => {
  const produceData = {
    name: "Maize",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop",
    category: "Grains",
    description:
      "High-quality yellow maize suitable for both human consumption and animal feed. Grown using sustainable farming practices across East Africa.",
    totalQuantity: 45000,
    farmerCount: 125,
    averagePrice: 2.35,
    lastUpdated: "2024-01-15",
  }

  const farmers: Farmer[] = [
    {
      id: "1",
      name: "Amina Nakato",
      location: "Kampala District, Uganda",
      quantity: 8000,
      lastUpdated: "2024-01-15",
      pricePerKg: 2.3,
    },
    {
      id: "2",
      name: "Grace Wanjiku",
      location: "Wakiso District, Uganda",
      quantity: 6500,
      lastUpdated: "2024-01-14",
      pricePerKg: 2.25,
    },
    {
      id: "3",
      name: "Fatuma Mwalimu",
      location: "Mbarara District, Uganda",
      quantity: 7200,
      lastUpdated: "2024-01-13",
      pricePerKg: 2.4,
    },
    {
      id: "4",
      name: "Mary Uwimana",
      location: "Gulu District, Uganda",
      quantity: 5800,
      lastUpdated: "2024-01-12",
      pricePerKg: 2.3,
    },
    {
      id: "5",
      name: "John Mwesigwa",
      location: "Kabarole District, Uganda",
      quantity: 4200,
      lastUpdated: "2024-01-11",
      pricePerKg: 2.4,
    },
    {
      id: "6",
      name: "Ibrahim Ssali",
      location: "Jinja District, Uganda",
      quantity: 3900,
      lastUpdated: "2024-01-10",
      pricePerKg: 2.35,
    },
    {
      id: "7",
      name: "Zainab Mwangi",
      location: "Mukono District, Uganda",
      quantity: 5200,
      lastUpdated: "2024-01-09",
      pricePerKg: 2.28,
    },
    {
      id: "8",
      name: "Emmanuel Nkurunziza",
      location: "Mbale District, Uganda",
      quantity: 4400,
      lastUpdated: "2024-01-08",
      pricePerKg: 2.45,
    },
  ]

  const bids: Bid[] = [
    {
      id: "1",
      buyerName: "Kampala Grain Traders",
      farmerName: "Amina Nakato",
      quantity: 5000,
      bidPrice: 2.5,
      farmerPrice: 2.3,
      status: "accepted",
      date: "2024-01-15",
    },
    {
      id: "2",
      buyerName: "East Africa Foods Ltd",
      farmerName: "Grace Wanjiku",
      quantity: 4000,
      bidPrice: 2.45,
      farmerPrice: 2.25,
      status: "accepted",
      date: "2024-01-14",
    },
    {
      id: "3",
      buyerName: "Nairobi Commodities",
      farmerName: "Fatuma Mwalimu",
      quantity: 6000,
      bidPrice: 2.1,
      farmerPrice: 2.4,
      status: "rejected",
      date: "2024-01-13",
    },
    {
      id: "4",
      buyerName: "Rwanda Grain Export",
      farmerName: "Mary Uwimana",
      quantity: 3500,
      bidPrice: 2.35,
      farmerPrice: 2.3,
      status: "accepted",
      date: "2024-01-12",
    },
    {
      id: "5",
      buyerName: "Uganda Mills Ltd",
      farmerName: "John Mwesigwa",
      quantity: 2800,
      bidPrice: 2.25,
      farmerPrice: 2.4,
      status: "pending",
      date: "2024-01-11",
    },
    {
      id: "6",
      buyerName: "Jinja Processing Co",
      farmerName: "Ibrahim Ssali",
      quantity: 3200,
      bidPrice: 2.4,
      farmerPrice: 2.35,
      status: "accepted",
      date: "2024-01-10",
    },
  ]

  const locations: Location[] = [
    {
      id: "1",
      country: "Uganda",
      district: "Kampala District",
      quantity: 15000,
      farmerCount: 45,
    },
    {
      id: "2",
      country: "Uganda",
      district: "Wakiso District",
      quantity: 18000,
      farmerCount: 52,
    },
    {
      id: "3",
      country: "Uganda",
      district: "Mbarara District",
      quantity: 12000,
      farmerCount: 28,
    },
    {
      id: "4",
      country: "Uganda",
      district: "Gulu District",
      quantity: 8500,
      farmerCount: 22,
    },
    {
      id: "5",
      country: "Uganda",
      district: "Jinja District",
      quantity: 6200,
      farmerCount: 18,
    },
    {
      id: "6",
      country: "Uganda",
      district: "Mukono District",
      quantity: 7800,
      farmerCount: 25,
    },
    {
      id: "7",
      country: "Uganda",
      district: "Mbale District",
      quantity: 5400,
      farmerCount: 16,
    },
    {
      id: "8",
      country: "Uganda",
      district: "Kabarole District",
      quantity: 4900,
      farmerCount: 14,
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
          <Link href="/produce">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Produce
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-green-800">Produce Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <ImageModal
              src={produceData.image || "/placeholder.svg"}
              alt={produceData.name}
              width={400}
              height={400}
              className="w-full rounded-lg object-cover"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Produce Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-base">{produceData.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Category</p>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{produceData.category}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Quantity</p>
                <p className="text-base">{produceData.totalQuantity.toLocaleString()} kg</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Number of Farmers</p>
                <p className="text-base">{produceData.farmerCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Average Price</p>
                <p className="text-base">${produceData.averagePrice}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <p className="text-base">{produceData.lastUpdated}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-base">{produceData.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{produceData.totalQuantity.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">kg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{produceData.farmerCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Districts</CardTitle>
            <Globe className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="farmers">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="farmers">Farmers ({farmers.length})</TabsTrigger>
                <TabsTrigger value="bids">Bids ({bids.length})</TabsTrigger>
                <TabsTrigger value="locations">Locations ({locations.length})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="farmers" className="px-6 pb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farmer Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Price per kg</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell className="font-medium">{farmer.name}</TableCell>
                      <TableCell>{farmer.location}</TableCell>
                      <TableCell>{farmer.quantity.toLocaleString()} kg</TableCell>
                      <TableCell className="font-medium text-green-600">${farmer.pricePerKg.toFixed(2)}</TableCell>
                      <TableCell>{farmer.lastUpdated}</TableCell>
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
                      <TableHead>Quantity (kg)</TableHead>
                      <TableHead>Bid Price</TableHead>
                      <TableHead>Farmer Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bids.map((bid) => (
                      <TableRow key={bid.id}>
                        <TableCell className="font-medium">{bid.buyerName}</TableCell>
                        <TableCell>{bid.farmerName}</TableCell>
                        <TableCell>{bid.quantity.toLocaleString()} kg</TableCell>
                        <TableCell>
                          <span
                            className={bid.bidPrice >= bid.farmerPrice ? "text-green-600 font-medium" : "text-red-600"}
                          >
                            ${bid.bidPrice.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>${bid.farmerPrice.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(bid.status)}</TableCell>
                        <TableCell>{bid.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="locations" className="px-6 pb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>District/Province</TableHead>
                    <TableHead>Quantity (kg)</TableHead>
                    <TableHead>Farmer Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {locations.map((location) => (
                    <TableRow key={location.id}>
                      <TableCell className="font-medium">{location.country}</TableCell>
                      <TableCell>{location.district}</TableCell>
                      <TableCell>{location.quantity.toLocaleString()} kg</TableCell>
                      <TableCell>{location.farmerCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProduceDetailsPage
