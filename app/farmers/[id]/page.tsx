"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ImageModal } from "@/components/ui/image-modal"

interface Produce {
  id: string
  name: string
  image: string
  quantity: number
  lastUpdated: string
  pricePerKg: number
  availability: "available_now" | "available_2_weeks" | "available_3_weeks"
  description: string
}

interface Bid {
  id: string
  buyerName: string
  produce: string
  quantity: number
  bidPrice: number
  farmerPrice: number
  status: "accepted" | "pending" | "rejected"
  date: string
}

const FarmerDetailsPage = ({ params }: { params: { id: string } }) => {
  // Static / demo data – now 100 % Uganda-only
  const farmerData = {
    name: "Amina Nakato",
    contact: "+256 701 234 567",
    email: "amina.nakato@email.com",
    agent: "Joseph Kiprotich",
    cooperative: "Green Valley Cooperative",
    location: "Kampala District, Uganda",
    registrationDate: "2024-01-10",
    status: "Active",
    farmSize: "12.5 acres",
    distanceFromRoad: "2.3 km",
    totalProduce: 4,
    totalBids: 8,
  }

  const produce: Produce[] = [
    {
      id: "1",
      name: "Maize",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=200&fit=crop",
      quantity: 8000,
      lastUpdated: "2024-01-15",
      pricePerKg: 2.3,
      availability: "available_now",
      description: "High-quality yellow maize grown organically on Ugandan soils.",
    },
    {
      id: "2",
      name: "Beans",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=200&h=200&fit=crop",
      quantity: 2500,
      lastUpdated: "2024-01-14",
      pricePerKg: 3.2,
      availability: "available_2_weeks",
      description: "Protein-rich red kidney beans from Kampala area.",
    },
    {
      id: "3",
      name: "Coffee",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop",
      quantity: 1200,
      lastUpdated: "2024-01-13",
      pricePerKg: 5.5,
      availability: "available_3_weeks",
      description: "Premium Arabica beans, shade-grown at high altitude in Western Uganda.",
    },
    {
      id: "4",
      name: "Sweet Potato",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&h=200&fit=crop",
      quantity: 3200,
      lastUpdated: "2024-01-12",
      pricePerKg: 1.8,
      availability: "available_now",
      description: "Orange-fleshed sweet potatoes rich in vitamin A from Central Uganda.",
    },
  ]

  const bids: Bid[] = [
    {
      id: "1",
      buyerName: "Kampala Grain Traders",
      produce: "Maize",
      quantity: 5000,
      bidPrice: 2.5,
      farmerPrice: 2.3,
      status: "accepted",
      date: "2024-01-15",
    },
    {
      id: "2",
      buyerName: "Wakiso Foods Ltd",
      produce: "Beans",
      quantity: 2000,
      bidPrice: 3.2,
      farmerPrice: 3.2,
      status: "accepted",
      date: "2024-01-14",
    },
    {
      id: "3",
      buyerName: "Uganda Coffee Export",
      produce: "Coffee",
      quantity: 800,
      bidPrice: 4.8,
      farmerPrice: 5.5,
      status: "rejected",
      date: "2024-01-13",
    },
    {
      id: "4",
      buyerName: "Nutrition Plus Ltd",
      produce: "Sweet Potato",
      quantity: 2500,
      bidPrice: 1.85,
      farmerPrice: 1.8,
      status: "accepted",
      date: "2024-01-12",
    },
  ]

  const getStatusBadge = (status: Bid["status"]) => {
    switch (status) {
      case "accepted":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">ACCEPTED</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">PENDING</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">REJECTED</Badge>
      default:
        return <Badge>{status.toUpperCase()}</Badge>
    }
  }

  const getAvailabilityBadge = (availability: Produce["availability"]) => {
    switch (availability) {
      case "available_now":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available Now</Badge>
      case "available_2_weeks":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Available in 2 weeks</Badge>
      case "available_3_weeks":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Available in 3 weeks</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Back-link + title */}
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/farmers">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Farmers
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-green-800">Farmer Details</h1>
      </div>

      {/* Farmer profile */}
      <Card>
        <CardHeader>
          <CardTitle>Farmer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* simple key/value grid */}
            {[
              ["Name", farmerData.name],
              ["Contact", farmerData.contact],
              ["Email", farmerData.email],
              ["Agent", farmerData.agent],
              ["Cooperative", farmerData.cooperative],
              ["Location", farmerData.location],
              ["Registration Date", farmerData.registrationDate],
              ["Farm Size", farmerData.farmSize],
              ["Distance from Main Road", farmerData.distanceFromRoad],
            ].map(([label, value]) => (
              <div key={label as string}>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="text-base">{value}</p>
              </div>
            ))}
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{farmerData.status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Produce / Bids tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="produce">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="produce">Produce ({produce.length})</TabsTrigger>
                <TabsTrigger value="bids">Bids ({bids.length})</TabsTrigger>
              </TabsList>
            </div>

            {/* Produce table */}
            <TabsContent value="produce" className="px-6 pb-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity (kg)</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Price / kg</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead>Description</TableHead>
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
                        <TableCell>${item.pricePerKg.toFixed(2)}</TableCell>
                        <TableCell>{getAvailabilityBadge(item.availability)}</TableCell>
                        <TableCell className="max-w-xs">
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Bids table */}
            <TabsContent value="bids" className="px-6 pb-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Buyer Name</TableHead>
                      <TableHead>Produce</TableHead>
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
                        <TableCell>{bid.produce}</TableCell>
                        <TableCell>{bid.quantity.toLocaleString()} kg</TableCell>
                        <TableCell
                          className={bid.bidPrice >= bid.farmerPrice ? "text-green-600 font-medium" : "text-red-600"}
                        >
                          ${bid.bidPrice.toFixed(2)}
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default FarmerDetailsPage
