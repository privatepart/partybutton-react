const Privateparty = require('privateparty')
const party = new Privateparty({
  cors: {
    credentials: true,
    origin: ["http://localhost:3000"]
  }
})
party.add("user")
party.app.listen(4200, () => {
  console.log("party started at http://localhost:4200")
})
