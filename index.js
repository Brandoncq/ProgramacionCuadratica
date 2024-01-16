var valoresRestricciones_ = [];
const epsilon = 1e-10; 
function generarCampos() {
        event.preventDefault()
        var numeroRestricciones = document.getElementById("numero-restricciones").value;
        var camposGeneradosDiv = document.getElementById("campos-generados");
        valoresRestricciones_ = []
        camposGeneradosDiv.innerHTML = "";

        for (var i = 1; i <= numeroRestricciones; i++) {
            var restriccionLabel = document.createElement("label");
            restriccionLabel.innerHTML = "Restricción " + i + ": ";

            var inputX1 = document.createElement("input");
            inputX1.type = "number";
            inputX1.id = "x1-restriccion" + i;
            inputX1.required = true;

            var signoLabel = document.createElement("label");
            signoLabel.innerHTML = "&nbsp;x\u2081&nbsp;&nbsp;+&nbsp;&nbsp;";

            var inputX2 = document.createElement("input");
            inputX2.type = "number";
            inputX2.id = "x2-restriccion" + i;
            inputX2.required = true;

            var operadorLabel = document.createElement("label");
            operadorLabel.innerHTML =  "&nbsp;x\u2082&nbsp;&nbsp;";
            
            var espacio = document.createElement("label");
            espacio.innerHTML =  "&nbsp;&nbsp;";
            
            const select = document.createElement('select');
            const opciones = ['<=', '>=', '='];

            opciones.forEach(opcion => {
              const option = document.createElement('option');
              option.value = opcion;
              option.textContent = opcion;
              select.appendChild(option);
            });

            var inputNumero = document.createElement("input");
            inputNumero.type = "number";
            inputNumero.id = "numero-restriccion" + i;
            inputNumero.required = true;

            camposGeneradosDiv.appendChild(restriccionLabel);
            camposGeneradosDiv.appendChild(inputX1);
            camposGeneradosDiv.appendChild(signoLabel);
            camposGeneradosDiv.appendChild(inputX2);
            camposGeneradosDiv.appendChild(operadorLabel);
            camposGeneradosDiv.appendChild(select)
            camposGeneradosDiv.appendChild(espacio);
            camposGeneradosDiv.appendChild(inputNumero);
            camposGeneradosDiv.appendChild(document.createElement("br"));

            valoresRestricciones_.push({
                x1: inputX1,
                x2: inputX2,
                restrinccion: select,
                numero: inputNumero
            });
        }
}
function verificarConsistencia(valoresRestricciones){
  let comparacion = {"x1":[0,0],"x2":[0,0]}
  for(let i=0;i<valoresRestricciones.length;i++){

    if(valoresRestricciones[i].x1.value!=0){
      comparacion.x1[1] = valoresRestricciones[i].numero.value/valoresRestricciones[i].x1.value
    }
    if(valoresRestricciones[i].x2.value!=0){
      comparacion.x2[1] = valoresRestricciones[i].numero.value/valoresRestricciones[i].x2.value
    }
    
  }
  for(restricciones of valoresRestricciones){
    if(restricciones.restrinccion.value=='<='){
      if(restricciones.numero.value/restricciones.x1.value < comparacion.x1[1]){
        comparacion.x1[1]=restricciones.numero.value/restricciones.x1.value
      }
      if(restricciones.numero.value/restricciones.x2.value<comparacion.x2[1]){
        comparacion.x2[1]=restricciones.numero.value/restricciones.x2.value
      }
    }
    if(restricciones.restrinccion.value=='>='){
      if(restricciones.numero.value/restricciones.x1.value>comparacion.x1[1]){
        comparacion.x1[0]=restricciones.numero.value/restricciones.x1.value
      }
      if(restricciones.numero.value/restricciones.x2.value>comparacion.x2[1]){
        comparacion.x2[0]=restricciones.numero.value/restricciones.x2.value
      }
    }
  }
  let flag= true
  if(comparacion.x1[0]>comparacion.x1[1] || comparacion.x1[0]<0 || comparacion.x1[1]<0 || valoresRestricciones.length < 0){
    flag= false
  }
  if(comparacion.x2[0]>comparacion.x2[1] || comparacion.x2[0]<0 || comparacion.x2[1]<0){
    flag= false
  }

  return flag
}
function Maximizar(a, vbasica, standard) {
  let container = document.querySelector('.container')

  let divtitle = document.createElement('div')
  divtitle.classList.add('title')
  var h1title = document.createElement('h1')
  h1title.textContent="Planteamiento"
  divtitle.appendChild(h1title);
  container.appendChild(divtitle)

  let divA = document.createElement('div')

  var tablaQ = document.createElement('table')
  var h2Q = document.createElement('h2')
  h2Q.textContent = "Q = "
  divA.classList.add('matrices')
  for(let i=0;i<2;i++){
    var fila = document.createElement('tr')
    for(let j=0;j<2;j++){
      var celda = document.createElement('td')
      celda.textContent = a[i+1][j];
      fila.appendChild(celda)
    }
    tablaQ.appendChild(fila)
  }
  var tablac = document.createElement('table')
  var h2c = document.createElement('h2')
  h2c.textContent = "c = "
  var filac = document.createElement('tr')
  for(let i=0;i<2;i++){
    var celdac = document.createElement('td')
    celdac.textContent = a[i+1][a[0].length-1];
    filac.appendChild(celdac)
  }
  tablac.appendChild(filac)

  var tablax = document.createElement('table')
  var h2x = document.createElement('h2')
  h2x.textContent = "x = "
  for(let k=0;k<2;k++){
    var filax = document.createElement('tr')
    var celdax = document.createElement('td')
    celdax.textContent = "x"+(k+1)
    filax.appendChild(celdax)
    tablax.appendChild(filax)
  }
  
  divA.appendChild(h2c)
  divA.appendChild(tablac)

  divA.appendChild(h2x)
  divA.appendChild(tablax)
  
  divA.appendChild(h2Q)
  divA.appendChild(tablaQ)
  container.appendChild(divA)

  let divB = document.createElement('div')
  var tablaA = document.createElement('table')
  var h2A = document.createElement('h2')
  divB.classList.add('matrices')
  h2A.textContent = "A = "
  divA.classList.add('matrices')
  for(let i=3;i<a.length;i++){
    var filaA = document.createElement('tr')
    for(let j=0;j<2;j++){
      var celdaA = document.createElement('td')
      celdaA.textContent = a[i][j]
      filaA.appendChild(celdaA)
    }
    tablaA.appendChild(filaA)
  }
  divB.appendChild(h2A)
  divB.appendChild(tablaA)

  var tablab = document.createElement('table')
  var h2b = document.createElement('h2')
  h2b.textContent = "b = "
  divA.classList.add('matrices')
  for(let i=3;i<a.length;i++){
    var filab = document.createElement('tr')
    var celdab = document.createElement('td')
    celdab.textContent = a[i][a[0].length-1]
    filab.appendChild(celdab)
  }
  tablab.appendChild(filab)

  divB.appendChild(h2b)
  divB.appendChild(tablab)

  var br = document.createElement('br')
  container.appendChild(divB)
  
  container.appendChild(br)
  container.appendChild(br)
  let div = document.createElement('div')
  div.classList.add('title')
  var h2 = document.createElement('h1')
  h2.textContent="Procedimiento"
  div.appendChild(h2);
  container.appendChild(div)
  let num = 1
  let selecccionado = []
  graficarMatriz(a,vbasica,selecccionado,standard)
  while (a[0].slice(0, -1).some(coeficiente => coeficiente > 0)){
    
    let indiceMenor = a[0].slice(0, -1).indexOf(Math.max(...a[0].slice(0, -1)));
    const indice_fila = pivote(a, indiceMenor);
    selecccionado = [indice_fila,indiceMenor]
    let divaux = document.createElement('div')
    divaux.classList.add('title')
    var h2 = document.createElement('h2')
    h2.textContent="Iteración "+num
    num++
    divaux.appendChild(h2);
    container.appendChild(divaux)
    
    graficarMatriz(a,vbasica,selecccionado,standard)
    if (indice_fila === -1) {
      return resultado(a, vbasica,standard)
    }
    if (indiceMenor >= 0) {
      vbasica[indice_fila] = standard[indiceMenor];
    }
    const valor =a[indice_fila][indiceMenor]
    if (indice_fila >= 0 && indice_fila < a.length) {
      for (let i = 0; i < a[0].length; i++) {
        
        a[indice_fila][i] = a[indice_fila][i] / valor;
      }
    }
    let factores = []
    for (let i = 0; i < a.length; i++) {
      factores.push(a[i][indiceMenor])
    }
    for (let i = 0; i < a.length; i++) {
      if (i !== indice_fila && i >= 0 && i < a.length && factores[i]!=0) {
        for (let k = 0; k < a[0].length; k++) {
          a[i][k] -= factores[i] * a[indice_fila][k];
        }
      }
    }
    selecccionado = []
    graficarMatriz(a,vbasica,selecccionado,standard)
  }
  resultado(a, vbasica,standard)
}
function simplex(a, vbasica, standard) {
  let container = document.querySelector('.container')

  let divtitle = document.createElement('div')
  divtitle.classList.add('title')
  var h1title = document.createElement('h1')
  h1title.textContent="Planteamiento"
  divtitle.appendChild(h1title);
  container.appendChild(divtitle)

  let divA = document.createElement('div')

  var tablaQ = document.createElement('table')
  var h2Q = document.createElement('h2')
  h2Q.textContent = "Q = "
  divA.classList.add('matrices')
  for(let i=0;i<2;i++){
    var fila = document.createElement('tr')
    for(let j=0;j<2;j++){
      var celda = document.createElement('td')
      celda.textContent = a[i+1][j];
      fila.appendChild(celda)
    }
    tablaQ.appendChild(fila)
  }
  var tablac = document.createElement('table')
  var h2c = document.createElement('h2')
  h2c.textContent = "c = "
  var filac = document.createElement('tr')
  for(let i=0;i<2;i++){
    var celdac = document.createElement('td')
    celdac.textContent = a[i+1][a[0].length-1];
    filac.appendChild(celdac)
  }
  tablac.appendChild(filac)

  var tablax = document.createElement('table')
  var h2x = document.createElement('h2')
  h2x.textContent = "x = "
  for(let k=0;k<2;k++){
    var filax = document.createElement('tr')
    var celdax = document.createElement('td')
    celdax.textContent = "x"+(k+1)
    filax.appendChild(celdax)
    tablax.appendChild(filax)
  }
  
  divA.appendChild(h2c)
  divA.appendChild(tablac)

  divA.appendChild(h2x)
  divA.appendChild(tablax)
  
  divA.appendChild(h2Q)
  divA.appendChild(tablaQ)
  container.appendChild(divA)

  let divB = document.createElement('div')
  var tablaA = document.createElement('table')
  var h2A = document.createElement('h2')
  divB.classList.add('matrices')
  h2A.textContent = "A = "
  divA.classList.add('matrices')
  for(let i=3;i<a.length;i++){
    var filaA = document.createElement('tr')
    for(let j=0;j<2;j++){
      var celdaA = document.createElement('td')
      celdaA.textContent = a[i][j];
      filaA.appendChild(celdaA)
    }
    tablaA.appendChild(filaA)
  }
  divB.appendChild(h2A)
  divB.appendChild(tablaA)

  var tablab = document.createElement('table')
  var h2b = document.createElement('h2')
  h2b.textContent = "b = "
  divA.classList.add('matrices')
  for(let i=3;i<a.length;i++){
    var filab = document.createElement('tr')
    var celdab = document.createElement('td')
    celdab.textContent = a[i][a[0].length-1]
    filab.appendChild(celdab)
  }
  tablab.appendChild(filab)

  divB.appendChild(h2b)
  divB.appendChild(tablab)
  var br = document.createElement('br')

  container.appendChild(divB)
  container.appendChild(br)
  container.appendChild(br)

  let div = document.createElement('div')
  div.classList.add('title')
  var h1 = document.createElement('h1')
  h1.textContent="Procedimiento"
  div.appendChild(h1);
  container.appendChild(div)
  let num = 1
  let selecccionado = []
  graficarMatriz(a,vbasica,selecccionado,standard)
  while (a[0].slice(0, -1).some(coeficiente => coeficiente < -epsilon)){
    
    let indiceMenor = a[0].slice(0, -1).indexOf(Math.min(...a[0].slice(0, -1)));
    const indice_fila = pivote(a, indiceMenor);
    selecccionado = [indice_fila,indiceMenor]
    let divaux = document.createElement('div')
    divaux.classList.add('title')
    var h2 = document.createElement('h2')
    h2.textContent="Iteración "+num
    num++
    divaux.appendChild(h2);
    container.appendChild(divaux)

    graficarMatriz(a,vbasica,selecccionado,standard)
    if (indice_fila === -1) {
      return resultado(a, vbasica,standard)
    }
    if (indiceMenor >= 0) {
      vbasica[indice_fila] = standard[indiceMenor];
    }
    const valor =a[indice_fila][indiceMenor]
    if (indice_fila >= 0 && indice_fila < a.length) {
      for (let i = 0; i < a[0].length; i++) {
        
        a[indice_fila][i] = a[indice_fila][i] / valor;
      }
    }
    let factores = []
    for (let i = 0; i < a.length; i++) {
      factores.push(a[i][indiceMenor])
    }
    for (let i = 0; i < a.length; i++) {
      if (i !== indice_fila && i >= 0 && i < a.length && factores[i]!=0) {
        for (let k = 0; k < a[0].length; k++) {
          a[i][k] -= factores[i] * a[indice_fila][k];
        }
      }
    }
    selecccionado = []
    graficarMatriz(a,vbasica,selecccionado,standard)
    
  }
  resultado(a, vbasica,standard)
}

