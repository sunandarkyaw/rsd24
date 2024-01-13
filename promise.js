function a() {
    console.log('Function A');
}

function b() {
    return new Promise((resolve, reject) => {
        console.log('Function B');
        resolve();
    }, 2000);

}

function c() {
    console.log('Function C');
}

//run in promise function
// a();
// b().then(c);

//run in async await
async function app() {
    a();
    await b();
    c();
}

app();