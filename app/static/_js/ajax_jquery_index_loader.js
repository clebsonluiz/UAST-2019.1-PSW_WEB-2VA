
function buscarPosts(type, url, data){
    $.ajax({
        type: type,
        url: url,
        data: data
    }).done(function (response) {
        $('#section').html('');

        response = response.json_parsed;

        console.log(response);
        let txtHtml = "";
        for (let i = 0; i < response.length; i++) {
            txtHtml += preenchePost('normal', response[i]);
        }

        $('#section').html(txtHtml);
    });
}

$(document).ready(function () {

    buscarPosts("POST", '/atual', {data: getData(null)});

    $('#bt_busca_data_index').on('click', function (e) {



        buscarPosts(
            'POST',
            '/atual',
            {data: getData($('#data_campo').val())}
            );
        e.preventDefault();
    });
});
