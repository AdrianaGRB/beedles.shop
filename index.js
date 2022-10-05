/* HTML */
const shopCarIcon = document.querySelector(".fa-cart-shopping");
const hamburguerIcon = document.querySelector(".fa-bars");
const sumaResta = document.querySelectorAll(".sign");
const categoryProducts = document.querySelectorAll(".category");
const addProduct = document.querySelector(".add__product");
const containerProductItem = document.querySelector(".products__container");
const categories = document.querySelector(".filter");
const popUpContainer = document.querySelector(".products__card");
const closePopup = document.querySelector(".close__button");
const menuIcons = document.querySelector(".hamburguer__icon");
const burgerContainer = document.querySelector(".hamburguer__menu");
const cartContainer = document.querySelector(".cart__container");
const cartItems = document.querySelector(".cart__items");
const total = document.querySelector(".purcharseTotal");
const confirmBuy = document.querySelector(".button__confirm");
const navBar = document.querySelector(".nav__bar");
const aSell = document.querySelector(".link_a");
const btnSell = document.querySelector(".btn_hover");

/* Local Storage */
let storageCart = JSON.parse(localStorage.getItem("storageCart")) || [];
const saveLocalStorage = (storage) => {
  localStorage.setItem("storageCart", JSON.stringify(storage));
};

/* Funcion para el scroll */
let lasScrollTop = 0;
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop > lasScrollTop) {
    navBar.style.top = "-2000px";
  } else {
    navBar.style.top = "0";
  }
  lasScrollTop = scrollTop;
});
/* Funcion para printar las cards de productos*/
const productItemCard = (producto) => {
  const { id, name, price, img } = producto;
  return `    
  <div class="product__item">
  <div class="product__info">
    <img src="${img}" alt="imagen del producto" />
    <h4>${name}</h4>
  </div>
  <div class="product__price">
    <img class="rupee" src="./images/Green_Rupee.png" alt="Rupee" />
    <h3>${price}</h3>
    <button data-id="${id}" data-name="${name}"  data-img="${img}" class="open__popUp">+</button>
  </div>
 
</div>`;
};

/* Renderizar todos los productos al cargar la pagina*/
const renderProductCard = (productsData) => {
  containerProductItem.innerHTML = productsData.map(productItemCard).join("");
};

/* Filtrado y renderizado de los productos */
const filterProductCard = (e) => {
  /* Variables */
  const buttonFilter = e.target.dataset.category;
  /*   console.log(buttonFilter); */
  const arrayFilterProduct = [];
  const renderSelection = (productsData) => {
    containerProductItem.innerHTML = productsData.map(productItemCard).join("");
  };
  /* Filtrado */
  productsData.forEach((product) => {
    if (product.category === buttonFilter) {
      arrayFilterProduct.push(product);
      return;
    }
  });

  if (arrayFilterProduct.length > 0) {
    containerProductItem.innerHTML = "";
    renderSelection(arrayFilterProduct);
  } else {
    containerProductItem.innerHTML = "";
    renderSelection(productsData);
  }
};
const colorFilter = (e) => {
  const selectedFilter = e.target.dataset.category;
  const categories = [...categoryProducts];
  categories.forEach((category) => {
    if (category.dataset.category === selectedFilter) {
      category.classList.add("active");
    } else {
      category.classList.remove("active");
    }
  });
};
/* Pintar el contenido del popUp */
const infoProductCar = (dataproducto) => {
  const { id, name, price, img, description, category } = dataproducto;
  return `  
  <div class="first__part">
  <button class="close__button">X</button>
  <img src="${img} " alt="Imagen del producto">
  <div class="price">
    <img src="./images/Green_Rupee.png" alt="">
    <h4>${price}</h4>
    <p>Precio</p>
    <hr>
  </div>
</div>
<!-- Medium -->
<div class="product__description">
  <h5>${name}</h5>
  <hr>
  <p>"${description}" </p>
</div>
<!-- bottom -->
<div class="product__card__options">
 
  <button class="add__product" data-id="${id}" data-name="${name}" data-category="${category}" data-img="${img}" data-price="${price}"  >¡Agrega eso!</button> 
</div>
  `;
};

/* Renderizar la card */
const renderCardInfo = (e) => {
  /* Id del boton ver mas */
  const productIdPop = parseInt(e.target.dataset.id);
  /* id incontrado */
  let findElement = productsData.find((element) => element.id === productIdPop);

  if (productsData.some((obj) => productIdPop === obj.id)) {
    /*     console.log(findElement);
     */ popUpContainer.innerHTML = "";
    popUpContainer.innerHTML = infoProductCar(findElement);
  }
};

/* Abrir y cerrar el popUp */
const openPopUp = (e) => {
  if (e.target.classList.contains("open__popUp" || "product__item")) {
    popUpContainer.classList.add("active");
  }
};

const closePopUp = (e) => {
  if (e.target.classList.contains("close__button")) {
    popUpContainer.classList.remove("active");
  }
};
/* Toggle menu */
const openMenu = (e) => {
  if (e.target.classList.contains("fa-bars")) {
    burgerContainer.classList.toggle("active");
    cartContainer.classList.remove("active");
    return;
  }
  x;
};
/* Toggle carrito */
const openCar = (e) => {
  /*   console.log(cartContainer); */
  if (e.target.classList.contains("fa-cart-shopping")) {
    cartContainer.classList.toggle("active");
    burgerContainer.classList.remove("active");
    return;
  }
};
/* Agregar producto al carrito */

