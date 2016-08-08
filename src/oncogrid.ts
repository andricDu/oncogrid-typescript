///<reference path="d3.d.ts" />
///<reference path="grid.ts" />
///<reference path="config.ts" />
"use strict";

class OncoGrid implements Chart {

    /**
     * Input Data and Configuration
     */
    public x: AxisObj[];
    public y: AxisObj[];
    public z: ChartObj[];
    private config: OncoConfig;

    /**
     * Internal State
     */
    private svg: d3.Selection<any>;
    private xScale: d3.scale.Ordinal<number, number>;
    private yScale: d3.scale.Ordinal<number, number>;
    private cellHeight: number;
    private cellWidth: number;
    private column: d3.Selection<any>;
    private row: d3.Selection<any>;

    constructor(x: AxisObj[], y: AxisObj[], z: ChartObj[], config: any) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.config = new OncoConfig(config);
    }

    /**
     * Initializes grid with background, rows and columns
     */
    public init() {
        console.log('Intializing SVG for OncoGrid');

        this.svg = d3.select(this.config.element)
            .append('svg')
            .attr('width', this.config.width)
            .attr('height', this.config.height)
            .append('g');

        this.svg.append('rect')
            .attr('class', 'background')
            .attr('width', this.config.width)
            .attr('height', this.config.height);

        this.computeCoordinates();
        this.renderColumns();
        this.renderRows();
    }

    /**
     * Renders the actual data
     */
    public render() {
        var _self = this;
        console.log('render');
        
        _self.svg.selectAll('.' + _self.config.prefix + 'maingrid-svg')
        .data(_self.z).enter()
        .append('rect')
        .transition()
        .attr('class', (d) => _self.config.prefix+'sortable-rect ' + d.xId + '-cell ' + d.yId + '-cell')
        .attr('x', (d) => _self.xScale(_self.getIndex(_self.x, d.xId)) )
        .attr('y', (d) => _self.yScale(_self.getIndex(_self.y, d.yId)) )
        .attr('height', _self.cellHeight)
        .attr('width', _self.cellWidth)
        .attr('fill', 'red');
    }

    /**
     * Updates the current render and any registered child charts
     */
    public update() {
        console.log('update');
    }

    /**
     * Computes the x and y coordinates for a given index value
     */
    private computeCoordinates() {
        this.xScale = d3.scale.ordinal<number, number>()
            .domain(d3.range(this.x.length))
            .rangeBands([0, this.config.width]);

        this.yScale = d3.scale.ordinal<number, number>()
            .domain(d3.range(this.y.length))
            .rangeBands([0, this.config.height]);

        this.cellHeight = this.config.height / this.y.length;
        this.cellWidth = this.config.width / this.x.length;
    }

    private renderColumns() {
        var _self = this;

        if (typeof this.column !== 'undefined') {
            this.column.remove();
        }

        this.column = this.svg.selectAll('.' + this.config.prefix + 'column')
            .data(this.x)
            .enter().append('g')
            .attr('class', this.config.prefix + 'column')
            .attr('xId', (d) => d.id )
            .attr('transform', (d, i) => 'translate(' + _self.xScale(i) + ')rotate(-90)');

        this.column.append('line').attr('x1', -1 * this.config.width);
    }

    private renderRows() {
        var _self = this;

        if (typeof this.row !== 'undefined') {
            this.row.remove();
        }

        this.row = this.svg.selectAll('.' + this.config.prefix + 'row')
            .data(this.y)
            .enter().append('g')
            .attr('class', this.config.prefix + 'row')
            .attr('transform', (d, i) => 'translate(0,' + _self.yScale(i) + ')');

        this.row.append('line').attr('x2', this.config.height);
    }
    
    private getIndex(axisObjArray: AxisObj[], id: string) {
        for (var i = 0; i < axisObjArray.length; i++) {
            var curObj = axisObjArray[i];
            if (curObj.id === id) {
                return i;
            }
        }
        return -1;
    }
    
}

