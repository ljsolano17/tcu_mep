const { remote } = require("electron");
const { getPrimaria } = require("../main");
const main = remote.require("./main");

//Preescolar
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


//Primaria
const primariaForm = document.querySelector("#primariaForm");
const primariaName = document.querySelector("#nombre_primaria");
const primariaCodigo = document.querySelector("#codigo_primaria");
const primariaTelefono = document.querySelector("#telefono_primaria");
const primariaCorreo = document.querySelector("#email_primaria");
const primariaTipoDirec = document.querySelector("#tipo_direc_primaria");
const primariaModalidad = document.querySelector("#modalidad_institucion_primaria");
const primariaListForm = document.querySelector("#primariaForm");
const primariaList = document.querySelector("#preescolar");

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
let primaria = [];
let editingStatus = false;
let editPreescolarId;
let editPrimariaId;

const deletePreescolar = async (id) => {
 
 try{

await preescolarForm.focus();

    await main.deletePreescolar(id);
    await getPreescolar(1);
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
  
  //console.log(preescolar);
  editingStatus = true;
  editPreescolarId = id;
  getPreescolar(1);
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
      getPreescolar(1);
    } else {

      const preescolarUpdated = await main.updatePreescolar(editPreescolarId, preescolar);
      console.log(preescolarUpdated);

      // Reset
      editingStatus = false;
      editPreescolarId = "";
      getPreescolar(1);
    }

    preescolarForm.reset();
    preescolarName.focus();
    getPreescolar(1);
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
const getPreescolar = async (identifier) => {
  console.log(identifier);
  if(identifier==1){
    preescolar = await main.getPreescolar();
    renderPreescolar(preescolar);
  }else if(identifier==2){
    primaria = await main.getPrimaria();
    renderPrimaria(primaria);
  }
 

};

//Primaria

const deletePrimaria = async (id) => {
 
  try{
 
 await primariaForm.focus();
 
     await main.deletePrimaria(id);
     await getPreescolar(2);
     await prrimariaForm.focus();

  }catch(error){
   console.log(error);
  }
  await primariaForm.focus();
 };
 
 const editPrimaria = async (id) => {
   const primaria = await main.getPrimariaById(id);
   console.log(primaria);
   primariaName.value = primaria.Nombre_Institucion;
   primariaCodigo.value = primaria.Codigo_Presupuestiario;
   primariaTelefono.value = primaria.Telefono;
   primariaCorreo.value = primaria.Correo_Electronico;
   primariaTipoDirec.value = primaria.Tipo_Direccion;
   primariaModalidad.value = primaria.Modalidad_Institucion;

   
   console.log(primaria);
   editingStatus = true;
   editPrimariaId = id;
   getPreescolar(2);
 };
 
 primariaForm.addEventListener("submit", async (e) => {
  // alert('hola');
   try {
     e.preventDefault();
 
     const primaria = {
       Nombre_Institucion: primariaName.value,
       Codigo_Presupuestiario: primariaCodigo.value,
       Telefono: primariaTelefono.value,
       Correo_Electronico: primariaCorreo.value,
       Tipo_Direccion: primariaTipoDirec.value,
       Modalidad_Institucion: primariaModalidad.value,
      
     };
     //console.log(primariaDirector.value);
     if (!editingStatus) {
       const savedPrimaria = await main.createPrimaria(primaria);
       console.log(savedPrimaria);
       getPreescolar(2);
     } else {
 
       const primariaUpdated = await main.updatePrimaria(editPrimariaId, primaria);
       console.log(primariaUpdated);
 
       // Reset
       editingStatus = false;
       editPrimariaId = "";
       getPreescolar(2);
     }
 
     primariaForm.reset();
     primariaName.focus();
     getPreescolar(2);
   } catch (error) {
     console.log(error);
   }
 });
 
 function renderPrimaria(tasks) {
   primariaList.innerHTML = "";
   tasks.forEach((t) => {
     primariaList.innerHTML += `
       <div class="card card-body my-2 animated fadeInLeft">
    
  <table class="table wrap-text">
  
   <tbody>
     <tr>
       <td>
       <h4>Institución</h4>
       <p>${t.Nombre_Institucion}</p>
       <h4>Codigo Presupuestario</h4>
       <p>${t.Codigo_Presupuestiario}</p>
       <h4>Telefono</h4>
       <p>${t.Telefono}</p>
       </td>
       <td>
       <h4>Email</h4>
       <p>${t.Correo_Electronico}</p>
       <h4>Dirección</h4>
       <p>${t.Tipo_Direccion}</p>
       <h4>Modalidad Institucion</h4>
       <p>${t.Modalidad_Institucion}</p>
       </td>
     </tr>
   </tbody>
 </table>
  <p>
         <button class="btn btn-danger btn-sm" onclick="deletePrimaria('${t.id}')">
           DELETE
         </button>
         <button class="btn btn-secondary btn-sm" onclick="editPrimaria('${t.id}')">
           EDIT 
         </button>
         </p>
       </div>
     `;
   });
 }
 

/*
function getPrimaria(){
primaria = main.getPrimaria();
renderPrimaria(primaria);
}
*/


let accion = 0;
document.getElementById('preescolarSelect').addEventListener('click', () => {
 getPreescolar(1);
 
})
document.getElementById('primariaSelect').addEventListener('click', () => {
  getPreescolar(2);

})
document.getElementById('secundariaSelect').addEventListener('click', () => {


})
document.getElementById('educacionSelect').addEventListener('click', () => {


})

async function init() {
  //getFormPreescolar();

    getPreescolar(1);
 
    //getPrimaria();
  
 
}

init();