/* Pintar el html */
const productToCart = (productscart) => {
  const { id, name, price, img, quantity } = productscart;
  return `
  <div class="products__car">
  <!-- imagen de articulos-->
  <img src="${img}" class=".cart_img" alt="cold_darner">

  <!-- arriba -->
  <div class="info__products__car">
  
  <div class="first__part__car">
      <p>${name}</p>
      <img src="./images/Green_Rupee.png" alt="">
      <h4>${price}</h4>
    </div>
  
    <hr>
    <!-- abajo -->
    <!-- Agregar item -->
  
    <div class="second__part__car">
      <div class="add_sus">
      <span class="sign down" data-id=${id} >-</span>
      <spam>${quantity}</spam>
      <span class="sign up" data-id=${id}>+</spam>
     
      </div>
  
  <!-- Total  articulo-->
      <img src="./images/Green_Rupee.png" alt="">
      <h4>${quantity * price}</h4>
    </div>
  </div>
</div>
 
  `;
};

/* Logica para el carro */
/* Renderizar articulos del carrito */
const renderCart = (itemCart) => {
  if (!itemCart.length) {
    cartItems.innerHTML = `<p>Aún no has agregado productos en el carrito :(</p>`;
  }
  cartItems.innerHTML = itemCart.map(productToCart).join("");
};
/* Mostrar el total */
const showTotalCart = (itemCart) => {
  total.innerHTML = `${itemCart.reduce(
    (acc, cur) => acc + Number(cur.price) * cur.quantity,
    0
  )}`;
};

/* Suma y resta de artículos en el carrito */
const addSus = (e) => {
  if (e.target.classList.contains("down")) {
    const productExisting = storageCart.find(
      (article) => article.id === e.target.dataset.id
    );

    if (productExisting.quantity == 1) {
      if (window.confirm("¿No quieres llevar este artículo?")) {
        storageCart = storageCart.filter(
          (item) => item.id !== productExisting.id
        );
        saveLocalStorage(storageCart);
        renderCart(storageCart);
        showTotalCart(storageCart);
        return;
      }
    }
    storageCart = storageCart.map((item) => {
      return item.id === productExisting.id
        ? { ...item, quantity: Number(item.quantity) - 1 }
        : item;
    });
  } else if (e.target.classList.contains("up")) {
    const productExisting = storageCart.find(
      (item) => item.id === e.target.dataset.id
    );
    storageCart = storageCart.map((item) => {
      return item.id === productExisting.id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item;
    });
  }
  saveLocalStorage(storageCart);
  renderCart(storageCart);
  showTotalCart(storageCart);
};
/* Renderizar productos en el carrito */
const addProductCart = (e) => {
  if (!e.target.classList.contains("add__product")) return;
  const productObject = {
    id: e.target.dataset.id,
    name: e.target.dataset.name,
    price: e.target.dataset.price,
    img: e.target.dataset.img,
  };
  const duplicateItem = storageCart.find((item) => item.id == productObject.id);

  if (duplicateItem) {
    storageCart = storageCart.map((item) => {
      return item.id === productObject.id
        ? { ...item, quantity: Number(item.quantity) + 1 }
        : item;
    });
  } else {
    storageCart = [...storageCart, { ...productObject, quantity: 1 }];
  }
  saveLocalStorage(storageCart);
  renderCart(storageCart);
  showTotalCart(storageCart);
};
/* Confirmar compra */
const makeTheBuy = () => {
  if (storageCart.length < 1) {
    alert("Aún no es escogido nada.");
    return;
  } else if (window.confirm("¿Es un trato?")) {
    localStorage.removeItem("storageCart");
    window.location.reload();
  }
};

/* Desactivar opción de comprar */
const btnNoAvaliable = (e) => {
  if (e.target.classList.contains("vender")) {
    alert("Aún no puedo comprar tus artículos, disculpa :(");
  }
};
const aNoAvaliable = (e) => {
  if (e.target.classList.contains("vender")) {
    alert("Aún no puedo comprar tus artículos, disculpa :(");
  }
};

/* Inicializar las funciones */
const init = () => {
  document.addEventListener(
    "DOMContentLoaded",
    renderProductCard(productsData)
  );
  document.addEventListener("DOMContentLoaded", renderCart(storageCart));
  document.addEventListener("DOMContentLoaded", showTotalCart(storageCart));
  /* Renderizar los productos por categorias */
  categories.addEventListener("click", filterProductCard);
  /* Abrir y cerrar el popUp */
  containerProductItem.addEventListener("click", openPopUp);
  popUpContainer.addEventListener("click", closePopUp);
  /* Renderizado info del popUp */
  containerProductItem.addEventListener("click", renderCardInfo);
  /* Toggle Carrito */
  menuIcons.addEventListener("click", openCar);
  /* Toggle Menu */
  menuIcons.addEventListener("click", openMenu);
  /* Logica del carrito */
  popUpContainer.addEventListener("click", addProductCart);
  /*  */
  cartItems.addEventListener("click", addSus);
  /* Confirmar compra */
  confirmBuy.addEventListener("click", makeTheBuy);
  /* Pintar botones */
  categories.addEventListener("click", colorFilter);
  /* Opción comprar desactivada */
  aSell.addEventListener("click", aNoAvaliable);
  btnSell.addEventListener("click", btnNoAvaliable);
};
init();
