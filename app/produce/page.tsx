"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Package, Users, Search } from "lucide-react"
import Link from "next/link"
import { ImageModal } from "@/components/ui/image-modal"

interface ProduceItem {
  id: string
  name: string
  image: string
  totalQuantity: number
  farmerCount: number
  category: string
}

const ProducePage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const produceItems: ProduceItem[] = [
    {
      id: "1",
      name: "Maize",
      image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop",
      totalQuantity: 45000,
      farmerCount: 125,
      category: "Grains",
    },
    {
      id: "2",
      name: "Rice",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      totalQuantity: 32000,
      farmerCount: 89,
      category: "Grains",
    },
    {
      id: "3",
      name: "Coffee",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=400&fit=crop",
      totalQuantity: 15000,
      farmerCount: 67,
      category: "Cash Crops",
    },
    {
      id: "4",
      name: "Beans",
      image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400&h=400&fit=crop",
      totalQuantity: 28000,
      farmerCount: 156,
      category: "Legumes",
    },
    {
      id: "5",
      name: "Wheat",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
      totalQuantity: 38000,
      farmerCount: 98,
      category: "Grains",
    },
    {
      id: "6",
      name: "Cassava",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop",
      totalQuantity: 52000,
      farmerCount: 203,
      category: "Root Crops",
    },
    {
      id: "7",
      name: "Sweet Potato",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop",
      totalQuantity: 22000,
      farmerCount: 87,
      category: "Root Crops",
    },
    {
      id: "8",
      name: "Bananas",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
      totalQuantity: 18000,
      farmerCount: 134,
      category: "Fruits",
    },
  ]

  const getFilteredAndSortedItems = () => {
    const filtered = produceItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })

    // Sort the filtered items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "quantity":
          return b.totalQuantity - a.totalQuantity
        case "farmers":
          return b.farmerCount - a.farmerCount
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return 0
      }
    })

    return filtered
  }

  const filteredItems = getFilteredAndSortedItems()
  const categories = ["all", ...Array.from(new Set(produceItems.map((item) => item.category)))]

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Grains":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Grains</Badge>
      case "Cash Crops":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Cash Crops</Badge>
      case "Legumes":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Legumes</Badge>
      case "Root Crops":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Root Crops</Badge>
      case "Fruits":
        return <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-100">Fruits</Badge>
      default:
        return <Badge variant="secondary">{category}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-800">Produce Management</h1>

      {/* Search and Filter Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search produce..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="quantity">Sort by Quantity</SelectItem>
                <SelectItem value="farmers">Sort by Farmers</SelectItem>
                <SelectItem value="category">Sort by Category</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        Showing {filteredItems.length} of {produceItems.length} produce items
      </div>

      {/* Produce Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Link key={item.id} href={`/produce/${item.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-t-lg">
                <ImageModal
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  {getCategoryBadge(item.category)}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center text-sm">
                      <Package className="h-4 w-4 mr-1" />
                      Total Quantity
                    </span>
                    <span className="font-medium text-sm">{item.totalQuantity.toLocaleString()} kg</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      Farmers
                    </span>
                    <span className="font-medium text-sm">{item.farmerCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No produce items found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter options.</p>
        </div>
      )}
    </div>
  )
}

export default ProducePage
