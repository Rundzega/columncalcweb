import { Concrete } from "./Concrete";
import { ConcreteRectangle } from "./ConcreteRectangle";
import { CrossSection } from "./CrossSection";
import { NodeFiniteElement } from "./NodeFiniteElements";
import { Rebar } from "./Rebar";
import { Steel } from "./Steel";
import * as mathjs from "mathjs";
import { BarFiniteElement } from "./BarFiniteElement";
import { Column } from "./Column";

const concrete = new Concrete(30.0, 1.4, 2.0, 1.1, 0.85);
const steel = new Steel(500.0, 1.15, 200000.0, 0.01);
const rectangle = new ConcreteRectangle(25, 40, 0, 0);
const rebar1 = new Rebar(concrete, steel, 16.0, -9.0, -17.0);
const rebar2 = new Rebar(concrete, steel, 16.0, -9.0, 0.0);
const rebar3 = new Rebar(concrete, steel, 16.0, -9.0, 17.0);
const rebar4 = new Rebar(concrete, steel, 16.0, 0.0, -17.0);
const rebar5 = new Rebar(concrete, steel, 16.0, 0.0, 17.0);
const rebar6 = new Rebar(concrete, steel, 16.0, 9.0, -17.0);
const rebar7 = new Rebar(concrete, steel, 16.0, 9.0, 0.0);
const rebar8 = new Rebar(concrete, steel, 16.0, 9.0, 17.0);

let rectangleArrayList = [];
rectangleArrayList.push(rectangle);
let rebarArrayList = [];
rebarArrayList.push(rebar1);
rebarArrayList.push(rebar2);
rebarArrayList.push(rebar3);
rebarArrayList.push(rebar4);
rebarArrayList.push(rebar5);
rebarArrayList.push(rebar6);
rebarArrayList.push(rebar7);
rebarArrayList.push(rebar8);

const crossSection = new CrossSection(
  rectangleArrayList,
  rebarArrayList,
  concrete,
  steel,
  40,
  40
);
const node1 = new NodeFiniteElement(0, 0);
const node2 = new NodeFiniteElement(1, 0.35);
const node3 = new NodeFiniteElement(2, 0.7);
const node4 = new NodeFiniteElement(3, 1.05);
const node5 = new NodeFiniteElement(4, 1.4);
const node6 = new NodeFiniteElement(5, 1.75);
const node7 = new NodeFiniteElement(6, 2.1);
const node8 = new NodeFiniteElement(7, 2.45);
const node9 = new NodeFiniteElement(8, 2.8);

const aux1 = mathjs.matrix(mathjs.zeros(5));
const aux2 = mathjs.matrix([-50, 0, 10, 0, 0]);

node1.setNodalRestrictions(aux1);
node9.setNodalLoads(aux2);

const bar1 = new BarFiniteElement(node1, node2, 0.35, 0, crossSection);
const bar2 = new BarFiniteElement(node2, node3, 0.35, 1, crossSection);
const bar3 = new BarFiniteElement(node3, node4, 0.35, 2, crossSection);
const bar4 = new BarFiniteElement(node4, node5, 0.35, 3, crossSection);
const bar5 = new BarFiniteElement(node5, node6, 0.35, 4, crossSection);
const bar6 = new BarFiniteElement(node6, node7, 0.35, 5, crossSection);
const bar7 = new BarFiniteElement(node7, node8, 0.35, 6, crossSection);
const bar8 = new BarFiniteElement(node8, node9, 0.35, 7, crossSection);

let nodeFiniteElementArrayList = [];
let barFiniteElementArrayList = [];

nodeFiniteElementArrayList.push(node1);
nodeFiniteElementArrayList.push(node2);
nodeFiniteElementArrayList.push(node3);
nodeFiniteElementArrayList.push(node4);
nodeFiniteElementArrayList.push(node5);
nodeFiniteElementArrayList.push(node6);
nodeFiniteElementArrayList.push(node7);
nodeFiniteElementArrayList.push(node8);
nodeFiniteElementArrayList.push(node9);

barFiniteElementArrayList.push(bar1);
barFiniteElementArrayList.push(bar2);
barFiniteElementArrayList.push(bar3);
barFiniteElementArrayList.push(bar4);
barFiniteElementArrayList.push(bar5);
barFiniteElementArrayList.push(bar6);
barFiniteElementArrayList.push(bar7);
barFiniteElementArrayList.push(bar8);

const column = new Column(
  nodeFiniteElementArrayList,
  barFiniteElementArrayList
);
column.nonLinearSolve(0.01, 0.01, 5, 500);
console.log(column.getCurrentDisplacementsVector());
//crossSection.setEquilibriumNeutralAxisDepth(-50.0, 0.01, 30.0);
//System.out.println(crossSection.getEquilibriumNeutralAxisDepth());
