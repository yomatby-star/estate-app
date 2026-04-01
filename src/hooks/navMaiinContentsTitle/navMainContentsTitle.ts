import { useLocation } from "react-router-dom"
import { NAVE_ITEMS } from "../../routes/rouets"

export default function navMainContentsTitle(): string {
  const { pathname } = useLocation()
  const navItem = NAVE_ITEMS.find(item => item.path === pathname)
  return navItem?.label ?? ""
}
