"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Users, UserCheck, Package } from "lucide-react"
import Link from "next/link"

interface Agent {
  id: string
  name: string
  contact: string
  location: string
  farmerCount: number
}

interface Farmer {
  id: string
  name: string
  contact: string
  agent: string
  location: string
}

interface Produce {
  id: string
  name: string
  totalQuantity: number
  farmerCount: number
}

const CooperativeDetailsPage = ({ params }: { params: { id: string } }) => {
  const cooperativeData = {
    name: "Green Valley Cooperative",
    contact: "+256 700 111 222",
    email: "info@greenvalley.coop",
    location: "Kampala District, Uganda",
    registrationDate: "2023-08-15",
    status: "Active",
    description:
      "A leading agricultural cooperative focused on sustainable farming practices and fair trade in Central Uganda.",
    agentCount: 12,
    farmerCount: 145,
    produceCount: 8,
  }

  const agents: Agent[] = [
    {
      id: "1",
      name: "John Smith",
      contact: "+256 700 123 456",
      location: "Kampala District, Uganda",
      farmerCount: 25,
    },
    {
      id: "2",
      name: "Mary Johnson",
      contact: "+256 701 234 567",
      location: "Wakiso District, Uganda",
      farmerCount: 18,
    },
    {
      id: "3",
      name: "Peter Wilson",
      contact: "+256 702 345 678",
      location: "Mukono District, Uganda",
      farmerCount: 22,
    },
  ]

  const farmers: Farmer[] = [
    {
      id: "1",
      name: "Alice Johnson",
      contact: "+256 701 234 567",
      agent: "John Smith",
      location: "Kampala District, Uganda",
    },
    {
      id: "2",
      name: "Bob Wilson",
      contact: "+256 702 345 678",
      agent: "Mary Johnson",
      location: "Wakiso District, Uganda",
    },
    {
      id: "3",
      name: "Carol Davis",
      contact: "+256 703 456 789",
      agent: "Peter Wilson",
      location: "Mukono District, Uganda",
    },
  ]

  const produce: Produce[] = [
    { id: "1", name: "Maize", totalQuantity: 25000, farmerCount: 45 },
    { id: "2", name: "Coffee", totalQuantity: 8000, farmerCount: 28 },
    { id: "3", name: "Beans", totalQuantity: 12000, farmerCount: 34 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/cooperatives">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cooperatives
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-green-800">Cooperative Details</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-base">{cooperativeData.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Contact</p>
              <p className="text-base">{cooperativeData.contact}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base">{cooperativeData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-base">{cooperativeData.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Registration Date</p>
              <p className="text-base">{cooperativeData.registrationDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{cooperativeData.status}</Badge>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-500">Description</p>
              <p className="text-base">{cooperativeData.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agents</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{cooperativeData.agentCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farmers</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{cooperativeData.farmerCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produce Types</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{cooperativeData.produceCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue="agents">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="agents">Agents ({agents.length})</TabsTrigger>
                <TabsTrigger value="farmers">Farmers ({farmers.length})</TabsTrigger>
                <TabsTrigger value="produce">Produce ({produce.length})</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="agents" className="px-6 pb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Farmers</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.contact}</TableCell>
                      <TableCell>{agent.location}</TableCell>
                      <TableCell>{agent.farmerCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="farmers" className="px-6 pb-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell className="font-medium">{farmer.name}</TableCell>
                        <TableCell>{farmer.contact}</TableCell>
                        <TableCell>{farmer.agent}</TableCell>
                        <TableCell>{farmer.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="produce" className="px-6 pb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produce</TableHead>
                    <TableHead>Total Quantity (kg)</TableHead>
                    <TableHead>Farmer Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {produce.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.totalQuantity.toLocaleString()}</TableCell>
                      <TableCell>{item.farmerCount}</TableCell>
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

export default CooperativeDetailsPage
