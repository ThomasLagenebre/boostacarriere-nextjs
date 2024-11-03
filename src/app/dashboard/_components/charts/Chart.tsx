"use client"

import { BarChart } from "./BarChart"

const chartdata = [
  {
    date: "Jan",
    Coachings: 2890,
    Formations:38,
    Ebooks: 3736,
},
  {
    date: "Fev",
    Coachings: 2756,
    Formations: 2103,
    Ebooks: 3736,
},
  {
    date: "Mar",
    Coachings: 3322,
    Formations: 2194,
    Ebooks: 3736,
},
  {
    date: "Avr",
    Coachings: 3470,
    Formations: 2108,
    Ebooks: 3736,
},
  {
    date: "Mai",
    Coachings: 3475,
    Formations: 1812,
    Ebooks: 3736,
},
  {
    date: "Jun",
    Coachings: 3129,
    Formations: 1726,
    Ebooks: 3736,
},
  {
    date: "Jui",
    Coachings: 3490,
    Formations: 1982,
    Ebooks: 3736,
},
  {
    date: "Aou",
    Coachings: 2903,
    Formations: 2012,
    Ebooks: 3736,
},
  {
    date: "Sep",
    Coachings: 2643,
    Formations:42,
    Ebooks: 3736,
},
  {
    date: "Oct",
    Coachings: 2837,
    Formations: 2473,
    Ebooks: 3736,
},
  {
    date: "Nov",
    Coachings: 2954,
    Formations: 3848,
    Ebooks: 3736,
},
  {
    date: "Dec",
    Coachings: 3239,
    Formations: 3736,
    Ebooks: 3736,
},
]

export const Chart = () => (
  <BarChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["Coachings", "Formations", "Ebooks"]}
    onValueChange={(v) => console.log(v)}
    xAxisLabel="Mois"
    colors={["blue", "pink"]}
  />
)