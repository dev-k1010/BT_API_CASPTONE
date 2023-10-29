let getData = (idValue) => document.getElementById(idValue).value;

export let layThongTinForm = () => {
  let name = getData("name");
  let price = getData("price");
  let screen = getData("screen");
  let blackCamera = getData("backCam");
  let frontCamera = getData("frontCam");
  let img = getData("img");
  let desc = getData("desc");
  let type = getData("type");
  return { name, price, screen, blackCamera, frontCamera, img, desc, type };
};
export let renderPhoneList = (phoneArr) => {
  let contentHTML = "";
  phoneArr.forEach((phone) => {
    let { id, name, price, screen, blackCamera, frontCamera, img, desc, type } =
      phone;
    let trString = `<tr> 
                              <td>${id}</td> 
                              <td>${name}</td> 
                              <td>${price}</td> 
                              <td><img src="${img}" alt="" class="w-16" /></td>
                              <td>${desc}</td> 
                              <td>
                              <button onclick="deletePhone(${id})" type="button" class="btn btn-primary">Delete</button>
                              <button onclick="editPhone(${id})" type="button" class="btn btn-warning">Edit</button>
                              </td> 
                  </tr>`;
    contentHTML = contentHTML + trString;
  });
  document.getElementById("tablePhone").innerHTML = contentHTML;
};
export function showData(phone) {
  let { name, price, screen, blackCamera, frontCamera, img, desc, type } =
    phone;
  document.getElementById("name").value = name;
  document.getElementById("type").value = type;
  document.getElementById("price").value = price;
  document.getElementById("screen").value = screen;
  document.getElementById("backCam").value = blackCamera;
  document.getElementById("frontCam").value = frontCamera;
  document.getElementById("desc").value = desc;
  document.getElementById("img").value = img;
}
// Validate
