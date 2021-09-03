const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");


let window;

//Preescolar
const createPreescolar = async (preescolar) => {
  try {
    const conn = await getConnection();
    //preescolar.price = parseFloat(product.price);
    const result = await conn.query("INSERT INTO preescolar SET ?", preescolar);
    preescolar.id = result.insertId;

    // Notify the User
    new Notification({
      title: "Circuito 05",
      body: "Preescolar agregado",
    }).show();

    // Return the created Preescolar
    return preescolar;
  } catch (error) {
    console.log(error);
  }
};



const getPreescolar = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM preescolar ORDER BY id DESC");
  return results;
};

const deletePreescolar = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM preescolar WHERE id = ?", id);
  return result;
};

const getPreescolarById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM preescolar WHERE id = ?", id);
  console.log(result);
  return result[0];
};

const updatePreescolar = async (id, preescolar) => {   
  const conn = await getConnection();
  const result = await conn.query("UPDATE preescolar SET ? WHERE Id = ?", [
    preescolar,
    id,
  ]);
  console.log(result)
};



//Primaria

const createPrimaria = async (primaria) => {
  try {
    const conn = await getConnection();
    
    const result = await conn.query("INSERT INTO primaria SET ?", primaria);
    primaria.id = result.insertId;

    // Notify the User
    new Notification({
      title: "Circuito 05",
      body: "Primaria agregado",
    }).show();

    // Return the created Primaria
    return primaria;
  } catch (error) {
    console.log(error);
  }
};



const getPrimaria = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM primaria ORDER BY id DESC");
  return results;
};

const deletePrimaria = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM primaria WHERE id = ?", id);
  return result;
};

const getPrimariaById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM primaria WHERE id = ?", id);
  console.log(result);
  return result[0];
};

const updatePrimaria = async (id, primaria) => {   
  const conn = await getConnection();
  const result = await conn.query("UPDATE primaria SET ? WHERE Id = ?", [
    primaria,
    id,
  ]);
  console.log(result)
};

//Secundaria

const createSecundaria = async (secundaria) => {
  try {
    const conn = await getConnection();
    
    const result = await conn.query("INSERT INTO secundaria SET ?", secundaria);
    secundaria.id = result.insertId;

    // Notify the User
    new Notification({
      title: "Circuito 05",
      body: "Secundaria agregado",
    }).show();

    return secundaria;
  } catch (error) {
    console.log(error);
  }
};



const getSecundaria = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM secundaria ORDER BY id DESC");
  return results;
};

const deleteSecundaria = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM secundaria WHERE id = ?", id);
  return result;
};

const getSecundariaById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM secundaria WHERE id = ?", id);
  console.log(result);
  return result[0];
};

const updateSecundaria = async (id, secundaria) => {   
  const conn = await getConnection();
  const result = await conn.query("UPDATE secundaria SET ? WHERE Id = ?", [
    secundaria,
    id,
  ]);
  console.log(result)
};


function createWindow() {
  window = new BrowserWindow({
    width: 2100,
    height: 1200,
    title:"INFO-05",
    webPreferences: {
      nodeIntegration: true,
    },
    
  });

  window.loadFile("src/ui/index.html");
}

module.exports = {
  createWindow,
  createPreescolar,
  getPreescolar,
  deletePreescolar,
  getPreescolarById,
  updatePreescolar,
  createPrimaria,
  getPrimaria,
  deletePrimaria,
  getPrimariaById,
  updatePrimaria,
  createSecundaria,
  getSecundaria,
  deleteSecundaria,
  getSecundariaById,
  updateSecundaria
};
