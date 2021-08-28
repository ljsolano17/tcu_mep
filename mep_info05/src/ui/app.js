const { remote } = require("electron");
const main = remote.require("./main");


const preescolarForm = document.querySelector("#preescolarForm");
const preescolarName = document.querySelector("#nombre");
const preescolarCodigo = document.querySelector("#codigo");
const preescolarDirector = document.querySelector("#director");
const preescolarTelefono = document.querySelector("#telefono");
const preescolarCorreo = document.querySelector("#email");
const preescolarDireccion = document.querySelector("#direccion");
const preescolarTipoDireccion = document.querySelector("#tipo_direc");
const preescolarMatriculaI = document.querySelector("#matricula_inicial");
const preescolarMatriculaF = document.querySelector("#matricula_final");
const preescolarList = document.querySelector("#preescolar");
const preescolarListForm = document.querySelector("#preescolarForm");
/*
alert(preescolarName);
alert(preescolarCodigo);
alert(preescolarDirector);
alert(preescolarCorreo);*/

const selectPreescolar = document.getElementById("preescolarSelect");
const selectPrimaria = document.querySelector("primariaSelect");
const selectSecundaria = document.querySelector("secundariaSelect");
const selectEduAbierta = document.querySelector("educacionSelect");
/*no me sirve el save y edit porque uso otro formulario */


let preescolar = [];
let editingStatus = false;
let editPreescolarId;

const deletePreescolar = async (id) => {
 
 try{

await preescolarForm.focus();

    await main.deletePreescolar(id);
    await getPreescolar();
    await preescolarForm.focus();




  
 
 }catch(error){
  console.log(error);
 
 }
 
 await preescolarForm.focus();
};

const editPreescolar = async (id) => {
  const preescolar = await main.getPreescolarById(id);
  console.log(preescolar);
  preescolarName.value = preescolar.Nombre_Institucion;
  preescolarCodigo.value = preescolar.Codigo_Presupuestiario;
  preescolarDirector.value = preescolar.Director;
  preescolarTelefono.value = preescolar.Telefono;
  preescolarCorreo.value = preescolar.Correo_Electronico;
  preescolarDireccion.value = preescolar.Direccion;
  preescolarTipoDireccion.value = preescolar.Tipo_Direccion;
  preescolarMatriculaI.value = preescolar.Matricula_Inicial;
  preescolarMatriculaF.value = preescolar.Matricula_Final;
  
  console.log(preescolar);
  editingStatus = true;
  editPreescolarId = id;
};

preescolarForm.addEventListener("submit", async (e) => {
 // alert('hola');
  try {
    e.preventDefault();

    const preescolar = {
      Nombre_Institucion: preescolarName.value,
      Codigo_Presupuestiario: preescolarCodigo.value,
      Director: preescolarDirector.value,
      Telefono: preescolarTelefono.value,
      Correo_Electronico: preescolarCorreo.value,
      Direccion: preescolarDireccion.value,
      Tipo_Direccion: preescolarTipoDireccion.value,
      Matricula_Inicial: preescolarMatriculaI.value,
      Matricula_Final: preescolarMatriculaF.value,
    };
    console.log(preescolarDirector.value);
    if (!editingStatus) {
      const savedPreescolar = await main.createPreescolar(preescolar);
      console.log(savedPreescolar);
    } else {

      const preescolarUpdated = await main.updatePreescolar(editPreescolarId, preescolar);
      console.log(preescolarUpdated);

      // Reset
      editingStatus = false;
      editPreescolarId = "";
    }

    preescolarForm.reset();
    preescolarName.focus();
    getPreescolar();
  } catch (error) {
    console.log(error);
  }
});

function renderPreescolar(tasks) {
  preescolarList.innerHTML = "";
  tasks.forEach((t) => {
    preescolarList.innerHTML += `
      <div class="card card-body my-2 animated fadeInLeft">
   
 <table class="table wrap-text">
 
  <tbody>
    <tr>
      <td>
      <h4>Institución</h4>
      <p>${t.Nombre_Institucion}</p>
      <h4>Codigo Presupuestario</h4>
      <p>${t.Codigo_Presupuestiario}</p>
      <h4>Director</h4>
      <p>${t.Director}</p>
      </td>
      <td>
      <h4>Telefono</h4>
      <p>${t.Telefono}</p>
      <h4>Email</h4>
      <p>${t.Correo_Electronico}</p>
      <h4>Dirección</h4>
      <p>${t.Direccion}</p>
      </td>
      <td>    
      <h4>Tipo De Direccion</h4>
      <p>${t.Tipo_Direccion}</p>
      <h4>Matrícula Inicial</h4>
      <p>${t.Matricula_Inicial}</p>
      <h4>Matrícula Final</h4>
      <p>${t.Matricula_Final}</p>
      </td>
    </tr>
  </tbody>
</table>
 <p>
        <button class="btn btn-danger btn-sm" onclick="deletePreescolar('${t.id}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editPreescolar('${t.id}')">
          EDIT 
        </button>
        </p>
      </div>
    `;
  });
}



