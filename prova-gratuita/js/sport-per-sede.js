(function () {
    "use strict";

    var sportsByGym = {
        "San Stino di Livenza": [
            "Baby Gym",
            "Ginnastica Artistica",
            "Pilates",
            "TeamGym",
            "Yoga",
            "Pole Dance",
            "Calisthenics"
        ],
        "Fossalta di Portogruaro": [
            "Baby Gym",
            "Ginnastica Artistica"
        ],
        "Caorle": [
            "Baby Gym",
            "Ginnastica Artistica",
            "Pilates",
            "Kick Boxing Junior (6/12 anni)",
            "Kick Boxing Adulti"
        ],
        "Oderzo": [
            "Baby Gym",
            "Ginnastica Artistica"
        ]
    };

    function addOption(select, label, value) {
        var option = document.createElement("option");
        option.textContent = label;
        option.value = value;
        select.appendChild(option);
    }

    function updateSports(gymSelect, sportSelect) {
        var selectedGym = gymSelect.value;
        var sports = sportsByGym[selectedGym] || [];

        sportSelect.innerHTML = "";
        addOption(
            sportSelect,
            sports.length ? "Seleziona lo sport" : "Seleziona prima la palestra",
            "-Select-"
        );

        sports.forEach(function (sport) {
            addOption(sportSelect, sport, sport);
        });

        sportSelect.value = "-Select-";
        sportSelect.disabled = sports.length === 0;

        var error = document.getElementById("Dropdown1_error");
        if (error) {
            error.style.display = "none";
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var gymSelect = document.querySelector('select[name="Dropdown"]');
        var sportSelect = document.querySelector('select[name="Dropdown1"]');

        if (!gymSelect || !sportSelect) {
            return;
        }

        gymSelect.addEventListener("change", function () {
            updateSports(gymSelect, sportSelect);
        });

        updateSports(gymSelect, sportSelect);
    });
}());
