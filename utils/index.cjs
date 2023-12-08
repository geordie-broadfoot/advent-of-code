const fs = require("fs")

const readFile = (file) => {
  return fs.readFileSync(process.argv[1] + "/" + file, "utf8")
}

module.exports = {
  readFile,
}
