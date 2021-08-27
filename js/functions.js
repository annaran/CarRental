// global variables //
var selectedCompany = ''
var selectedCar = ''
var selectedHours = 0

// global variables //

function selectCompany(company)
{
    selectedCompany = company
    update_temp_company(company)
}


function selectCar(car)
{

    selectedCar = car
    update_temp_car(car)
}

function goto_select_company()
{
    selectedHours = $("#hourpicker").val();
    selectedCompany = ''
    location.href = "select_company";
}

function gobackto_select_car()
{

    location.href = "select_car";
}

function goto_select_car()
{
    if (selectedCompany == '') {
        swal({title:"COMPANY NOT SELECTED", text: "Select a company before proceeding",   icon: "warning", });

    }  else {
        selectedCar = ''
        location.href = "select_car";
    }
}

function goto_location_search()
{
    location.href = "search_location";
}

function goto_profile()
{
    location.href = "profile";
}

function goto_payment()
{
    location.href = "payment";
}


function gobackto_select_hours()
{
    location.href = "select_hours";
}


function gobackto_select_date()
{
    location.href = "select_date";
}

function goto_confirmation()
{
    if (selectedCar == '') {
        swal({title:"CAR NOT SELECTED", text: "Select a car before proceeding",   icon: "warning", });

    }  else {
        location.href = "confirmation";
    }
}

function backto_location()
{

        location.href = 'search_location'

}

$(document).ready(function() {
    $('#btn-hours').click(function(e) {

        var iDate = $("#datetimepicker").val();
        console.log(iDate)
        if (iDate == null || iDate == '') {
            swal({title:"Date NOT SPECIFIED", text: "Select date before proceeding",   icon: "warning", });

        }else {
            update_temp_date()
        }

    });
});





$(document).ready(function() {
    $('#btn-company').click(function(e) {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        update_temp_hours()
        //alert($("#datetimepicker").val())

    });
});


$(document).ready(function() {
    $('#btn-car').click(function(e) {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        update_temp_company()
        //alert(document.getElementsByClassName("list-group-item active"))

    });
});

$(document).ready(function() {
    $('#btn-date').click(function(e) {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        update_temp_location()
        //alert(document.getElementsByClassName("list-group-item active"))

    });
});


$(document).ready(function() {
    $('#btn-confirmation').click(function(e) {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        update_temp_car()
        //alert($("#datetimepicker").val())

    });
});


function update_temp_date(){
    var iDate = $("#datetimepicker").val();
    console.log(iDate)
    if (iDate == null || iDate == '') {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/

        //location.href = 'select_date'
    } else {
        $.ajax({
            method: "GET",
            url: "apis/api-update-temp-date.php",
            data: {iDate: iDate},
            cache: false
        }).done(function (data) {
            console.log('GEA query result: ' + data)
           // $('div#private-message-text').html(data)
            location.href = 'select_hours'

        }).fail(function () {
            console.log('FATAL ERROR')
        })
        return false
    }
}


function update_temp_company(company){
    var sCompany = company
    console.log(sCompany)
    if (sCompany == null || sCompany == '') {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
       // alert('empty company')
        //location.href = 'select_company'
    } else {
        $.ajax({
            method: "GET",
            url: "apis/api-update-temp-company.php",
            data: {sCompany: sCompany},
            cache: false
        }).done(function (data) {
            console.log('GEA query result: ' + data)
            // $('div#private-message-text').html(data)
            //location.href = 'select_car'

        }).fail(function () {
            console.log('FATAL ERROR')
        })
        return false
    }
}


function update_temp_car(car){
    var sCar = car;
    var iHours = selectedHours;

    console.log(sCar)
    if (sCar == null || sCar == '') {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        //alert('empty car')
        //location.href = 'select_car'
    } else {
        $.ajax({
            method: "GET",
            url: "apis/api-update-temp-car.php",
            data: {sCar: sCar, iHours: iHours},
            cache: false
        }).done(function (data) {
            console.log('GEA query result: ' + data)
            // $('div#private-message-text').html(data)
            //location.href = 'confirmation'

        }).fail(function () {
            console.log('FATAL ERROR')
        })
        return false
    }
}


function update_temp_hours(){
    var iHours = $("#hourpicker").val();
    selectedHours = iHours
    console.log(iHours)
    if (iHours == null || iHours == '') {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        //alert('empty hours')
        //location.href = 'select_hours'
    } else {
        $.ajax({
            method: "GET",
            url: "apis/api-update-temp-hours.php",
            data: {iHours: iHours},
            cache: false
        }).done(function (data) {
            console.log('GEA query result: ' + data)
            // $('div#private-message-text').html(data)
            //location.href = 'select_company'

        }).fail(function () {
            console.log('FATAL ERROR')
        })
        return false
    }
}








// ------------- select hours

$(document).on('click', '.number-spinner button', function () {
    var btn = $(this),
        oldValue = btn.closest('.number-spinner').find('input').val().trim(),
        newVal = 0;

    if (btn.attr('data-dir') == 'up') {
        newVal = parseInt(oldValue) + 1;
    } else {
        if (oldValue > 1) {
            newVal = parseInt(oldValue) - 1;
        } else {
            newVal = 1;
        }
    }
    btn.closest('.number-spinner').find('input').val(newVal);
});


//-------------- payment

$('#frmPayment').submit( function(){

    $.ajax({
        method:"POST",
        url:"apis/api-payment",
        data:$('#frmPayment').serialize(),
        dataType:'JSON'
    }).
    done(function(jData){
        if(jData.status == 0){
            console.log(jData)
            swal({title:"INFORMATION MISSING", text: jData.message,   icon: "warning", });
            return
        }

        // SUCCESS

        location.href = 'payment_success'







    }).
    fail(function(){
        console.log('error')

    })

    return false

})




// location search

$(document).ready(function() {
    $('#btn-locationsearch').click(function(e) {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        search_location()
        //alert(document.getElementsByClassName("list-group-item active"))

    });
});





function search_location(){
    var sLocation = $("#locationpicker").val();
    console.log(sLocation)
    if (sLocation == null || sLocation == '') {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        swal({title:"LOCATION NOT SPECIFIED", text: "Enter location",   icon: "warning", });
       // location.href = 'search_location'
    } else {

        location.href = 'search_location?sLocation='+sLocation

        return false
    }
}



$(document).ready(function () {
        $('#locationpicker').keyup(function (e) {
                if (e.key === "Enter") {
                    search_location()
                }

            }
        );
    }
);




function goto_select_date(){
    var sLocation = $("#locationpicker").val();
    console.log(sLocation)
    if (sLocation == null || sLocation == '') {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        swal({title:"LOCATION NOT SPECIFIED", text: "Enter location before proceeding",   icon: "warning", });
         return
        // location.href = 'search_location'
    } else {
        // $("#locationpicker").val() = sLocation;
        location.href = 'select_date'
       // return false
    }
}


function update_temp_location(){
    var sLocation = $("#locationpicker").val();
    console.log(sLocation)
    if (sLocation == null || sLocation == '') {
        /*swal({title:"WARNING", text: "clicked",   icon: "warning", })*/
        //alert('empty location')
        //location.href = 'search_location'
    } else {
        $.ajax({
            method: "GET",
            url: "apis/api-update-temp-location.php",
            data: {sLocation: sLocation},
            cache: false
        }).done(function (data) {
            console.log('GEA query result: ' + data)
            // $('div#private-message-text').html(data)
            // location.href = 'select_date'

        }).fail(function () {
            console.log('FATAL ERROR')
        })
        return false
    }
}