const API_URL = "https://diagnostico-fggf.onrender.com/auth/login";


document.getElementById("btnLogin").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!username || !password) {
    mensaje.textContent = "Por favor ingrese usuario y contraseña.";
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }) // <-- enviar JSON
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("usuario", data.user);
      window.location.href = "busqueda.html";
    } else {
      mensaje.textContent = "Credenciales incorrectas.";
    }
  } catch (error) {
    mensaje.textContent = "Error al conectar con el servidor.";
    console.error(error);
  }
});
