/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = 'https://platzi-avo.vercel.app';

const app = document.querySelector('#app');

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD'
  }).format(price);

  return newPrice;
};

async function prepareApp() {
  const response = await fetch(`${baseUrl}/api/avo`);
  // 💡 More about Spread: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  const { data: avocados } = await response.json();

  // Create the HTML Nodes for each avocado we receive from the API
  // 💡 More about Array.map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const nodeArray = avocados.map(avocado => {

    // Create image node
    // <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="avatar.jpg">
    const image = document.createElement('img');
    image.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';
    image.src = `${baseUrl}${avocado.image}`;

    // Create heading
    // <h2 class="text-lg">Erin Lindford</h2>
    const title = document.createElement('h2');
    title.className = 'text-lg';
    title.textContent = avocado.name;

    // Create price
    // <div class="text-gray-600">(555) 765-4321</div>
    const price = document.createElement('div');
    price.className = 'text-gray-600';
    price.textContent = formatPrice(avocado.price);

    // Create info wrapper
    // <div class="text-center md:text-left"><price /><title /></div>
    const priceTitleWrapper = document.createElement('div');
    priceTitleWrapper.className = 'text-center md:text-left';
    priceTitleWrapper.appendChild(title);
    priceTitleWrapper.appendChild(price);

    // Create card wrapper
    // <div class="md:flex bg-white rounded-lg p-6">
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300';
    cardWrapper.appendChild(image);
    cardWrapper.appendChild(priceTitleWrapper);

    return cardWrapper;

  })

  app.append(...nodeArray);
}

prepareApp();