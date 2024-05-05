export const PRODUCTS = new Map();

export async function populateProductsMap() {
  try {
    const response_all = await fetch('http://localhost:3000/products/');
    const allProducts = await response_all.json();

    const response_waterFert = await fetch('http://localhost:3000/products/type/water column fertilizer');
    const waterFertProducts = await response_waterFert.json();

    const response_substrateFert = await fetch('http://localhost:3000/products/type/substrate fertilizer');
    const substrateFertProducts = await response_substrateFert.json();

    PRODUCTS.set(`all`, allProducts);
    PRODUCTS.set(`waterFert`, waterFertProducts);
    PRODUCTS.set(`substrateFert`, substrateFertProducts);
  } catch (e) {
    console.error(e);
  }
}

export default { products: PRODUCTS, populateProductsMap };