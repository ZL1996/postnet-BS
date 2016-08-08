
$(document).ready(function(){
    $('#input_code').focus(function () {
        $('#err_msg').hide();
        $('#result').hide();
    });
    $('#ok').click(function(){
        var input = $('#input_code').val();
        if($('#barToCode').is(":checked")){
            if(isBarcodeLegal(input)){
                $.post('barcodeToCode',{barcode:$('#input_code').val()})
                    .done(function (data) {
                        $('#result').text(data);
                        $('#result').show();
                        $('#history').after('<tr><td>'+input+'</td><td>'+data+'</td></tr>')
                    })
            } else {
                $('#err_msg').show();
            }
        }
        if($('#codeToBarcode').is(':checked')){
            if(isCodeLegal(input)){
                $.post('/codeToBarcode',{
                    code:$('#input_code').val()
                },function(data,status){
                    $('#result').text(data);
                    $('#result').show();
                    $('#history').after('<tr><td>'+input+'</td><td>'+data+'</td></tr>')
                })
            } else {
                $('#err_msg').show();
            }
        }
    });
});
$('#inputs_code').focusin(function(){
    $('#err_msg').hide();
});