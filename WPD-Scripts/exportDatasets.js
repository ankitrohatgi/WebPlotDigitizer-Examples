// Export all datasets into a JSON file.
//
var wpdscript = (function () {

    function run() { // entry point for the script

        var plotData = wpd.appData.getPlotData(),
            axes = plotData.axes,
            datasets = plotData.dataSeriesColl,
            i,j,
            dataPixel,
            dataValue,

            jsonData = {
                datasets: []
            };

        for(i = 0; i < datasets.length; i++) {

            jsonData.datasets[i] = {name: datasets[i].name, points: []};

            for(j = 0; j < datasets[i].getCount(); j++) {

                dataPixel = datasets[i].getPixel(j);
                dataValue = axes.pixelToData(dataPixel.x, dataPixel.y);

                jsonData.datasets[i].points[j] = {
                    px: dataPixel.x, // x pixel
                    py: dataPixel.y, // y pixel
                    dx: dataValue[0], // x value
                    dy: dataValue[1] // y value
                };

            }
        }

        console.log(JSON.stringify(jsonData));
        downloadJSON(jsonData);

    }


    function downloadJSON(jsonData) { // In the future, WPD will have an inbuilt method to do this.
        var jsonString = JSON.stringify(jsonData),
            formContainer,
            formElement,
            formData;
        
        // Create a hidden form and submit
        formContainer = document.createElement('div'),
        formElement = document.createElement('form'),
        formData = document.createElement('textarea');

        formElement.setAttribute('method', 'post');
        formElement.setAttribute('action', 'php/json.php');

        formData.setAttribute('name', "data");
        formData.setAttribute('id', "data");

        formElement.appendChild(formData);
        formContainer.appendChild(formElement);
        document.body.appendChild(formContainer);
        formContainer.style.display = 'none';

        formData.innerHTML = jsonString;
        formElement.submit();
        document.body.removeChild(formContainer);

    }

    return {
        run: run
    }
})();
