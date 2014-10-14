// addKnownDataPoints.js - WPD script to add data points to an image for which the axes have been calibrated.
// 
// Steps:
// 1) First load the correct image
// 2) Align axes
// 3) From File->Run Script, execute this script
//
var wpdscript = (function () {

    function run() {
        // This function is the entry point for the script.

        var data = [ [1,2], [3, 0] ], // Dummy X,Y data points that are to be plotted.
            i;

        for(i = 0; i < data.length; i++) {
            addDataPoint(data[i][0], data[i][1]);
        }

        // The following two lines are simply to update the GUI:
        wpd.graphicsWidget.forceHandlerRepaint();
        wpd.dataPointCounter.setCount();
    }

    function addDataPoint(x, y) {
        // This method adds a single point to the curent dataset
        var axes = wpd.appData.getPlotData().axes,
            dataset = wpd.appData.getPlotData().getActiveDataSeries(),
            dataPx = axes.dataToPixel(x, y);

        dataset.addPixel(dataPx.x, dataPx.y); 
    }

    return {
        run: run
    };

})();
