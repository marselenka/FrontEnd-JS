window.onload = function() {
    let fromDate = document.getElementById('dateFrom');
    let toDate = document.getElementById('dateTo');
    let period = document.getElementById('period');
    fromDate.value = new Date().toISOString().slice(0, 10);
    toDate.value = new Date().toISOString().slice(0, 10);



    let onDateChange = function () {
        document.getElementById('period').value = "CS";
        updateTittle(new Date((fromDate.value)), new Date((toDate.value)))
    };

    let updateTittle = function (from, to) {
        let options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        document.getElementById("info").innerHTML = from.toLocaleString("en-US", options) + " - " + to.toLocaleString("en-US", options);
    };

    let onDropDownChanged = function () {
        function getDateAgo(date, days) {
            let dateCopy = new Date(date);
            dateCopy.setDate(date.getDate() - days);
            return dateCopy;
        }

        for (let i = 0; i < period.options.length; i++) {
            let option = period.options[i];
            if (option.selected === true) {
                let from = new Date();
                let to = new Date();

                if (i === 2) {
                    from = getDateAgo(new Date(), 1);
                }
                if (i === 3) {
                    from = getDateAgo(new Date(), 7);
                }
                if (i === 4) {
                    from = getDateAgo(new Date(), 30);
                }
                if (i === 5) {
                    from = getDateAgo(new Date(), 90);
                }
                fromDate.value = from.toISOString().slice(0, 10);
                toDate.value = to.toISOString().slice(0, 10);
                updateTittle(from, to);
            }
        }
    };

    period.onchange = onDropDownChanged;
    fromDate.onchange = onDateChange;
    toDate.onchange = onDateChange;
    updateTittle(new Date(),new Date());
};
