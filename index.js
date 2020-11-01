const fetchDataSet = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  );
  const data = await response.json();
  drawGraph(JSON.stringify(data));
};
fetchDataSet();

const drawGraph = async (data) => {
  const dataSet = JSON.parse(data);

  const w = 600;
  const h = 300;
  const p = 50;

  const xParseYear = d3.timeParse("%Y");

  const yParseTime = d3.timeParse("%M:%S");
  const yFormatMS = d3.timeFormat("%M:%S");

  // console.log(yFormatMS(yParseTime(dataSet[0].Time)));
  // console.log(yParseTime(dataSet[0].Time));
  // console.log(dataSet[0].Time);
  const svg = d3 //
    .select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("id", "graph");

  const xScale = d3 //
    .scaleTime()
    .domain(d3.extent(dataSet, (d) => xParseYear(d.Year)))
    .range([p, w - p]);

  const yScale = d3 //
    .scaleTime()
    .domain(d3.extent(dataSet, (d) => yParseTime(d.Time)))
    .range([h - p, p]);

  const xAxis = d3 //
    .axisBottom(xScale.nice())
    .tickFormat(d3.timeFormat("%Y"));

  const yAxis = d3 //
    .axisLeft()
    .scale(yScale.nice())
    .tickFormat(d3.timeFormat("%M:%S"));

  svg // Dots
    .selectAll("circle")
    .data(dataSet)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(xParseYear(d.Year)))
    .attr("cy", (d) => yScale(yParseTime(d.Time)))
    .attr("r", 5)
    .attr("fill", (d) => (d.Doping === "" ? "blue" : "red"))
    .attr("class", "dot")
    .attr("data-xvalue", (d) => xParseYear(d.Year))
    .attr("data-yvalue", (d) => yParseTime(d.Time))
    .on("mouseover", (d, i) => {
      console.log(i.Name);

      tooltip // display tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9)
        .attr("data-year", xParseYear(i.Year))
        .text(
          `Name: ${i.Name} - Time: ${i.Time} - Place: ${i.Place} - Year: ${i.Year}`
        );
    })
    .on("mouseout", (d, i) => {
      tooltip // hide tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
        .text("");
    });

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

  const wLegend = 95;
  const hLegend = 45;
  const xLegend = w - p - wLegend - 5;
  const yLegend = h - p - hLegend - 5;

  svg // Legend box
    .append("rect")
    .attr("x", xLegend)
    .attr("y", yLegend)
    .attr("height", hLegend)
    .attr("width", wLegend)
    .attr("fill", "lightgray")
    .attr("id", "legend")
    .text("Hello");

  svg // Legend Doped
    .append("text")
    .attr("x", xLegend + 18)
    .attr("y", yLegend + 20)
    .text("doped");
  svg // Legend Not doped
    .append("text")
    .attr("x", xLegend + 18)
    .attr("y", yLegend + 35)
    .text("not doped");
  svg // Legend red dot
    .append("circle")
    .attr("cx", xLegend + 8 + 3)
    .attr("cy", yLegend + 20 - 4)
    .attr("r", 5)
    .attr("fill", "red");
  svg // Legend blue dot
    .append("circle")
    .attr("cx", xLegend + 8 + 3)
    .attr("cy", yLegend + 35 - 4)
    .attr("r", 5)
    .attr("fill", "blue");

  const tooltip = svg // ToolTip popup
    .append("text")
    .attr("x", 5)
    .attr("y", h - 5)
    .text("")
    .style("opacity", 0)
    .attr("id", "tooltip");
};
