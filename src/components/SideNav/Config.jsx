import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import FactoryIcon from "@mui/icons-material/Factory";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Ventas",
    href: "/budget",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Producción",
    href: "/ot",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Materiales",
    href: "/materials",
    icon: (
      <SvgIcon fontSize="small">
        <WarehouseIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Productos",
    href: "/products",
    icon: (
      <SvgIcon fontSize="small">
        <FactoryIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Gestión de Personal",
    href: "/users",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Proveedores",
    href: "/suppliers",
    icon: (
      <SvgIcon fontSize="small">
        <AddBusinessIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Ordenes de Compra",
    href: "/purchases",
    icon: (
      <SvgIcon fontSize="small">
        <AddBusinessIcon />
      </SvgIcon>
    ),
  },
];
