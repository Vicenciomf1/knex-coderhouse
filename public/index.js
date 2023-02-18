const socket = io();
function renderProducto(producto) {
  const linea = document.createElement('tr');

  //Titulo
  const titulo = document.createElement('td');
  titulo.innerHTML = producto.nombre;
  linea.appendChild(titulo);

  //precio
  const precio = document.createElement('td');
  precio.innerHTML = producto.precio;
  linea.appendChild(precio);

  //Foto
  const foto = document.createElement('td');
  const img = document.createElement('img');
  img.setAttribute("src", producto.foto);
  img.setAttribute("width", "100");

  foto.appendChild(img);
  linea.appendChild(foto);

  document.getElementById('productos').appendChild(linea);
}

socket.on('nueva-conexion', data => {
  data.forEach(producto => {
    renderProducto(producto);
  });
});

socket.on('producto', data => {
  renderProducto(data);
});

function addProduct(e) {
  const producto = {
    titulo: document.getElementById("title").value,
    precio: document.getElementById("precio").value,
    foto: document.getElementById("thumbnail").value
  };
  socket.emit('new-product', producto);
  return false;
}

function render(data) {
  document.getElementById('messages').innerHTML = data.map(({email, text, created_at}) => {
    return (`<div style="color: brown">
          <strong style="color: blue">${email}</strong> [${created_at}] :
          <em style="color: green">${text}</em> </div>`)
  }).join(" ");
}

socket.on('messages', function(data) { render(data); });

function addMessage(e) {
  const mensaje = {
    email: document.getElementById('email').value,
    text: document.getElementById('texto').value
  };
  if (mensaje.email) {
    socket.emit('new-message', mensaje);
  } else {
    alert('Favor introducir email');
  }

  return false;  // e.preventDefault();
}