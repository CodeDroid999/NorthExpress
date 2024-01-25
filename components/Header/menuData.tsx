import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Book a ticket",
    newTab: false,
    path: "/book-a-ticket",
  },
  {
    id: 2.1,
    title: "Parcels",
    newTab: false,
    path: "/parcels",
  },
  {
    id: 2.2,
    title: "News",
    newTab: false,
    path: "/blog",
  },
  {
    id: 2.3,
    title: "Contact us",
    newTab: false,
    path: "/support",
  },

];

export default menuData;
