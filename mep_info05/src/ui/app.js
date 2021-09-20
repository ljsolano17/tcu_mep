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


//Secundaria
const secundariaForm = document.querySelector("#secundariaForm");
const secundariaName = document.querySelector("#nombre_secundaria");
const secundariaCodigo = document.querySelector("#codigo_secundaria");
const secundariaTipoDirec = document.querySelector("#tipo_direc_secundaria");
const secundariaMatriculaTotal = document.querySelector("#matricula_total_secundaria");
const secundariaDocenteLabora = document.querySelector("#cantidad_docente_labora_secundaria");
const secundariaDocenteReubicado = document.querySelector("#cantidad_docente_reubicado_secundaria");
const secundariaAdministrativoLabora = document.querySelector("#cantidad_administrativo_labora_secundaria");
const secundariaAdministrativoReubicado = document.querySelector("#cantidad_administrativo_reubicado_secundaria");
const secundariaContieneEduAbierta = document.querySelector("#contiene_edu_abierta_secundaria");
const secundariaListForm = document.querySelector("#primariaForm");
const secundariaList = document.querySelector("#preescolar");
//alert(secundariaMatriculaTotal);
/*
alert(preescolarName);
alert(preescolarCodigo);
alert(preescolarDirector);
alert(preescolarCorreo);*/


//Educacion Abierta
const educacionAbiertaForm = document.querySelector("#edu_abierta_Form");
const educacionAbiertaName = document.querySelector("#nombre_educacion_abierta");
const educacionAbiertaDireccion = document.querySelector("#direccion_educacion_abierta");
const educacionAbiertaTelefono = document.querySelector("#telefono_educacion_abierta");
const educacionAbiertaDirector = document.querySelector("#director_educacion_abierta");
const educacionAbiertaMatriculaTotal = document.querySelector("#matricula_total_educacion_abierta");
const educacionAbiertaHorario = document.querySelector("#horario_educacion_abierta");
const educacionAbiertaListForm = document.querySelector("#edu_abierta_Form");
const educacionAbiertaList = document.querySelector("#preescolar");



const selectPreescolar = document.getElementById("preescolarSelect");
const selectPrimaria = document.querySelector("primariaSelect");
const selectSecundaria = document.querySelector("secundariaSelect");
const selectEduAbierta = document.querySelector("educacionSelect");

/*no me sirve el save y edit porque uso otro formulario */


let preescolar = [];
let primaria = [];
let secundaria = [];
let educacion_abierta = [];

let editingStatus = false;

let editPreescolarId;
let editPrimariaId;
let editSecundariaId;
let editEducacionAbiertaId;

//Preescolar
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
        BORRAR
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editPreescolar('${t.id}')">
          EDITAR 
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
  } else if(identifier==3){
    secundaria = await main.getSecundaria();
    console.log("---------------------")
    console.log(secundaria);
    console.log("---------------------")
    renderSecundaria(secundaria);
  } else if(identifier == 4){
    educacion_abierta = await main.getEducacionAbierta();
    renderEducacionAbierta(educacion_abierta);
  }

};

//Primaria

