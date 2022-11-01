/* CONSTANTS AND GLOBALS */
 const width = window.innerWidth * .8,
   height = 600,
   margin = 50,
   radius = 20;

/* LOAD DATA */
d3.csv("../data/incarcerated_population_states.csv", d3.autoType)
  .then(data => {
    console.log(data)

    const svg = d3.select("#container").append("svg")
    .attr("width",width)
    .attr("height",height)
    .style("overflow", "visible")

    /* SCALES */
    const xScale = d3.scaleLinear()
    .domain([0,Math.max(...data.map(d=> d.Total_Incarcerated))])
    .range([margin,width-margin])

    const yScale = d3.scaleLinear()
    .domain([0,Math.max(...data.map(d=> d.Imprisonment_Rate))])
    .range([height-margin,margin])

    const rScale = d3.scaleSqrt()
    .domain([0, Math.max(...data.map(d=>d.Life_Sentences))])
    .range([0,20])

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    /* HTML ELEMENTS */
    const statePopSvg = d3.select("container")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const circles = svg.selectAll(".dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d=> xScale(d.Total_Incarcerated))
    .attr("cy", d=>yScale(d.Imprisonment_Rate))
    .attr("r", d=>rScale(d.Life_Sentences))

    svg.selectAll("text.label")
    .data(data)
    .enter()
      .append("text")
      .attr("class", "label")
      .text(d=>(d.State))
      .attr("x", d=>xScale(d.Total_Incarcerated))
      .attr("y", d=>yScale(d.Imprisonment_Rate))
      .attr("text-anchor", "start")

      svg.append("g")
        .style("transform",`translate(0px,${height-margin}px)`)
        .call(xAxis);

      svg.append("g")
        .style("transform",`translate(${margin}px,0px)`)
        .call(yAxis);

      svg.append("text")
        .style("transform",`translate(${width/2}px,${height}px)`)
        .style("text-anchor", "middle")
       .text("Total Incarcerated Population");

       svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - margin.left)
       .attr("x",0 - (height / 2))
       .attr("dy", "0em")
       .style("text-anchor", "middle")
       .text("Imprisonment Rate per 100k Residents");


  svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", margin)
  .attr("text-anchor", "middle")  
  .style("font-size", "16px")  
  .text("Incarceration in the United States 2020")

  svg.append("text")
  .attr("x", (width / 2))             
  .attr("y", margin+10)
  .attr("text-anchor", "middle")  
  .style("font-size", "10px") 
  .text("*circle size is indication of # of life sentences")
  
  });



    // svg.selectAll("text")
    // .data(data.features)
    // .enter()
    //   .append("text")
    //   .text(d=>(d.NTAname))
    //   .attr("x", d=>xScale(d.total_pop_sum_sum)+10)
    //   .attr("y", d=>yScale(d.incar_pop_sum)+20)
    //   //.attr("text-anchor", "start")
    //   .style("font-size", "10px")
    //   .style("fill", "pink")
    //   .raise();
