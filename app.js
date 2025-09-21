// app.js
let amigos = [];
let amigosSorteados = [];
let sorteoRealizado = false;

function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombre = inputAmigo.value.trim();
    
    // Validar entrada
    if (nombre === '') {
        alert('Por favor, ingresa un nombre válido');
        return;
    }
    
    // Si ya se realizó un sorteo, reiniciar
    if (sorteoRealizado) {
        reiniciarSorteo();
    }
    
    // Agregar a la lista
    amigos.push(nombre);
    
    // Actualizar la visualización
    actualizarListaAmigos();
    
    // Limpiar el campo de entrada
    inputAmigo.value = '';
    inputAmigo.focus();
}

function actualizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    listaAmigos.innerHTML = '';
    
    if (amigos.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No hay amigos en la lista';
        li.classList.add('lista-vacia');
        listaAmigos.appendChild(li);
        return;
    }
    
    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        
        // Verificar si el amigo ya fue sorteado
        if (amigosSorteados.includes(amigo)) {
            li.innerHTML = `<span class="sorteado">${amigo} ✅</span>`;
        } else {
            li.textContent = amigo;
        }
        
        listaAmigos.appendChild(li);
    });
}

function sortearAmigo() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    // Validar que haya amigos en la lista
    if (amigos.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No hay amigos en la lista para sortear';
        resultado.appendChild(li);
        return;
    }
    
    // Filtrar amigos que no han sido sorteados
    const amigosDisponibles = amigos.filter(amigo => !amigosSorteados.includes(amigo));
    
    if (amigosDisponibles.length === 0) {
        const li = document.createElement('li');
        li.textContent = '¡Todos los amigos ya han sido sorteados!';
        resultado.appendChild(li);
        
        // Mostrar botón de reinicio
        const botonReinicio = document.createElement('button');
        botonReinicio.textContent = 'Reiniciar Sorteo';
        botonReinicio.classList.add('button-reiniciar');
        botonReinicio.onclick = reiniciarSorteo;
        resultado.appendChild(botonReinicio);
        return;
    }
    
    // Realizar el sorteo aleatorio entre los disponibles
    const indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);
    const amigoSeleccionado = amigosDisponibles[indiceAleatorio];
    
    // Agregar a la lista de sorteados
    amigosSorteados.push(amigoSeleccionado);
    sorteoRealizado = true;
    
    // Mostrar el resultado con animación
    mostrarResultadoConAnimacion(amigoSeleccionado);
    
    // Actualizar la lista para mostrar quiénes ya fueron sorteados
    actualizarListaAmigos();
}

function mostrarResultadoConAnimacion(amigoSeleccionado) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    // Crear elemento de resultado
    const li = document.createElement('li');
    li.textContent = `¡El amigo secreto es: ${amigoSeleccionado}!`;
    li.classList.add('resultado-animado');
    resultado.appendChild(li);
    
    // Agregar botón para continuar
    const botonContinuar = document.createElement('button');
    botonContinuar.textContent = 'Continuar';
    botonContinuar.classList.add('button-continuar');
    botonContinuar.onclick = function() {
        li.style.animation = 'none';
    };
    resultado.appendChild(botonContinuar);
}

function reiniciarSorteo() {
    amigosSorteados = [];
    sorteoRealizado = false;
    actualizarListaAmigos();
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    const mensaje = document.createElement('li');
    mensaje.textContent = 'Sorteo reiniciado. Puedes realizar un nuevo sorteo.';
    resultado.appendChild(mensaje);
    
    // Ocultar mensaje después de 2 segundos
    setTimeout(() => {
        resultado.innerHTML = '';
    }, 2000);
}

// Agregar funcionalidad de tecla Enter para agregar nombres
document.addEventListener('DOMContentLoaded', function() {
    const inputAmigo = document.getElementById('amigo');
    
    inputAmigo.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarAmigo();
        }
    });
    
    // Enfocar el campo de entrada al cargar la página
    inputAmigo.focus();
});