import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuBanknote,
} from "react-icons/lu";


export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuBanknote,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "04",
    label: "Budget",
    icon: LuWalletMinimal,
    path: "/budget",
  },
];
