window.onload = function() {
    const checkAll = document.querySelector("#check-all");
    console.log(checkAll);
    const checkthis = document.querySelectorAll(".check-this");
    console.log(checkthis);
    checkAll.addEventListener("click", () => {
        if (checkAll.checked) {
            for(var item of checkthis){
                item.checked = true;
            }
        } else {
            for(var item of checkthis){
                item.checked = false;
            }
        }
    });
};