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

    const recommend = document.querySelector(".recommend");
    recommend.addEventListener("click", () => {
        let item;
        const array = [];
        for(item of checks){
            if (item.checked) {
                const obj = {};
                const td = item.parentElement;
                const menu = td.nextElementSibling;
                const place = menu.nextElementSibling;
                obj["menu"] = menu.innerHTML;
                obj["place"] = place.innerHTML;
                array.push(obj);
            }
        }

        if(Array.isArray(array) && !array.length) {
            alert("1개 이상의 메뉴를 선택해주세요.");
            return;
        }


    });
};