const mongo = require("mongodb").MongoClient;

console.log(
  "%c Conectando a base de datos...",
  "background: #e35cb8; color: #ffffff"
);

mongo.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err, connection) {
    if (err) {
      console.warn(err);
      return;
    }
    console.log(
      "%c Conectado correctamente a mongodb",
      "background: #61b15a; color: #f2efea"
    );
    global.db = connection.db("omniwatch");
  }
);