function pivote(a, indiceMenor) {
  const array = [];
  for (let j = 0; j < a.length; j++) {
    if (j !== 0 && a[j][indiceMenor] !== 0) {
      let analizar = a[j][a[0].length - 1] / a[j][indiceMenor];
      if (analizar > 0) {
        array.push(analizar);
      }
    }
  }
  if (array.length === 0) {
    return -1;
  }
  let fila = array.indexOf(Math.min(...array));
  for (let i = 1; i < a.length; i++) {
    if (a[i][indiceMenor] != 0) {
      let analizar = a[i][a[0].length - 1] / a[i][indiceMenor];
      if (analizar > 0 && analizar === array[fila]) {
        return i;
      }
    }
  }
  return -1;
}
function graficarMatriz(matriz_resuelto, resultados,select,standard) {
  if (matriz_resuelto) {
    var filas = matriz_resuelto.length;
    var columnas = matriz_resuelto[0].length;

    var tabla = document.createElement('table');

    
      var fila = document.createElement('tr');
      
      for (var j = 0; j < columnas-1; j++) {
        var celda = document.createElement('td');
        celda.textContent = standard[j];
        fila.appendChild(celda);
      }
      var celda = document.createElement('td');
      celda.textContent = "Solución";
      fila.appendChild(celda);
      tabla.appendChild(fila);
    

    for (var i = 0; i < filas; i++) {
      
      var fila = document.createElement('tr');
      

      for (var j = 0; j < columnas; j++) {
        var celda = document.createElement('td');
        if (matriz_resuelto[i][j] === Math.round(matriz_resuelto[i][j])) {
          celda.textContent = matriz_resuelto[i][j];
        } else {
          celda.textContent = matriz_resuelto[i][j].toFixed(2);
        }
        if(select[0]==i && select[1]==j){
          celda.style.backgroundColor = "black";
          celda.style.color = "white";
          celda.style.borderRadius = "0";
        }
        fila.appendChild(celda);
      }

      tabla.appendChild(fila);
    }

    var tablaResultados = document.createElement('table');

    var fila = document.createElement('tr');

    var celdaResuelto = document.createElement('td');
    celdaResuelto.textContent = "V. Básica"
    fila.appendChild(celdaResuelto);

    tablaResultados.appendChild(fila);

    for (var i = 0; i < filas; i++) {
      var fila = document.createElement('tr');

      var celdaResuelto = document.createElement('td');
      celdaResuelto.textContent = resultados[i]
      fila.appendChild(celdaResuelto);

      tablaResultados.appendChild(fila);
    }
    let tablero = document.createElement('div');
    tablero.classList.add("tables")
    tablero.appendChild(tablaResultados);
    tablero.appendChild(tabla);
    let container = document.querySelector('.container');
    container.appendChild(tablero);
  }
}
function resultado(matriz_resuelto, resultados,standard){
  let container = document.querySelector('.results');
  container.innerHTML=""
  let div = document.createElement('div')
  div.classList.add('centrar')
  var h1 = document.createElement('h1')
  h1.textContent="Resultados"
  div.appendChild(h1);
  for (var i = 1; i < matriz_resuelto.length; i++) { 
    var h3 = document.createElement('h2')
    h3.textContent+=resultados[i]+" ➞ "
    h3.textContent+=" = "+matriz_resuelto[i][matriz_resuelto[0].length-1].toFixed(3)
    div.appendChild(h3);
  }
  container.appendChild(div)
}

