// Once add a new item on DB, find duplicate and remove

const { hanabomObj } = require("./hanabomObj");
const { updateHanabom } = require("./hanabomAPI");
const helpers = require("./helpers");
const { dbAction, dbEnd } = require("./db");

const handler = async (event) => {
  // Get Wix Created Item and Upload on Hanabom

  const { eventData, dbData } = JSON.parse(event.body);
  console.log("dbData:", dbData);
  console.log("eventData:", eventData);
  const visibleCheck = eventData.updatedFields.filter(
    (field) => field === "visible"
  );

  const objGenerator = async (data, visible) => {
    if (visible.length > 0 && data.length === 0) {
      return { status: "private" };
    } else if (data.length > 0) {
      return await hanabomObj(dbData);
    }
  };

  const objectResult = await objGenerator(dbData, visibleCheck);
  console.log("objectResult:", objectResult);

  // Find from db
  const WixID = eventData.productId;
  const sql = `SELECT * FROM products WHERE wixId = "${WixID}";`;
  console.log("sql:", sql);

  dbAction(sql, (results) => {
    let sqlData = results;
    console.log("sql data:", sqlData[0].hanaId);
    updateHanabom(sqlData[0].hanaId, objectResult);

    return sqlData;
  });
  dbEnd();

  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Updated Product data has been updated!"),
  };
  return response;
};

exports.handler = handler;
