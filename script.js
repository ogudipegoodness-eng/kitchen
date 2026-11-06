let cart = [];

function addToCart(name, price) {
  cart.push({ name: name, price: price });
  showCart();
}

function showCart() {
  let total = 0;
  let list = '';
  cart.forEach(function (item) {
    list += '<p>' + item.name + ' - ₦' + item.price + '</p>';
    total += item.price;
  });
  document.getElementById('cart-items').innerHTML = list;
  document.getElementById('total').textContent = total;
}

function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty');
    return;
  }

  let message = "Hello Teddy's Kitchen, I want to order:\n\n";
  let total = 0;

  cart.forEach(function (item) {
    message += '- ' + item.name + ' (₦' + item.price + ')\n';
    total += item.price;
  });

  message += '\nTotal: ₦' + total;

  const url = 'https://wa.me/2349024122646?text=' + encodeURIComponent(message);
  window.open(url, '_blank');
}
function showReview(name, stars, text) {
  const card = document.createElement('div');
  card.className = 'review-card';

  const msg = document.createElement('p');
  msg.textContent = '"' + text + '"';

  const info = document.createElement('p');
  info.textContent = '★'.repeat(stars) + '☆'.repeat(5 - stars) + ' - ' + name;

  card.appendChild(msg);
  card.appendChild(info);
  document.getElementById('review-list').appendChild(card);
}

function addReview() {
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  const stars = Number(document.getElementById('reviewStars').value);

  if (name === '' || text === '') {
    alert('Please enter your name and your review');
    return;
  }

  showReview(name, stars, text);

  const saved = JSON.parse(localStorage.getItem('reviews')) || [];
  saved.push({ name: name, stars: stars, text: text });
  localStorage.setItem('reviews', JSON.stringify(saved));

  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';
}

const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
savedReviews.forEach(function (r) {
  showReview(r.name, r.stars, r.text);
});