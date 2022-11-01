 /* CONSTANTS AND GLOBALS */
 const width = window.innerWidth * .8,
  height = 500,
  leftMargin = 100,
   margin = 50;

/* LOAD DATA */
d3.csv('../data/prisonPopTime.csv', d => {
  return {
     year: new Date(+d.Year,0,1),
     state: +d.statePrisons,
     jail: +d.localJails,
     fed: +d.federalPrisons
  }
}).then(data => {
  console.log('data :>> ', data);

  // SCALES

  //I tried to figure out how to make a stacked area chart, but failed.
  
  //let keys = data.columns.slice(1)
  // let colorScale = d3.scaleOrdinal()
  //   .domain(keys)
  //   .range(d3.schemeSet2);
  // const stackedData = d3.stack()
  //   .keys(["statePrisons", "federalPrisons", "localJails"])
  // var stackedSeries = stackedData(data); 

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d=>d.state))
    .range([height-margin, margin])

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d=>d.year))
    .range([leftMargin, width-margin])

  // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // BUILD AND CALL AXES
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  svg.append("text")
    .style("transform",`translate(${width/2}px,${height}px)`)
    .style("text-anchor", "middle")
    .text("Year");

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Incarcerated Population");

  svg.append("g")
    .style("transform",`translate(0px,${height-margin}px)`)
    .call(xAxis);
  svg.append("g")
    .style("transform",`translate(${leftMargin}px,0px)`)
    .call(yAxis);

  // LINE GENERATOR FUNCTION

    // const line = d3.line()
    // .x(d => xScale(d.year))
    // .y(d => yScale(d.state))

  const area = d3.area()
    .x(d => xScale(d.year))
    .y0(height-margin)
    .y1(d => yScale(d.state))

  // DRAW LINE

  const path = svg.selectAll("path.st")
  .data([data])
  .join("path")
  .attr("d", d=>area(d))
  .attr("stroke", "black")
  .attr("fill","rgb(196, 88, 11)")

  svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", margin)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px")  
  .text("95 Years of US State Prison Populations");

});