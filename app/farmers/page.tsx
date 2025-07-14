"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Eye, Ban, Trash2, AlertTriangle, MoreHorizontal, Search, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { toast } from "@/lib/toast"

interface Farmer {
  id: string
  name: string
  contact: string
  agent: string
  cooperative: string
  location: string
  registrationDate: string
  status: "active" | "suspended" | "deleted"
}

const FarmersPage = () => {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null)
  const [actionType, setActionType] = useState<"suspend" | "delete" | null>(null)
  const [reason, setReason] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const allFarmers: Farmer[] = [
    {
      id: "1",
      name: "Amina Nakato",
      contact: "+256 701 234 567",
      agent: "Joseph Kiprotich",
      cooperative: "Green Valley Cooperative",
      location: "Kampala District, Uganda",
      registrationDate: "2024-01-10",
      status: "active",
    },
    {
      id: "2",
      name: "Grace Wanjiku",
      contact: "+256 722 345 678",
      agent: "Hassan Mukasa",
      cooperative: "Sunrise Farmers Union",
      location: "Wakiso District, Uganda",
      registrationDate: "2024-01-08",
      status: "active",
    },
    {
      id: "3",
      name: "Fatuma Mwalimu",
      contact: "+256 754 456 789",
      agent: "Samuel Ochieng",
      cooperative: "Mountain View Coop",
      location: "Mbarara District, Uganda",
      registrationDate: "2024-01-05",
      status: "suspended",
    },
    {
      id: "4",
      name: "Mary Uwimana",
      contact: "+256 788 567 890",
      agent: "Peter Ssemakula",
      cooperative: "Gulu Agricultural Collective",
      location: "Gulu District, Uganda",
      registrationDate: "2024-01-03",
      status: "active",
    },
    {
      id: "5",
      name: "John Mwesigwa",
      contact: "+256 703 678 901",
      agent: "Aisha Mwangi",
      cooperative: "Western Uganda Coop",
      location: "Kabarole District, Uganda",
      registrationDate: "2023-12-28",
      status: "active",
    },
    {
      id: "6",
      name: "Esther Nyong'o",
      contact: "+256 711 789 012",
      agent: "David Kamau",
      cooperative: "Central Uganda Growers",
      location: "Jinja District, Uganda",
      registrationDate: "2023-12-25",
      status: "deleted",
    },
    {
      id: "7",
      name: "Ibrahim Ssali",
      contact: "+256 704 890 123",
      agent: "Rose Akello",
      cooperative: "Buganda Farmers Coop",
      location: "Mukono District, Uganda",
      registrationDate: "2023-12-20",
      status: "active",
    },
    {
      id: "8",
      name: "Zainab Mwangi",
      contact: "+256 733 901 234",
      agent: "Michael Otieno",
      cooperative: "Mbale Farmers Union",
      location: "Mbale District, Uganda",
      registrationDate: "2023-12-18",
      status: "suspended",
    },
    {
      id: "9",
      name: "Emmanuel Nkurunziza",
      contact: "+256 779 012 345",
      agent: "Agnes Uwimana",
      cooperative: "Lira Agricultural Alliance",
      location: "Lira District, Uganda",
      registrationDate: "2023-12-15",
      status: "active",
    },
    {
      id: "10",
      name: "Halima Juma",
      contact: "+256 755 123 456",
      agent: "Francis Mwangi",
      cooperative: "Soroti Coffee Coop",
      location: "Soroti District, Uganda",
      registrationDate: "2023-12-12",
      status: "active",
    },
    {
      id: "11",
      name: "Robert Kiggundu",
      contact: "+256 705 234 567",
      agent: "Sarah Nakamya",
      cooperative: "Central Uganda Alliance",
      location: "Kasese District, Uganda",
      registrationDate: "2023-12-10",
      status: "active",
    },
    {
      id: "12",
      name: "Beatrice Wambui",
      contact: "+256 712 345 678",
      agent: "James Mutua",
      cooperative: "Arua Farmers Cooperative",
      location: "Arua District, Uganda",
      registrationDate: "2023-12-08",
      status: "active",
    },
  ]

  const getFilteredFarmers = () => {
    return allFarmers.filter((farmer) => {
      const matchesTab =
        activeTab === "active"
          ? farmer.status === "active"
          : activeTab === "suspended"
            ? farmer.status === "suspended"
            : activeTab === "deleted"
              ? farmer.status === "deleted"
              : true

      const matchesSearch =
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.cooperative.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farmer.location.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesTab && matchesSearch
    })
  }

  const filteredFarmers = getFilteredFarmers()
  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage)
  const paginatedFarmers = filteredFarmers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAction = (farmer: Farmer, action: "suspend" | "delete") => {
    setSelectedFarmer(farmer)
    setActionType(action)
    setIsModalOpen(true)
  }

  const handleConfirmAction = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason")
      return
    }

    toast.success(`Farmer ${actionType}ed successfully`)
    setIsModalOpen(false)
    setReason("")
    setSelectedFarmer(null)
    setActionType(null)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">ACTIVE</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">SUSPENDED</Badge>
      case "deleted":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">DELETED</Badge>
      default:
        return <Badge variant="secondary">{status.toUpperCase()}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Farmers</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Farmers Management</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Farmers</TabsTrigger>
              <TabsTrigger value="suspended">Suspended Farmers</TabsTrigger>
              <TabsTrigger value="deleted">Deleted Farmers</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Cooperative</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedFarmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell>
                          <Link
                            href={`/farmers/${farmer.id}`}
                            className="font-medium text-green-600 hover:text-green-800"
                          >
                            {farmer.name}
                          </Link>
                        </TableCell>
                        <TableCell>{farmer.contact}</TableCell>
                        <TableCell>{farmer.agent}</TableCell>
                        <TableCell>{farmer.cooperative}</TableCell>
                        <TableCell>{farmer.location}</TableCell>
                        <TableCell>{farmer.registrationDate}</TableCell>
                        <TableCell>{getStatusBadge(farmer.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/farmers/${farmer.id}`} className="flex items-center">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              {farmer.status === "active" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleAction(farmer, "suspend")}>
                                    <Ban className="h-4 w-4 mr-2" />
                                    Suspend
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleAction(farmer, "delete")}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, filteredFarmers.length)} of {filteredFarmers.length} results
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              {actionType === "suspend" ? "Suspend Farmer" : "Delete Farmer"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionType} <strong>{selectedFarmer?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason *</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={`Please provide a reason for ${actionType}ing this farmer...`}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default FarmersPage
