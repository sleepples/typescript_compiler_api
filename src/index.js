const { exec } = require('child_process');
const express = require('express');
const app = express();
const port = 5000;

const fs = require('fs');
const script_name = "user_script.ts";

function write_src(code) {
    fs.writeFile(script_name, code, (err) => {
        return err;
    });
    return;
}

function write_tsconfig(code) {
    fs.writeFile("tsconfig.json", JSON.stringify(code), (err) => {
        return err;
    });
    return;
}

function compile() {
    var results = {
        "status": "",
        "stdError": "",
        "stdout": "",
        "execError": "",
    };
    exec("tsc", (error, stdout, stderr) => {
        results.status = 0;
        if (error) {
            console.error(`error in exec: ${error.message}`);
            results.execError = error;
            results.status = 1;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            results.stdError = stderr;
            results.status = 2;
        }
        results.stdout = stdout;
    });
    return results;
}

function read_js() {
    return fs.readFileSync("user_script.js", "utf8")
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const data = req.body;

    write_src(data.code);
    write_tsconfig(data.tsconfig)

    const compiled = compile();

    if (compiled.status == 0) {
        if (compiled.stdout == "") {
            res.send(read_js());
        } else {
            res.send(`stdout: ${compiled.stdout}`);
        }
    }

    if (compiled.status == 1) {
        res.send("There was an exec error, check server.");
    }

    if (compiled.status == 2) {
        res.send(`there was a compile error: ${compiled.execError.message}`);
    }

});

app.get("/", (req, res) => {
    res.send("Hello, world!");
    console.log(`new conntection at ${new Date().toTimeString()}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});