/*
function renderPreescolarForm() {
  preescolarListForm.innerHTML = "";
 
    preescolarListForm.innerHTML += `
    <div class="form-group">
            <h4>Nombre de Institución</h4>
            <input type="text" id="nombre" placeholder="Nombre" class="form-control" autofocus>
          </div>
          <div class="form-group">
            <h4>Código Presupuestario</h4>
            <input type="text" id="codigo" placeholder="Codigo" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Director</h4>
            <input type="text" id="director" placeholder="Director" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Teléfono</h4>
            <input type="text" id="telefono" placeholder="0000-0000" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Correo Electrónico</h4>
            <input type="email" id="email" placeholder="Correo Electronico" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Ubicación de la Institución</h4>
            <input type="text" id="direccion" placeholder="Direccion" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Tipo de Dirección</h4>
            <input type="text" id="tipo_direc" placeholder="Tipo Direccion" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Matrícula Inicial</h4>
            <input type="text" id="matricula_inicial" placeholder="Matricula Inicial" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Matrícula Final</h4>
            <input type="text" id="matricula_final" placeholder="Matricula Final" step="any" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
     
    `;
}*/
/*
function renderPrimariaForm() {
  preescolarListForm.innerHTML = "";
 
    preescolarListForm.innerHTML += `
    <div class="form-group">
            <h4>Nombre de Institución</h4>
            <input type="text" id="nombre" placeholder="Nombre" class="form-control" autofocus>
          </div>
          <div class="form-group">
            <h4>Código Presupuestario</h4>
            <input type="text" id="codigo" placeholder="Codigo" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Director</h4>
            <input type="text" id="director" placeholder="Director" step="any" class="form-control">
          </div>
         
        
          <div class="form-group">
            <h4>Ubicación de la Institución</h4>
            <input type="text" id="direccion" placeholder="Direccion" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Tipo de Dirección</h4>
            <input type="text" id="tipo_direc" placeholder="Tipo Direccion" step="any" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
     
    `;
}
function renderSecundariaForm() {
  preescolarListForm.innerHTML = "";
 
    preescolarListForm.innerHTML += `
    <div class="form-group">
            <h4>Nombre de Institución</h4>
            <input type="text" id="nombre" placeholder="Nombre" class="form-control" autofocus>
          </div>
          <div class="form-group">
            <h4>Código Presupuestario</h4>
            <input type="text" id="codigo" placeholder="Codigo" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Director</h4>
            <input type="text" id="director" placeholder="Director" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Teléfono</h4>
            <input type="text" id="telefono" placeholder="0000-0000" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Correo Electrónico</h4>
            <input type="email" id="email" placeholder="Correo Electronico" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Ubicación de la Institución</h4>
            <input type="text" id="direccion" placeholder="Direccion" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Tipo de Dirección</h4>
            <input type="text" id="tipo_direc" placeholder="Tipo Direccion" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Matrícula Inicial</h4>
            <input type="text" id="matricula_inicial" placeholder="Matricula Inicial" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Matrícula Final</h4>
            <input type="text" id="matricula_final" placeholder="Matricula Final" step="any" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
     
    `;
}

function renderEduAbiertaForm() {
  preescolarListForm.innerHTML = "";
 
    preescolarListForm.innerHTML += `
    <div class="form-group">
            <h4>Nombre de Institución</h4>
            <input type="text" id="nombre" placeholder="Nombre" class="form-control" autofocus>
          </div>
          <div class="form-group">
            <h4>Código Presupuestario</h4>
            <input type="text" id="codigo" placeholder="Codigo" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Director</h4>
            <input type="text" id="director" placeholder="Director" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Teléfono</h4>
            <input type="text" id="telefono" placeholder="0000-0000" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Correo Electrónico</h4>
            <input type="email" id="email" placeholder="Correo Electronico" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Ubicación de la Institución</h4>
            <input type="text" id="direccion" placeholder="Direccion" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Tipo de Dirección</h4>
            <input type="text" id="tipo_direc" placeholder="Tipo Direccion" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Matrícula Inicial</h4>
            <input type="text" id="matricula_inicial" placeholder="Matricula Inicial" step="any" class="form-control">
          </div>
          <div class="form-group">
            <h4>Matrícula Final</h4>
            <input type="text" id="matricula_final" placeholder="Matricula Final" step="any" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
     
    `;
}


*/


const getPreescolar = async () => {
  preescolar = await main.getPreescolar();
  renderPreescolar(preescolar);

};
/*
const getFormPreescolar = async () => {
 // if((selectPreescolar.value)=='Preescolar'){
    renderPreescolarForm();
  //}
  

};*/

document.getElementById('preescolarSelect').addEventListener('click', () => {
 // renderPreescolarForm();

 /*Render los cards de la derecha */
 //alert('Hola');
})
document.getElementById('primariaSelect').addEventListener('click', () => {
  //renderPrimariaForm();
  //alert('Hola');
})
document.getElementById('secundariaSelect').addEventListener('click', () => {
 // renderSecundariaForm();
 //alert('Hola');
})
document.getElementById('educacionSelect').addEventListener('click', () => {
  //alert('Hola');
  
  //renderEduAbiertaForm();
})

async function init() {
  //getFormPreescolar();
  getPreescolar();
}

init();
