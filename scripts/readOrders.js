function validate(){
        var elements = document.getElementById("orderForm").elements;
        var form = document.forms[0]
        var filledFields = 0;
        var values = []
        for (var i = 0, element; element = elements[i++];) {
            values.push(element.value)
            if (element.value === ""){
                filledFields++
            };
        };
        if (filledFields != 0){
            alert(filledFields + " required fields are missing.");
            return false;
        }else{
            confirm("Confirm and Submit information?");
        };
};