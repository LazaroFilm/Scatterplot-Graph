dataTest = [
  [0, 0],
  [10, 60],
  [5, 30],
  [52, 237],
];

const w = 600;
const h = 300;
const p = 50;

const svg = d3 //
  .select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("id", "graph");

const xScale = d3 //
  .scaleLinear()
  .domain([0, d3.max(dataTest, (d) => d[0])])
  .range([p, w - p]);

const yScale = d3 //
  .scaleLinear()
  .domain([0, d3.max(dataTest, (d) => d[1])])
  .range([h - p, p]);

const xAxis = d3 //
  .axisBottom(xScale.nice());

const yAxis = d3 //
  .axisLeft()
  .scale(yScale.nice());

svg // Dots
  .selectAll("circle")
  .data(dataTest)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d[0]))
  .attr("cy", (d) => yScale(d[1]))
  .attr("r", 5)
  .attr("fill", "red");

svg // X axis
  .append("g")
  .attr("id", "x-axis")
  .attr("transform", `translate(0, ${h - p})`)
  .call(xAxis);

svg // Y axis
  .append("g")
  .attr("id", "y-axis")
  .attr("transform", `translate( ${p}, 0)`)
  .call(yAxis);
