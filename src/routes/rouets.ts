import { FilePlus, Building2, User } from "lucide-react";

export const ROUTES = {
  register: "/register",
  property: "/property",
  tenants: "tenants",
} as const

export const NAVE_ITEMS = [
  { path: ROUTES.register, label: "新規登録", icon: FilePlus },
  { path: ROUTES.property, label: "物件一覧", icon: Building2 },
  { path: ROUTES.tenants, label: "入居者", icon: User },
] as const

export const REGISTER_NAV = {
  building: "building",
  room: "room",
  owner: "owner",
} as const

export const PROPERTY_NAV = {
  room: "room",
  tenant: "tenant"
} as const

