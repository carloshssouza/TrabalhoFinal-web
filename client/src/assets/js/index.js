function verifica(value){
    var salario = document.getElementById("salario");
    var dataAdmissao = document.getElementById("dataAdmissao");
    var percentualComissao = document.getElementById("percentualComissao");

    if(value == "Contratado"){
        salario.disabled = false;
        dataAdmissao.disabled = false;
        percentualComissao.disabled = true;
    }else if(value == "Comissionado"){
        salario.disabled = true;
        dataAdmissao.disabled = true;
        percentualComissao.disabled = false;
    }
};

function verifica2(value){
    var salario = document.getElementById("salario");
    var dataAdmissao = document.getElementById("dataAdmissao");
    var percentualComissao = document.getElementById("percentualComissao");
    var dataName = document.getElementById("dataName");

    if(value == "Contratado"){
        salario.style.display = "inline";
        //dataAdmissao.style.display = "inline"
        percentualComissao.style.display = "none";
    }else if(value == "Comissionado"){
        salario.style.display = "none";
        dataAdmissao.style.display = "none"
        dataName.style.display = "none"
        percentualComissao.style.display = "inline";
    }
};

window.onload = function () {
    document.getElementById("download")
        .addEventListener("click", () => {
            const to_pdf = this.document.getElementById("to_pdf");
            console.log(to_pdf);
            console.log(window);
            var opt = {
                margin: 0.2,
                filename: 'relatorio-gerencial.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };
            html2pdf().from(to_pdf).set(opt).save();
        })
}