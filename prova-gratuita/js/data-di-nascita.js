(function () {
    "use strict";

    var monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    function toZohoDate(dateValue) {
        var parts = dateValue.split("-");
        if (parts.length !== 3) {
            return "";
        }

        var monthIndex = Number(parts[1]) - 1;
        if (monthIndex < 0 || monthIndex > 11) {
            return "";
        }

        return parts[2] + "-" + monthNames[monthIndex] + "-" + parts[0];
    }

    document.addEventListener("DOMContentLoaded", function () {
        var picker = document.getElementById("DatePicker");
        var zohoDate = document.querySelector('input[name="Date"]');

        if (!picker || !zohoDate) {
            return;
        }

        var today = new Date();
        var localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 10);
        picker.max = localToday;

        picker.addEventListener("input", function () {
            zohoDate.value = toZohoDate(picker.value);
            var error = document.getElementById("Date_error");
            if (error) {
                error.style.display = "none";
            }
        });
    });
}());
