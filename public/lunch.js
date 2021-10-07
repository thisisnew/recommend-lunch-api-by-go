window.onload = function() {
    const checkAll = document.querySelector("#check-all");
    const checks = document.querySelectorAll(".check-this");

    checkAll.addEventListener("click", () => {
        let item;
        if (checkAll.checked) {
            for(item of checks){
                item.checked = true;
            }
        } else {
            for(item of checks){
                item.checked = false;
            }
        }
    });
};