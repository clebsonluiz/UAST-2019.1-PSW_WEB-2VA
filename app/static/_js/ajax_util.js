function preenchePost(visao , post) {

    let html = "";
    html += "<div id='" + post.id + "' class='card text-center'>";

    if (visao == 'perfil')
    {
        html += "<div class='card-header p-0'>";
        html += "<div class='input-group'>";
        html += "<div class='input-group-prepend m-0 excluir_post'>";
        html += "<span class='input-group-text' style='color: red; font-size: 20pt;'>&#10006;</span>";
        html += "</div>";
        html += "<input style='font-size: 20pt;' type='button' class='form-control btn-success disabled'";
        html += "value='Salvar' aria-label='Salvar alterações'>";
        html += "<div class='input-group-append m-0 editar_post'>";
        html += "<span class='input-group-text' style='color: blue; font-size: 20pt;'>&#9998;</span>";
        html += "</div></div></div>";
    }
    html+="<div class='form-group mb-0'>";
    html+="<div class='card-header'>";
    html+="<h4>" + "<a class = 'link_interno black' href='" + adicioneHttp(post.l_post) + "' target='_blank'>" + post.titulo + "</a></h4>";
    html+="</div>";
    html+="<figure class='figure'><img src='" + adicioneHttp(post.l_img) + "' class='card-img-top img-fluid' alt='...'>";
    html+="<figcaption><h3><a class = 'link_interno white' href='"+ adicioneHttp(post.l_post) + "' target='_blank'>" + post.desc_post + "</a></h3>";
    html+="</figcaption></figure>";
    html+="<div class='card-footer'><div class='input-group m-0 p-0'><div class='input-group-prepend m-0 p-0'>";
    html+="<span style='font-size: 12pt;' class='input-group-text m-0 categoria'>" + post.cat_post + "</span></div>";
    html+="<div class='input-group-append m-0 p-0'><small class=' m-1 p-1 text-muted data_post'>" + replaceData(post.data_post) + "</small></div>";
    html+="</div></div></div></div>";


    return html;
}

function postEditar(titulo, descricao, link_img, link_post, categoria, data) {
    link_img = replaceHttp(link_img);
    link_post = replaceHttp(link_post);

    data = getData(data);

    let textHTML = "";

    textHTML += "<input value = '" + titulo.trim() + "' class='form-control mb-2' placeholder='titulo do post' type='text' id='titulo_post_field'>";
    textHTML += "<input value = '" + descricao.trim() + "' class='form-control mb-2' placeholder='descrição do Post' type='text' id='descricao_post_field'>";
    textHTML += "<input value = '" + link_img.trim() + "' class='form-control mb-2' placeholder='Link HTTP da Imagem' type='text' id='link_imagem_field'>";
    textHTML += "<input value = '" + link_post.trim() + "' class='form-control mb-2' placeholder='Link HTTP do Post' type='text' id='link_post_field'>";
    textHTML += "<input value = '" + categoria.trim() + "' class='form-control mb-2' placeholder='Categoria do Post' type='text' id='categoria_post_field'>";
    textHTML += "<input value = '" + data + "' class='form-control mb-2' placeholder='Data do Post' type='date' id='data_post_field'>";

    return textHTML;
}

function postNormal(titulo, descricao, link_img, link_post, categoria, data) {
    link_img = adicioneHttp(link_img);
    link_post = adicioneHttp(link_post);

    data = getData(data);
    data = replaceData(data);

    let textHTML = "";

    textHTML += "<div class='card-header'><h4><a class = 'link_interno black' href='" + link_post + "' target='_blank'>" + titulo + "</a></h4></div>";
    textHTML += "<figure class='figure'><img src='" + link_img + "' class='card-img-top img-fluid' alt='...'>";
    textHTML += "<figcaption><h3><a class = 'link_interno white' href='" + link_post + "' target='_blank'>" + descricao + "</a></h3></figcaption></figure>";
    textHTML += "<div class='card-footer p-0'><div class='input-group m-0 p-0'>";
    textHTML += "<div class='input-group-prepend m-0 p-0'><span style='font-size: 12pt;' class='input-group-text m-0 categoria'>" + categoria + "</span></div>";
    textHTML += "<div class='input-group-append m-0 p-0'><small class=' m-1 p-1 text-muted data_post'>" + data + "</small></div>";
    textHTML += "</div></div>";
    return textHTML;
}

function perfil(nome, login) {
    nome = nome.replace("Nome: ", "").trim();
    login = login.replace("Login: ", "").trim();

    let txtHtml = "";

    txtHtml += "<label name = 'nome' for=''>Nome: " + nome + "</label><br>"
    txtHtml += "<label name = 'login' for=''>Login: " + login + "</label><br></br>"

    return txtHtml;
}

function perfilEditar(nome, login) {

    nome = nome.replace("Nome: ", "").trim();
    login = login.replace("Login: ", "").trim();

    let txtHtml = "";
    txtHtml += "<input class='form-control mb-2' value = '" + nome + "' placeholder='Nome de Usuario' type='text' id='_nome_field' name='nome_user'>";
    txtHtml += "<input class='form-control mb-2' value = '" + login + "' placeholder='Login' type='text' id='login_field' name='login_user'>";

    return txtHtml;
}

function perfilSenha()
{
    return [$('#senha_antiga_field').val(), $('#senha_nova_field').val()];
}

function perfilSenhaEditar() {
    let txtHtml = "";
    txtHtml += "<input class='form-control mt-2 mb-2' placeholder='Senha antiga' type='text' id='senha_antiga_field' name='senha_antiga'>";
    txtHtml += "<input class='form-control mb-2' placeholder='Senha nova' type='text' id='senha_nova_field' name='senha_nova'>";

    return txtHtml;
}




/*
* Funções que são uteis e tals
* */

function getData(valorData) {
    if (valorData == null || valorData == '') {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        valorData = yyyy + '-' + mm + '-' + dd;
    }
    else if (valorData.indexOf("/") != -1) {
        let splited = valorData.split("/", 3);
        let dd = splited[0];
        let mm = splited[1];
        let yyyy = splited[2];
        valorData = yyyy + '-' + mm + '-' + dd;
    }

    return valorData;
}

function replaceData(data)
{

    let splited = data.split("-", 3);
    let dd = splited[2];
    let mm = splited[1];
    let yyyy = splited[0];
    let valorData = dd + '/' + mm + '/' + yyyy;

    return valorData;
}

function replaceHttp(linkHttp) {
    if (linkHttp.indexOf("http://") != -1) {
        return linkHttp.replace("http://", "");
    }
    else if (linkHttp.indexOf("https://") != -1) {
        return linkHttp.replace("https://", "");
    }
    return linkHttp;
}

function adicioneHttp(linkHttp) {
    let link = replaceHttp(linkHttp);
    return "http://" + link;
}
