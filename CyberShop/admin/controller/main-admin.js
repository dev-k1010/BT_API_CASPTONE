import { https } from "../services/service.js";
import {
  layThongTinForm,
  renderPhoneList,
  showData,
} from "./controller-admin.js";
import { Phone } from "../model/phone.js";
import { Validate } from "./validate.js";
import { Untils } from "./untils.js";

const validate = new Validate();
const untils = new Untils();

// Render
let fectPhoneList = () => {
  https
    .get(`/product`)
    .then((res) => {
      renderPhoneList(res.data.reverse());
    })
    .catch((err) => {
      console.log(err.data);
    });
};
fectPhoneList();
// delete
window.deletePhone = (id) => {
  https
    .delete(`/product/${id}`)
    .then((res) => {
      fectPhoneList();
    })
    .catch((err) => {
      console.log("🙂 ~ window.deletePhone ~ err:", err);
    });
};

// Add
window.addPhone = () => {
  let data = layThongTinForm();
  if (!validate.isValid(data, true)) return;

  const inputs = untils.getInputValue();
  let phone = new Phone(" ", ...inputs);

  https
    .post(`/product`, phone)
    .then((res) => {
      $("#exampleModal").modal("hide");
      fectPhoneList();
    })
    .catch((err) => {
      console.log("🙂 ~ err:", err);
    });
};
// Edit
window.editPhone = (id) => {
  https
    .get(`/product/${id}`)
    .then((res) => {
      $("#exampleModal").modal("show");
      showData(res.data);
    })
    .catch((err) => {
      console.log("🙂 ~ err:", err);
    });
};
// Update
window.updatePhone = () => {
  let data = layThongTinForm();
  https
    .put(`/product/${data.id}`, data)
    .then((res) => {
      $("#exampleModal").modal("hide");
      fectPhoneList();
    })
    .catch((err) => {
      console.log("🙂 ~ window.deletePhone ~ err:", err);
    });
};
/*
Anh xem tại code của em sai ở đâu giúp em với ạ nó gặp hai vấn đề
      1. Tại "addPhone" ở dòng 39 thì khi em kiểm tra trùng tên thì nó không in ra thông báo
      2. khi em "Update" ở dòng 69 lại thì nó không update được và hiện Lỗi PUT-404 
Chỗ nào sai anh comment chỉ em cách sữa với ạ!
*/