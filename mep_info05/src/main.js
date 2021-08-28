const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("./database");


let window;

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

function createWindow() {
  window = new BrowserWindow({
    width: 2100,
    height: 1200,
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
  updatePreescolar
};
