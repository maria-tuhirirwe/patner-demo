"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

interface Cooperative {
  id: string
  name: string
  contact: string
  location: string
  registrationDate: string
  agentCount: number
  farmerCount: number
  produceCount: number
  status: "active" | "suspended" | "deleted"
}

const CooperativesPage = () => {
  const [selectedCooperative, setSelectedCooperative] = useState<Cooperative | null>(null)
  const [actionType, setActionType] = useState<"suspend" | "delete" | null>(null)
  const [reason, setReason] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const allCooperatives: Cooperative[] = [
    {
      id: "1",
      name: "Green Valley Cooperative",
      contact: "+256 700 111 222",
      location: "Kampala District, Uganda",
      registrationDate: "2023-08-15",
      agentCount: 12,
      farmerCount: 145,
      produceCount: 8,
      status: "active",
    },
    {
      id: "2",
      name: "Sunrise Farmers Union",
      contact: "+256 722 333 444",
      location: "Wakiso District, Uganda",
      registrationDate: "2023-07-20",
      agentCount: 8,
      farmerCount: 98,
      produceCount: 6,
      status: "active",
    },
    {
      id: "3",
      name: "Mountain View Coop",
      contact: "+256 754 555 666",
      location: "Mbarara District, Uganda",
      registrationDate: "2023-06-10",
      agentCount: 6,
      farmerCount: 67,
      produceCount: 5,
      status: "suspended",
    },
    {
      id: "4",
      name: "Kabarole Coffee Coop",
      contact: "+256 755 777 888",
      location: "Kabarole District, Uganda",
      registrationDate: "2023-05-25",
      agentCount: 9,
      farmerCount: 123,
      produceCount: 4,
      status: "active",
    },
    {
      id: "5",
      name: "Mukono Farmers Union",
      contact: "+256 733 999 000",
      location: "Mukono District, Uganda",
      registrationDate: "2023-04-18",
      agentCount: 7,
      farmerCount: 89,
      produceCount: 7,
      status: "active",
    },
    {
      id: "6",
      name: "Gulu Agricultural Collective",
      contact: "+256 788 111 222",
      location: "Gulu District, Uganda",
      registrationDate: "2023-03-12",
      agentCount: 5,
      farmerCount: 76,
      produceCount: 3,
      status: "deleted",
    },
    {
      id: "7",
      name: "Buganda Farmers Coop",
      contact: "+256 701 333 444",
      location: "Jinja District, Uganda",
      registrationDate: "2023-02-28",
      agentCount: 11,
      farmerCount: 134,
      produceCount: 9,
      status: "active",
    },
    {
      id: "8",
      name: "Central Uganda Growers",
      contact: "+256 711 555 666",
      location: "Mbale District, Uganda",
      registrationDate: "2023-01-15",
      agentCount: 6,
      farmerCount: 92,
      produceCount: 5,
      status: "suspended",
    },
  ]

  const getFilteredCooperatives = () => {
    return allCooperatives.filter((cooperative) => {
      const matchesSearch =
        cooperative.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cooperative.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cooperative.contact.includes(searchTerm)

      return matchesSearch
    })
  }

  const filteredCooperatives = getFilteredCooperatives()
  const totalPages = Math.ceil(filteredCooperatives.length / itemsPerPage)
  const paginatedCooperatives = filteredCooperatives.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAction = (cooperative: Cooperative, action: "suspend" | "delete") => {
    setSelectedCooperative(cooperative)
    setActionType(action)
    setIsModalOpen(true)
  }

  const handleConfirmAction = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason")
      return
    }

    toast.success(`Cooperative ${actionType}ed successfully`)
    setIsModalOpen(false)
    setReason("")
    setSelectedCooperative(null)
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
      <h1 className="text-3xl font-bold text-green-800">Cooperatives</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Cooperatives Management</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cooperatives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Agents</TableHead>
                  <TableHead>Farmers</TableHead>
                  <TableHead>Produce Types</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCooperatives.map((cooperative) => (
                  <TableRow key={cooperative.id}>
                    <TableCell>
                      <Link
                        href={`/cooperatives/${cooperative.id}`}
                        className="font-medium text-green-600 hover:text-green-800"
                      >
                        {cooperative.name}
                      </Link>
                    </TableCell>
                    <TableCell>{cooperative.contact}</TableCell>
                    <TableCell>{cooperative.location}</TableCell>
                    <TableCell>{cooperative.registrationDate}</TableCell>
                    <TableCell>{cooperative.agentCount}</TableCell>
                    <TableCell>{cooperative.farmerCount}</TableCell>
                    <TableCell>{cooperative.produceCount}</TableCell>
                    <TableCell>{getStatusBadge(cooperative.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/cooperatives/${cooperative.id}`} className="flex items-center">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          {cooperative.status === "active" && (
                            <>
                              <DropdownMenuItem onClick={() => handleAction(cooperative, "suspend")}>
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleAction(cooperative, "delete")}
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
              {Math.min(currentPage * itemsPerPage, filteredCooperatives.length)} of {filteredCooperatives.length}{" "}
              results
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
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              {actionType === "suspend" ? "Suspend Cooperative" : "Delete Cooperative"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionType} <strong>{selectedCooperative?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason *</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={`Please provide a reason for ${actionType}ing this cooperative...`}
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

export default CooperativesPage
