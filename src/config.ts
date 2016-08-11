"use strict";

interface GridMargins {
    top: number,
    right: number,
    bottom: number,
    left: number
}

interface ChartConfig {
    element: Object,
    height: number,
    width: number,
    prefix: string,
    gridClick: Function,
    margin: GridMargins,
    heatMap: boolean,
}

class OncoConfig implements ChartConfig {
    public element: any;
    public height: number;
    public width: number;
    public prefix: string;
    public gridClick: Function;
    public margin: GridMargins;
    public heatMap: boolean;
    
    constructor(params: any) {
        this.element = params.element || 'body';
        this.height = params.height || 500;
        this.width = params.width || 500;
        this.prefix = params.prefix || 'og-';
        this.gridClick = params.gridClick || function() {};
        this.heatMap = params.heatMap || true;
        this.margin = params.margin || {top: 0, right: 0, bottom: 0, left:0}
    }
}