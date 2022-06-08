import React from "react";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as VscIcons from "react-icons/vsc";

export const SidebarData = [
  {
    title: "Geometria e Cargas",
    path: "/",
    icon: <GiIcons.GiPisaTower />,
    cName: "nav-text",
  },
  {
    title: "Materiais",
    path: "/materials",
    icon: <GiIcons.GiWheelbarrow />,
    cName: "nav-text",
  },
  {
    title: "Seção Transversal",
    path: "/cross-section",
    icon: <GiIcons.GiIBeam />,
    cName: "nav-text",
  },
  // TODO: UNUSED FOR NOW
  // {
  //     title: 'Discretização',
  //     path: '/discretization',
  //     icon: <BsIcons.BsCalculator />,
  //     cName: 'nav-text'
  // },
  {
    title: "Resultados",
    path: "/results",
    icon: <VscIcons.VscGraphLine />,
    cName: "",
  },
  {
    title: "Sobre",
    path: "/about",
    icon: <BsIcons.BsInfoCircle />,
    cName: "nav-text",
  },
];
