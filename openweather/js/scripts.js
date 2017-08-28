d3.json('js/forecast.json',function(d){
    var temperatures=[];
    for(var i=0;i<d.list.length;i++){
        temperatures.push(d.list[i].main.temp);
    }
    //----------------------------------------------------------------
    var height=400,
        width=600,
        barWidth=50,
        barOffset=5;

    var yScale=d3.scaleLinear()
        .domain([0,d3.max(temperatures)])
        .range([0,height]);

    var xScale=d3.scaleBand()
        .domain(temperatures)
        .padding(.2)
        .range([0,width]);

    var colors=d3.scaleLinear()
        .domain([0,temperatures.length*.33,
                    temperatures.length*.66,
                    temperatures.length])
        .range(['#ff4400','#00ffff','#ff00ff','#ffff00']);

    var tooltip=d3.select('body')
        .append('div')
        .style('position','absolute')
        .style('padding','0 10px')
        .style('background','white')
        .style('border-radius','2px')
        .style('opacity',0);

    var myChart1=
        d3.select('#viz1').append('svg')
            .attr('width',width)
            .attr('height',height)
        .selectAll('rect').data(temperatures)
            .enter().append('rect')
                .style('fill',function(d,i){
                    return colors(i);
                })
                .attr('width',function(d){
                    return xScale.bandwidth();
                })
                .attr('height',0)
                .attr('x', function(d){
                    return xScale(d)
                })
                .attr('y',height)
        //EVENT----------------------------------------------------------------
                .on('mouseover',function(d){
                    tooltip.html(d)
                        .style('left',(d3.event.pageX-35)+'px')
                        .style('top',(d3.event.pageY-30)+'px')
                        .transition()
                        .duration(200)
                        .style('opacity','0.8')

                    tempColor=this.style.fill;
                    d3.select(this)
                    .transition()
                    .duration(200)
                    .style('opacity','0.3')
                    .style('fill','black')
                })
                .on('mouseout',function(d){
                    tooltip.html(d)
                        .style('left',(d3.event.pageX-35)+'px')
                        .style('top',(d3.event.pageY-30)+'px')
                        .transition()
                        .duration(200)
                        .style('opacity','0')

                    d3.select(this)
                    .transition()
                    .duration(200)
                    .style('opacity','1')
                    .style('fill',tempColor)
                });
    //ANIMATION----------------------------------------------------------------
    myChart1.transition()
        .duration(2000)
        .ease(d3.easeBounceOut)
        .delay(function(d,i){
            return i*20
        })
        .attr('height',function(d){
                return yScale(d);
            })
        .attr('y',function(d){
            return height-yScale(d);
        })


//--------------------------------------------------------------------------
var temp_min=[];
var temp_max=[];
for(var i=0;i<d.list.length;i++){
    temp_min.push(d.list[i].main.temp_min);
    temp_max.push(d.list[i].main.temp_max);
}
console.log(temp_min);
console.log(temp_max);

var yScale2=d3.scaleLinear()
    .domain([d3.min(temp_min),d3.max(temp_max)])
    .range([0,height]);

var xScale2=d3.scaleBand()
    .domain(temp_min)
    .range([0,width]);

var myChart2=
    d3.select('#viz2').append('svg')
        .attr('width',width)
        .attr('height',height)
    .selectAll('circle').data(temp_min)
        .enter().append('circle')
        .attr('cx',function(d){
            return xScale2(d);
        })
        .attr('cy',function(d,i){
            return height-yScale2(d);
        })
        .attr('r',2)
        .style('fill','blue');
d3.select('#viz2 svg').selectAll('polyine').data(temp_min)
    .enter().append('polyline')
    .attr('points',function(d,i){
        return xScale2(d)+' '+(height-yScale2(d))+','
        +xScale2(d)+xScale2.bandwidth()/40+' '+(height-yScale2(temp_min[i+1]))
    })
    .style('stroke','black')
})