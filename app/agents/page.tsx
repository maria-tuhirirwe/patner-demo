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

interface Agent {
  id: string
  name: string
  contact: string
  cooperative: string
  location: string
  registrationDate: string
  status: "active" | "suspended" | "deleted"
}

const AgentsPage = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [actionType, setActionType] = useState<"suspend" | "delete" | null>(null)
  const [reason, setReason] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const allAgents: Agent[] = [
    {
      id: "1",
      name: "Amina Nakato",
      contact: "+256 700 123 456",
      cooperative: "Green Valley Cooperative",
      location: "Kampala District, Uganda",
      registrationDate: "2023-12-01",
      status: "active",
    },
    {
      id: "2",
      name: "Joseph Kiprotich",
      contact: "+256 722 987 654",
      cooperative: "Sunrise Farmers Union",
      location: "Jinja District, Uganda",
      registrationDate: "2023-11-15",
      status: "active",
    },
    {
      id: "3",
      name: "Grace Wanjiku",
      contact: "+256 733 321 098",
      cooperative: "Mountain View Coop",
      location: "Mbarara District, Uganda",
      registrationDate: "2023-10-20",
      status: "suspended",
    },
    {
      id: "4",
      name: "Hassan Mukasa",
      contact: "+256 701 555 777",
      cooperative: "Valley Fresh Cooperative",
      location: "Wakiso District, Uganda",
      registrationDate: "2023-09-10",
      status: "deleted",
    },
    {
      id: "5",
      name: "Fatuma Mwalimu",
      contact: "+256 754 444 333",
      cooperative: "Kabarole Coffee Coop",
      location: "Kabarole District, Uganda",
      registrationDate: "2023-08-25",
      status: "active",
    },
    {
      id: "6",
      name: "Samuel Ochieng",
      contact: "+256 722 666 777",
      cooperative: "Mukono Farmers Union",
      location: "Mukono District, Uganda",
      registrationDate: "2023-07-18",
      status: "active",
    },
    {
      id: "7",
      name: "Mary Uwimana",
      contact: "+256 788 999 111",
      cooperative: "Gulu Agricultural Collective",
      location: "Gulu District, Uganda",
      registrationDate: "2023-06-12",
      status: "active",
    },
    {
      id: "8",
      name: "Peter Ssemakula",
      contact: "+256 702 888 999",
      cooperative: "Buganda Farmers Coop",
      location: "Mbale District, Uganda",
      registrationDate: "2023-05-30",
      status: "suspended",
    },
    {
      id: "9",
      name: "Aisha Mwangi",
      contact: "+256 711 222 333",
      cooperative: "Central Uganda Growers",
      location: "Lira District, Uganda",
      registrationDate: "2023-04-22",
      status: "active",
    },
    {
      id: "10",
      name: "John Mwesigwa",
      contact: "+256 703 444 555",
      cooperative: "Western Uganda Coop",
      location: "Kasese District, Uganda",
      registrationDate: "2023-03-15",
      status: "active",
    },
  ]

  const getFilteredAgents = () => {
    return allAgents.filter((agent) => {
      const matchesTab =
        activeTab === "active"
          ? agent.status === "active"
          : activeTab === "suspended"
            ? agent.status === "suspended"
            : activeTab === "deleted"
              ? agent.status === "deleted"
              : true

      const matchesSearch =
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.cooperative.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.location.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesTab && matchesSearch
    })
  }

  const filteredAgents = getFilteredAgents()
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage)
  const paginatedAgents = filteredAgents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleAction = (agent: Agent, action: "suspend" | "delete") => {
    setSelectedAgent(agent)
    setActionType(action)
    setIsModalOpen(true)
  }

  const handleConfirmAction = () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason")
      return
    }

    toast.success(`Agent ${actionType}ed successfully`)
    setIsModalOpen(false)
    setReason("")
    setSelectedAgent(null)
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
      <h1 className="text-3xl font-bold text-green-800">Farmer Agents</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Agents Management</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
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
              <TabsTrigger value="active">Active Agents</TabsTrigger>
              <TabsTrigger value="suspended">Suspended Agents</TabsTrigger>
              <TabsTrigger value="deleted">Deleted Agents</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Cooperative/Organization</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedAgents.map((agent) => (
                      <TableRow key={agent.id}>
                        <TableCell>
                          <Link
                            href={`/agents/${agent.id}`}
                            className="font-medium text-green-600 hover:text-green-800"
                          >
                            {agent.name}
                          </Link>
                        </TableCell>
                        <TableCell>{agent.contact}</TableCell>
                        <TableCell>{agent.cooperative}</TableCell>
                        <TableCell>{agent.location}</TableCell>
                        <TableCell>{agent.registrationDate}</TableCell>
                        <TableCell>{getStatusBadge(agent.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/agents/${agent.id}`} className="flex items-center">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              {agent.status === "active" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleAction(agent, "suspend")}>
                                    <Ban className="h-4 w-4 mr-2" />
                                    Suspend
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleAction(agent, "delete")}
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
                  {Math.min(currentPage * itemsPerPage, filteredAgents.length)} of {filteredAgents.length} results
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
              {actionType === "suspend" ? "Suspend Agent" : "Delete Agent"}
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {actionType} <strong>{selectedAgent?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason *</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder={`Please provide a reason for ${actionType}ing this agent...`}
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

export default AgentsPage
