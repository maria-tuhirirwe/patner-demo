"use client"

import { Layout, Menu } from "antd"
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  ShopOutlined,
  BankOutlined,
  BellOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import { usePathname } from "next/navigation"

const { Sider } = Layout

const Sidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link href="/">Dashboard</Link>,
    },
    {
      key: "/agents",
      icon: <TeamOutlined />,
      label: <Link href="/agents">Agents</Link>,
    },
    {
      key: "/farmers",
      icon: <UserOutlined />,
      label: <Link href="/farmers">Farmers</Link>,
    },
    {
      key: "/produce",
      icon: <ShopOutlined />,
      label: <Link href="/produce">Produce</Link>,
    },
    {
      key: "/cooperatives",
      icon: <BankOutlined />,
      label: <Link href="/cooperatives">Cooperatives</Link>,
    },
    {
      key: "/notifications",
      icon: <BellOutlined />,
      label: <Link href="/notifications">Notifications</Link>,
    },
  ]

  return (
    <Sider width={250} className="bg-white shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-green-700">Partner Admin</h2>
      </div>
      <Menu mode="inline" selectedKeys={[pathname]} items={menuItems} className="border-r-0" theme="light" />
    </Sider>
  )
}

export default Sidebar
