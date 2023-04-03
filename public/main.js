

let main = async () => {

    console.log("Welcome");

}


Promise.all([processImages(), processSounds()]).then(() => {
    main();
});