function calcularZ() {
    event.preventDefault()
    var coeficienteA = parseFloat(document.getElementById('a').value);
    var coeficienteB = parseFloat(document.getElementById('b').value);
    var coeficienteC = parseFloat(document.getElementById('c').value);
    var coeficienteD = parseFloat(document.getElementById('d').value);
    var coeficienteE = parseFloat(document.getElementById('e').value);
    let testing =[]
    let filas = []
    let valoresRestricciones = [];
    for (let restringido of valoresRestricciones_) {
      valoresRestricciones.push({
        x1: parseFloat(restringido.x1.value),
        x2: parseFloat(restringido.x2.value),
        numero: parseFloat(restringido.numero.value)
      });
    }
    let tipo = document.querySelector('.tipo')
    if(tipo.value=='Maximizar'){
      filas.push(-coeficienteD * 2 - coeficienteC)
      filas.push(-coeficienteC - 2 * coeficienteE)
    }else{
      filas.push(coeficienteD * 2 + coeficienteC)
      filas.push(coeficienteC + 2 * coeficienteE)
    }

    
    for(let i=0;i<valoresRestricciones.length;i++){
      if(tipo.value=='Maximizar'){
        filas.push(parseFloat(valoresRestricciones[i].x1)+parseFloat(valoresRestricciones[i].x2))
      }else{
        filas.push(-parseFloat(valoresRestricciones[i].x1)-parseFloat(valoresRestricciones[i].x2))
      }
    }
    if(tipo.value=='Maximizar'){
      filas.push(-1)
      filas.push(-1)
    }else{
      filas.push(1)
      filas.push(1)
    }
    
    for(let i=0;i<valoresRestricciones.length;i++){
      filas.push(0)
    }
    filas.push(0)
    filas.push(0)
    if(tipo.value=='Maximizar'){
      filas.push(coeficienteA+coeficienteB)
    }else{
      filas.push(-coeficienteA-coeficienteB)
    }
    

    testing.push(filas)

    filas = []
    filas.push(-coeficienteD * 2)
    filas.push(-coeficienteC)
    for(let i=0;i<valoresRestricciones.length;i++){
      filas.push(parseFloat(valoresRestricciones[i].x1))
    }
    filas.push(-1)
    filas.push(0)
    for(let i=0;i<valoresRestricciones.length;i++){
      filas.push(0)
    }
    filas.push(1)
    filas.push(0)
    filas.push(coeficienteA)
    testing.push(filas)
    
    filas = []
    filas.push(-coeficienteC)
    filas.push(-2 * coeficienteE)
    for(let i=0;i<valoresRestricciones.length;i++){
      filas.push(parseFloat(valoresRestricciones[i].x2))
    }
    filas.push(0)
    filas.push(-1)
    for(let i=0;i<valoresRestricciones.length;i++){
      filas.push(0)
    }
    filas.push(0)
    filas.push(1)
    filas.push(coeficienteB)
    testing.push(filas)

    for(let i=0;i<valoresRestricciones.length;i++){
      filas = []
      filas.push(parseFloat(valoresRestricciones[i].x1))
      filas.push(parseFloat(valoresRestricciones[i].x2))
      for(let k=0;k<2+valoresRestricciones.length;k++){
        filas.push(0)
      }
      for(let j=0;j<valoresRestricciones.length;j++){
        if(i==j){
          filas.push(1)
        }else{filas.push(0)}
      }
      filas.push(0)
      filas.push(0)
      filas.push(parseFloat(valoresRestricciones[i].numero))
      testing.push(filas)
    }
    let nuevaC = ["x\u2081", "x\u2082"]
    for(let i=1;i<=valoresRestricciones.length;i++){
      nuevaC.push(`u${String.fromCharCode(8320 + i)}`)
    }
    nuevaC.push("y\u2081")
    nuevaC.push("y\u2082")
    for(let i=1;i<=valoresRestricciones.length;i++){
      nuevaC.push(`V${String.fromCharCode(8320 + i)}`)
    }
    nuevaC.push("z\u2081")
    nuevaC.push("z\u2082")
    let entrantes = ["z", "z\u2081", "z\u2082"]
    for(let i=1;i<=valoresRestricciones.length;i++){
      entrantes.push(`V${String.fromCharCode(8320 + i)}`)
    }
    let tables = document.querySelector('.container')
    tables.innerHTML = ""
    if(verificarConsistencia(valoresRestricciones_)){
      if(tipo.value=='Maximizar'){
        Maximizar(testing,entrantes,nuevaC)
      }else{
        simplex(testing,entrantes,nuevaC)
      }
    }
}