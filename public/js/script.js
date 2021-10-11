window.onload = () => {
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

        if(confirm("추첨하시겠습니까?")) {
            let item;
            const array = [];
            for(item of checks){
                if (item.checked) {
                    const obj = {};
                    const td = item.parentElement;
                    const name = td.nextElementSibling;
                    const place = name.nextElementSibling;
                    obj["name"] = name.innerHTML;
                    obj["place"] = place.innerHTML;
                    array.push(obj);
                }
            }

            if(Array.isArray(array) && !array.length) {
                alert("1개 이상의 메뉴를 선택해주세요.");
                return;
            }

            const url = 'http://localhost:8080/recommend/lunch';
            const data = {menu: array};

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => result(response))
                .catch(error => console.error('Error:', error));
        }
    });
};

function result(data){
    const tr = document.createElement( "tr" );

    const resultTd = document.createElement( "td" );
    resultTd.innerHTML = "당첨>>>>>>>>";

    const menuTd = document.createElement( "td" );
    const placeTd = document.createElement( "td" );
    menuTd.innerHTML = data.menu;
    placeTd.innerHTML = data.place;

    tr.appendChild(resultTd);
    tr.appendChild(menuTd);
    tr.appendChild(placeTd);

    const table = document.querySelector("#menu-table");
    const tbody = table.getElementsByTagName('tbody')[0];
    tbody.appendChild(tr);
}