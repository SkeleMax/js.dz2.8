export function productCardTemplate(product) {
  return `
    <li class="product-item" data-id="${product.id}"> 
      <h2 class="name">${product.name}</h2> 
      <p class="price">Price: $${product.price}</p> 
      <p class="description">${product.description}</p>
      <button class="delete-btn">Видалити</button>
    </li>
  `;
}