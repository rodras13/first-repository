// PAC Desarrollo - Diseño de Interfaces Web - R.Koscinski

//Lo primero es definir las constantes que nos van a servir para presentar flores distintas

const tipo_de_flor = ["img/flor_de_fuego.png", "img/flor_de_hielo.png"];
const tipo_de_tubo = ["img/tubo_amarillo.png", "img/tubo_azul.png", "img/tubo_rojo.png", "img/tubo_verde.png"];

var array_flores = [];
var plantas_en_meta = [];

//Creamos una funcion con el metodo random que nos vendrá bien en varias ocasiones
function quieroUnRandom(posibilidades) {
    return Math.floor(Math.random() * posibilidades);
}

//Creamos una funcion para guardar los tiempos
function meta(idx) {
    if (plantas_en_meta.length == 0) {
        // Ponemos la flor dorada la de indice idx, que es la primera en llegar
        //(Cuando el array de los tiempos está vacio, la primera en guardarse es la primera que llega)
        $(".flor" + array_flores[idx]).attr("src", "img/flor_dorada.png");
    }
    plantas_en_meta.push(idx);

    //Y aquí escribimos el podio de las flores en la tabla
    $(".tabla tbody").append(function () {
        return "<tr>" +
            "<td>Flor " + (idx + 1) + "</td><td>" + plantas_en_meta.length + "º</td>" +
            "</tr>"
    })
    // ponerla en la clasificación
}

//Definimos el Array

$(document).ready(function () {

    //Cogemos el valor del select y lo usamos para definir el array

    $(".replantar").hide();

    $(".opcion").change(function () {

        let numero_flores = ($(".opcion").val());
        array_flores = new Array(numero_flores);

        //Con un bucle, definimos los valores del array
        for (let i = 0; i < numero_flores; i++) {
            array_flores[i] = i; //Y con esto ya tenemos el array

            //Y aprovechamos el for de la creación del array para crear las flores
            $(".invernadero").html(function () {
                $(".invernadero").append(function () {
                    let flor = "";
                    let tubo = "";
                    flor = tipo_de_flor[quieroUnRandom(2)];
                    tubo = tipo_de_tubo[quieroUnRandom(4)];
                    //Con este codigo utilizamos los array constantes para asignar flores y tubos al azar
                    return '<div class="planta">' +
                        '<div><img class="flor' + array_flores[i] + '" src="' + flor + '" alt="Flor de Mario"></div>' +
                        '<div><img class="tubo' + array_flores[i] + '" src="' + tubo + '" alt="Tubo de Mario"></div>' +
                        '</div>';
                })
            })
        }
    })

    //Y asignamos el crecimiento 
    $(".iniciar").click(function () {
        $(".iniciar").hide();
        $(".replantar").show();

        for (let i = 0; i < array_flores.length; i++) {
            let tiempo = quieroUnRandom(2000); //el tiempo necesitamos guardarlo para establecer el evento
            $(".tubo" + array_flores[i]).animate({ height: "360px" }, tiempo);
            setTimeout(() => meta(i), tiempo)
            //Con esta funcion nos aseguramos que guarda el tiempo que tarda
        }
    })


    // Y con esta funcion replantamos las flores
    $(".replantar").click(function () {
        $(".replantar").hide();
        $(".iniciar").show();//Hacemos el juego de botones

        plantas_en_meta = [];//Borramos el podio de llegada de las flores

        $(".tabla tbody").html("");//Y borramos la tabla del HTML

        //Y con este bloque devolvemos todo a su estado inicial
        for (let i = 0; i < array_flores.length; i++) {
            let flor = tipo_de_flor[quieroUnRandom(2)];
            $(".flor" + array_flores[i]).attr("src", flor);
            $(".tubo" + array_flores[i]).animate({ height: "80px" }, quieroUnRandom(900));
        }
    })



})