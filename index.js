// # Imports


var createCostCalculator = function() {
  window.calculator = {
    toggleAddOns: function(e) {
      var selected = document.querySelector("#inspection-type option:checked");

      var addOnCheckBoxes = document.getElementById("add-ons-checkboxes");

      var show = selected.getAttribute("data-addons");
      if (show === "true") {
        addOnCheckBoxes.style.display = "flex";
      } else {
        addOnCheckBoxes.style.display = "none";
      }
    }
  };
  var onSubmit = function(event) {
    event.preventDefault();
    var inspectionTypeValue = parseInt(event.target["inspection-type"].value);
    var size = parseInt(event.target["size"].value);
    var age = parseInt(event.target["age"].value);
    var addOns = event.target["add-ons"];
    var addOnValue = 0;
    var selectedInspectionType = document.querySelector(
      "#inspection-type option:checked"
    );
    var showAddOns = selectedInspectionType.getAttribute("data-addons");
    if (showAddOns === "true") {
      addOns.forEach(function(x) {
        addOnValue += x.checked ? parseInt(x.value) : 0;
      });
    }

    var distance = 40;

    var cost = 0;
    cost += inspectionTypeValue;
    cost += distance;
    cost += size > 1850 ? (size - 1850) * 0.04 : 0;
    cost += age > 23 ? (age - 23) * 1.8 : 0;
    cost += addOnValue;
    var fee = document.getElementById("calculator-fee");
    fee.innerHTML = "Cost: ~$" + Math.round(cost / 10) * 10;
  };

  var form = document.createElement("form");

  form.id = "cost-calculator";
  form.onsubmit = onSubmit;
  form.innerHTML = `
          <div class='field-container'>
            <label for='size'>Inspection Type</label>
          <select id="inspection-type" name="inspection-type" onchange="calculator.toggleAddOns(event)">
            <option data-addOns=true value="550">Standard Residential Inspection (Includes WDO/Termite)</option>
            <option data-addOns=true value="550">Pre-Listing Inspection (Includes WDO/Termite)</option>
            <option data-addOns=true value="375">Investor's Inspection (Includes WDO/Termite)</option>
            <option data-addOns=false value="125">Pre-Sale Evaluation</option>
            <option data-addOns=false value="125">Annual Home Maintainence</option>
            <option data-addOns=false value="125">Re-Inspection</option>
          </select>
        </div>
        <div class='field-container' id="add-ons-checkboxes">
            <label for='add-ons'>Add-ons</label>
            <div>
                <input type='checkbox' name="add-ons" value="125"/><label class="check">Thermal Image Scan</label>           
            </div>
            <div>
                <input type='checkbox' name="add-ons" value="125"/><label class="check">Pool/Spa Inspection fee</label>            
            </div>
            <div>
               <input type='checkbox' name="add-ons" value="125"/><label for="add-ons" class="check">Septic Inspection</label>           
            </div>
            <div>
                <input type='checkbox' name="add-ons" value="150"/><label class="check">Sewer Scope Inspection</label>         
            </div>
            <div>
                <input type='checkbox' name="add-ons" value="-125"/><label class="check">Condo Discount</label>          
            </div>
        </div>
        <div class='field-container'>
           <label for='size'>What size is the property (in square feet)?</label>
           <input type='number' name='size' value='1850'/>
        </div>
        <div class='field-container'>
           <label for='age'>How old is the property?</label>
           <input type='number' name='age' value='37'/>
        </div>
        <div class='footer'>
           <input type='submit' value='Calculate Fee'/>
           <span id='calculator-fee'></span>
        </div>
    `;
  return form;
};
document.getElementById("app").appendChild(createCostCalculator());

