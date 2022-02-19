let str = window.location.href;
let url = new URL(str);
let order = url.searchParams.get("orderId");

document.getElementById("orderId").innerHTML = order;

