interface AxisObj {
    id: string;
}

interface ChartObj {
    id: string;
    xId: string;
    yId: string;
}

interface Chart {
    init: () => void;
    render: () => void;
    update: () => void;
}