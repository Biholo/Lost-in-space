///////////////////////////////// THIBAULT TARAMINI ET TROUET KILIAN     TD-B   ///////////////////////////////// 
"use strict";

/////VARIABLES//////
const deplacement = 10;
var  ovni = [];
var bullets = [];
var round = 0;
var score = 1;
var jouer = true ;
var vaiseau = {
  left:260,
  top:520
};

/////FONCTION  DE JEU/////
function  gameJouer() {
  setTimeout(gameJouer, 1500/(10+score) )
 
  if (jouer == true) {
    console.log(bullets)
  moveMissile()
  delMissile()
  drawMissiles()
  delOvni()
  drawOvni()
  deplacementOvni()
  collisionMissiles()
  hitboxVaiseau()
  if (ovni.length == 0){
    round +=1
    ajouterOvni()
  }
  affciherRound()
  }
  if (jouer == false) {
    défaite()
    delMissile()
  }
 }
 function reset(){
   ovni = [];
   bullets = [];
   score = 1;
   jouer = true;
   round = 1;
   ajouterOvni()
   masqueDéfaite()
   vaiseau = {
    left:260,
    top:520};  
 }

/////AFFICHAGE/////

 function défaite() {
  var over = new Image();
  over.src = "gameOver.png"
  over.classList.add("gameOver")
  endGame.appendChild(over)
  document.getElementById('score').innerHTML = `<p class='txtjeu' style='top:437px; left:370px'> ${score-1}</p>`;
  }

  function affciherRound() {
    document.getElementById('round').innerHTML = `<p class='txtjeu' style='top:-25px; left:213px'> Round ${round}</p>`;
  }
 
function masqueDéfaite()
{
  document.getElementById('endGame').innerHTML = `<div class='opac'></div>`;
  document.getElementById('score').innerHTML = `<p class='opac'></p>`;
}

function drawVaiseau() {
  document.getElementById('vaiseau').style.left = vaiseau.left + 'px';
  document.getElementById('vaiseau').style.top = vaiseau.top + 'px';
}

function drawOvni() {
  document.getElementById('extra').innerHTML = ""
  for(let i = 0 ; i < ovni.length ; i++ ) {
    document.getElementById('extra').innerHTML += `<div class='extra' style='left:${ovni[i].left}px; top:${ovni[i].top}px'></div>`;
  }
}

function drawMissiles() {
  document.getElementById('missile').innerHTML = "" // Pour supprimer les anciens extraterrestres, On supprime le contenue de la balise ayant l'ID 'missile'
  for(let i = 0 ; i < bullets.length ; i++ ) {
    document.getElementById('missile').innerHTML += `<div class='missile' style='left:${bullets[i].left}px; top:${bullets[i].top}px'></div>`;
  }
}

////////VAISSEAU//////
function hitboxVaiseau() {
  for(let i = 0 ; i< ovni.length ; i++){
    if (vaiseau.left - 27 < ovni[i].left && ovni[i].left < vaiseau.left + 27 && vaiseau.top - 24.5 <ovni[i].top  &&  ovni[i].top< vaiseau.top + 24.5 ){
        jouer = false 
    }
    
  }
  for(let i = 0 ; i< bullets.length ; i++){
    if (vaiseau.left - 27 < bullets[i].left && bullets[i].left < vaiseau.left + 27 && vaiseau.top - 24.5 <bullets[i].top   &&  bullets[i].top < vaiseau.top + 24.5 ){
      jouer = false
    }
  }
}

//////EXTRATERRESTRE//////
function ajouterOvni(){
  for(let i = 1; i < 9 ; i++ ) {
    for( let j = 1; j < 3; j++){
    let ajoutX = 60 * i;
    let  ajoutY = 70 * j;
    let vit = 5;
    if (ajoutX > 290){
      vit = vit * -1
    }
    ovni.push({ left: 20 + ajoutX, top: 20 + ajoutY, vitesseX: vit, vitesseY:2})  
  }
 }
}


function deplacementOvni() {
  for( let i = 0; i < ovni.length ; i++){
    ovni[i].left += ovni[i].vitesseX  
    ovni[i].top += ovni[i].vitesseY 
  
  if (ovni[i].left < 12.5 || ovni[i].left > 587.5) {
    ovni[i].vitesseX = ovni[i].vitesseX * -1 
    }
  if (ovni[i].top < 18 || ovni[i].top > 582) {
    ovni[i].vitesseY = ovni[i].vitesseY * -1.1
    }
  }
}

function delOvni(){
  for( let i = 0; i < ovni.length; i++){
    if (ovni[i].left < -20){
      ovni.splice(i, 1)
    }
  }
}

/////MISSILE/////
function collisionMissiles() {
  for(let i = 0 ; i < bullets.length ; i++ ) {
    for(let j = 0 ; j < ovni.length ; j++){
       if(ovni[j].left - 13 < bullets[i].left && bullets[i].left < ovni[j].left + 13 && ovni[j].top - 18 < bullets[i].top -13  &&  bullets[i].top - 13< ovni[j].top + 18 ){
      ovni[j].left =-150
      bullets[i].left = -50
      score += 1 //augmente de 1 le score lorsqu'on touche un extraterrestre
      }
    }
  } 
}



function moveMissile() {
  for(let i = 0 ; i < bullets.length ; i++ ) {
    bullets[i].deplacementB = bullets[i].deplacementB * 0.99
      bullets[i].top = bullets[i].top - bullets [i].deplacementB
  }
}

function delMissile() {
  for(let l = 0 ; l < bullets.length ; l++) {
    bullets[l].durer = bullets[l].durer - bullets[l].deplacementB
    if (bullets[l].top < 7 || bullets[l].durer < 0 ) {
      bullets.splice(l, 1)  
    }   
  }
}

window.onload = function() {
  gameJouer()

/////////////////////// DEPLACEMENT //////////////////////
document.addEventListener("keydown", function(e) {
 if ((e.key == 's' || e.key =='ArrowDown' || e.key =='S') && vaiseau.top< 550) {
   //BAS
  vaiseau.top = vaiseau.top + deplacement
 } 

 if ((e.key == 'z'|| e.key == 'ArrowUp' || e.key == 'Z') && vaiseau.top>10) {
   // HAUT
  vaiseau.top = vaiseau.top - deplacement
 }

 if ((e.key == 'd'|| e.key == 'ArrowRight' || e.key == 'D') && vaiseau.left<550) {
  // Drotie
  vaiseau.left = vaiseau.left + deplacement
 }

 if ((e.key == 'q' ||e.key == 'ArrowLeft' || e.key == 'Q') && vaiseau.left>10) {
   //Gauche
  vaiseau.left = vaiseau.left - deplacement
 }
 if (e.code == 'Space' ) {  
  bullets.push({
    left: vaiseau.left + 22 ,
    top: vaiseau.top - 20,
    durer: 300,
    deplacementB: 8
  })
  drawMissiles()
 }
 if (e.key == 'Enter' ){
   if (jouer == false){
    reset()
   }
 }
 
 drawVaiseau()
 });

}//fin onload