const deletePrimaria = async (id) => {
 
  try{
 
 await primariaForm.focus();
 
     await main.deletePrimaria(id);
     await getPreescolar(2);
     await primariaForm.focus();

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
           BORRAR
         </button>
         <button class="btn btn-secondary btn-sm" onclick="editPrimaria('${t.id}')">
           EDITAR 
         </button>
         </p>
       </div>
     `;
   });
 }
 



//Secundaria

const deleteSecundaria = async (id) => {
 
  try{
 
 await secundariaForm.focus();
 
     await main.deleteSecundaria(id);
     await getPreescolar(3);
     await prrimariaForm.focus();

  }catch(error){
   console.log(error);
  }
  await secundariaForm.focus();
 };
 
 const editSecundaria = async (id) => {
   const secundaria = await main.getSecundariaById(id);
   console.log(secundaria);
   secundariaName.value = secundaria.Nombre_Institucion;
   secundariaCodigo.value = secundaria.Codigo_Presupuestiario;
   secundariaTipoDirec.value = secundaria.Tipo_Direccion;
   secundariaMatriculaTotal.value = secundaria.Matricula_Total;
   secundariaDocenteLabora.value = secundaria.Cantidad_Docente_Labora;
   secundariaDocenteReubicado.value = secundaria.Cantidad_Docente_Reubicado;
   secundariaAdministrativoLabora.value = secundaria.Cantidad_Administrativo_Labora;
   secundariaAdministrativoReubicado.value = secundaria.Cantidad_Administrativo_Reubicado;
   secundariaContieneEduAbierta.value = secundaria.Contiene_Educacion_Abierta;
   //console.log(secundaria);
   editingStatus = true;
   editSecundariaId = id;
   getPreescolar(3);
 };
 
 secundariaForm.addEventListener("submit", async (e) => {
   try {
     e.preventDefault();
 
     const secundaria = {
       Nombre_Institucion: secundariaName.value,
       Codigo_Presupuestiario: secundariaCodigo.value,
       Tipo_Direccion: secundariaTipoDirec.value,
       Matricula_Total: secundariaMatriculaTotal.value,
       Cantidad_Docente_Labora: secundariaDocenteLabora.value,
       Cantidad_Docente_Reubicado: secundariaDocenteReubicado.value,
       Cantidad_Administrativo_Labora: secundariaAdministrativoLabora.value,
       Cantidad_Administrativo_Reubicado: secundariaAdministrativoReubicado.value,
       Contiene_Educacion_Abierta: secundariaContieneEduAbierta.value,
     };
     console.log('ACAAAAAAA');
     console.log(secundaria);
     console.log('&&&&^&^&&^');
     //console.log(primariaDirector.value);
     if (!editingStatus) {
       const savedSecundaria = await main.createSecundaria(secundaria);
       console.log(savedSecundaria);
       getPreescolar(3);
     } else {
 
       const secundariaUpdated = await main.updateSecundaria(editSecundariaId, secundaria);
       console.log(secundariaUpdated);
 
       // Reset
       editingStatus = false;
       editSecundariaId = "";
       getPreescolar(3);
     }
 
     secundariaForm.reset();
     secundariaName.focus();
     getPreescolar(3);
   } catch (error) {
     console.log(error);
   }
 });
 
 function renderSecundaria(tasks) {
   secundariaList.innerHTML = "";
   tasks.forEach((t) => {
     secundariaList.innerHTML += `
       <div class="card card-body my-2 animated fadeInLeft">
    
  <table class="table wrap-text">
  
   <tbody>
     <tr>
       <td>
       <h4>Institución</h4>
       <p>${t.Nombre_Institucion}</p>
       <h4>Codigo Presupuestario</h4>
       <p>${t.Codigo_Presupuestiario}</p>
       <h4>Tipo Dirección</h4>
       <p>${t.Tipo_Direccion}</p>
       <h4>Matrícula Total</h4>
       <p>${t.Matricula_Total}</p>
       </td>
       <td>
       <h4>Personal Docente Labora</h4>
       <p>${t.Cantidad_Docente_Labora}</p>
       <h4>Personal Docente Reubicado</h4>
       <p>${t.Cantidad_Docente_Reubicado}</p>
       <h4>Personal Administrativo Labora</h4>
       <p>${t.Cantidad_Administrativo_Labora}</p>
       <h4>Personal Administrativo Reubicado</h4>
       <p>${t.Cantidad_Administrativo_Reubicado}</p>
       <h4>Contiene Educación Abierta</h4>
       <p>${t.Contiene_Educacion_Abierta}</p>
       </td>
     </tr>
   </tbody>
 </table>
  <p>
         <button class="btn btn-danger btn-sm" onclick="deleteSecundaria('${t.id}')">
           BORRAR
         </button>
         <button class="btn btn-secondary btn-sm" onclick="editSecundaria('${t.id}')">
           EDITAR 
         </button>
         </p>
       </div>
     `;
   });
 }


//Educacion Abierta

const deleteEducacionAbierta = async (id) => {
 
  try{
 
 await educacionAbiertaForm.focus();
 
     await main.deleteEducacionAbierta(id);
     await getPreescolar(4);
     await educacionAbiertaForm.focus();

  }catch(error){
   console.log(error);
  }
  await educacionAbiertaForm.focus();
 };
 
 const editEducacionAbierta = async (id) => {
   const educacion_abierta = await main.getEducacionAbiertaById(id);
   educacionAbiertaName.value = educacion_abierta.Nombre_Institucion;
   educacionAbiertaDireccion.value = educacion_abierta.Direccion;
   educacionAbiertaTelefono.value = educacion_abierta.Telefono;
   educacionAbiertaDirector.value = educacion_abierta.Director;
   educacionAbiertaMatriculaTotal.value = educacion_abierta.Matricula_Total;
   educacionAbiertaHorario.value = educacion_abierta.Horario;
  
   console.log(educacion_abierta);
   editingStatus = true;
   editEducacionAbiertaId = id;
   getPreescolar(4);
 };
 
 educacionAbiertaForm.addEventListener("submit", async (e) => {
   try {
     e.preventDefault();
 
     const educacion_abierta = {
       Nombre_Institucion: educacionAbiertaName.value,
       Direccion: educacionAbiertaDireccion.value,
       Telefono: educacionAbiertaTelefono.value,
       Director: educacionAbiertaDirector.value,
       Matricula_Total: educacionAbiertaMatriculaTotal.value,
       Horario: educacionAbiertaHorario.value,
     
     };
    
     console.log(educacion_abierta);
     
     //console.log(primariaDirector.value);
     if (!editingStatus) {
       const savedEducacionAbierta = await main.createEducacionAbierta(educacion_abierta);
       console.log(savedEducacionAbierta);
       getPreescolar(4);
     } else {
 
       const educacionAbiertaUpdated = await main.updateEducacionAbierta(editEducacionAbiertaId, educacion_abierta);
       console.log(educacionAbiertaUpdated);
 
       // Reset
       editingStatus = false;
       editEducacionAbiertaId = "";
       getPreescolar(4);
     }
 
     educacionAbiertaForm.reset();
     educacionAbiertaName.focus();
     getPreescolar(4);
   } catch (error) {
     console.log(error);
   }
 });
 
 function renderEducacionAbierta(tasks) {
  educacionAbiertaList.innerHTML = "";
   tasks.forEach((t) => {
    educacionAbiertaList.innerHTML += `
       <div class="card card-body my-2 animated fadeInLeft">
    
  <table class="table wrap-text">
  
   <tbody>
     <tr>
       <td>
       <h4>Institución</h4>
       <p>${t.Nombre_Institucion}</p>
       <h4>Codigo Presupuestario</h4>
       <p>${t.Direccion}</p>
       <h4>Tipo Dirección</h4>
       <p>${t.Telefono}</p>
       </td>
       <td>
       <h4>Director</h4>
       <p>${t.Director}</p>
       <h4>Matrícula Total</h4>
       <p>${t.Matricula_Total}</p>
       <h4>Horario</h4>
       <p>${t.Horario}</p>
       </td>
     </tr>
   </tbody>
 </table>
  <p>
         <button class="btn btn-danger btn-sm" onclick="deleteEducacionAbierta('${t.id}')">
           BORRAR
         </button>
         <button class="btn btn-secondary btn-sm" onclick="editEducacionAbierta('${t.id}')">
           EDITAR 
         </button>
         </p>
       </div>
     `;
   });
 }





let accion = 0;
document.getElementById('preescolarSelect').addEventListener('click', () => {
 getPreescolar(1);
 
})
document.getElementById('primariaSelect').addEventListener('click', () => {
  getPreescolar(2);

})
document.getElementById('secundariaSelect').addEventListener('click', () => {
  getPreescolar(3);


})
document.getElementById('educacionSelect').addEventListener('click', () => {
  getPreescolar(4);

})
document.getElementById('reset_preescolar').addEventListener('click', () => {
  editingStatus = false;

})
document.getElementById('reset_primaria').addEventListener('click', () => {
  editingStatus = false;

})
document.getElementById('reset_secundaria').addEventListener('click', () => {
  editingStatus = false;

})
document.getElementById('reset_edu_abierta').addEventListener('click', () => {
  editingStatus = false;

})


async function init() {
  //getFormPreescolar();

    getPreescolar(1);
 
    //getPrimaria();
  
 
}

init();
