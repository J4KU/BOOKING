
const DB = [];
createRoom();
function setupRoom(){
const letters = 
["A", "B", "C", "D", "F", "G", "H", "I", "J", "K", "L"];
const rows = 10;
const seats = 7;
return{
  letters, rows, seats
};
}

function createRoom() {
  const setup = setupRoom();
  document.querySelector(".cinema-rows-container").innerHTML = "";

  for (let i = 0; i < setup.rows; i++) {
    document.querySelector('.cinema-rows-container').innerHTML += `<div class="d-flex justify-content-around ${setup.letters[i]}">
        <div class="seats">${setup.letters[i]}</div>`;
    for (let s = 1; s < setup.seats; s++) {
      const indexObject = DB.findIndex((object)=>{
        return object.seatCode == setup.letters[i]+s;
      });

      document.querySelector(
        `.${setup.letters[i]}`
      ).innerHTML += `<div class="seats ${indexObject> -1? 'seat-busy':''}" onclick="selectSeat('${setup.letters[i]}',${s})">${s}</div>`
    }
    document.querySelector('.cinema-rows-container').innerHTML += `</div>`;
  }
}

function selectSeat(letter, numberSeat) {
  document.querySelector(
    ".title-form"
  ).innerHTML = `La silla seleccionada es: ${letter + numberSeat}`;
  document.querySelector(
    ".reserve-button"
  ).innerHTML = `<button type="button" class="btn btn-success mt-3" onclick="reserve('${letter}', ${numberSeat})">Reservar ${letter + seats}</button>`;
}

function reserve(letter, numberSeat) {
  const fullName = document.querySelector(".full-name").value;
  const cc = document.querySelector(".cc").value;
  /* const seatCode = letter + numberSeat; */

  
    
  DB.push({fullName, cc, letter, numberSeat, 
  seatCode: letter + numberSeat,
  });
  
  reserveTable();
  createRoom();

  document.querySelector('.full-name').value = ""
  document.querySelector('.cc').value = "";
}

function reserveTable(){
  document.querySelector('.table tbody').innerHTML = "";
  for (let i = 0; i< DB.length; i++){
    document.querySelector('.table tbody').innerHTML += `<tr><td>${DB[i].seatCode}</td><td>${DB[i].cc}</td><td>${DB[i].fullName}</td><td> <button type="button" class="btn" onclick="deleteReservation('${DB[i].seatCode}')"><i class="bi bi-trash-fill"></i></button></td></tr>`;
  }

}

function deleteReservation(seatCode){
  const indexObject = DB.findIndex((object)=>{
    return object.seatCode == seatCode; 
  });
  DB.splice(indexObject, 1);

  reserveTable();
  createRoom();

}

//   const persons = [
//     { name: "Karen", age: 19 },
//     { name: "Toño", age: 40 },
//     { name: "Yamile", age: 25 },
//   ];
//   persons[1].name;

//   for (let index = 0; index < persons.length; index++) {
//     console.log(person[index].name)
//   }
