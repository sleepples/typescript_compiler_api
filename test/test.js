const my_code = "let x: string = 'Hello, world!';\nconsole.log(x)";
const tsconfig = {
    "compilerOptions": {
        "strict": true,
        "module": "ES6",
        "lib": ["ES2022", "DOM", "DOM.Iterable"],
    },
};

async function compile() {
    const url = "http://127.0.0.1:5000/";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "code": my_code,
                "tsconfig": tsconfig,
            }),
        });

        if (!response.ok) {
            throw new Error(`status:\n\t${response.status} - ${response.statusText}`);
        }

        const json = await response.text();
        console.log(json);
    } catch (error) {
        console.error(error);
    }
}

compile();