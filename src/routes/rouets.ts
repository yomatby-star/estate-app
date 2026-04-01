import { Building2, User } from "lucide-react";

export const ROUTES = {
  property: "/property",
  tenants: "tenants",
} as const

export const NAVE_ITEMS = [
  { path: ROUTES.property, label: "物件一覧", icon: Building2 },
  { path: ROUTES.tenants, label: "入居者", icon: User },
] as const

export const PROPERTY_NAV = {
  room: "room",
  tenant: "tenant"
}