// ambil waktu secara real

const getDate = new Date();
const getYear = getDate.getFullYear();
const getMont = getDate.getMonth() + 1;
const getDay = getDate.getDate();

function bulan(){
      if(getMont < 10 ){
            bulan = `0${getMont}`;
      } else{
            bulan = getMont
      }
      return bulan
}

function hari(){
      if (getDay < 10) {
            hari = `0${getDay}`;
      } else {
            hari = getDay;
      }
      return hari;
}

const tanggal = `${getYear}-${bulan()}-${hari()}`;

const tampilKota = document.querySelector('.judul-kota');
tampilKota.textContent = localStorage.judulkota;


function JadwalWaktuSholat() {
      fetch("https://api.myquran.com/v2/sholat/jadwal/" + parseInt(localStorage. idkota)+ "/" + tanggal)
      .then(Response => Response.json())
      .then(data => {
            const jadwal = data.data.jadwal
            document.querySelector('.imsak').textContent = jadwal.imsak;
            document.querySelector('.subuh').textContent = jadwal.subuh;
            document.querySelector('.terbit').textContent = jadwal.terbit;
            document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
            document.querySelector('.ashar').textContent = jadwal.ashar;
            document.querySelector('.maghrib').textContent = jadwal.maghrib;
            document.querySelector('.isya').textContent = jadwal.isya;
            document.querySelector('.tanggal').textContent = jadwal.tanggal;
      });
           
}

// pilih lokasi
const inputSearch = document.querySelector('.input-search');
const cardlist = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', function (){
      const valueSearch = inputSearch.value.length;

      if(valueSearch > 0){
            cardlist.classList.remove('hidden-list');
            
            fetch('https://api.myquran.com/v2/sholat/kota/semua')
               .then(response => response.json())
               .then(response => {
                  const Data = response.data;
                  let listdata = '';
                  Data.forEach( d => {
                        listdata += `<a href="#" data-idkota=" ${d.id}" id="nama-kota" class="list-group-item list-group-item-action">${d.lokasi}</a>`;

                  });
                  const lokasidata = document.querySelector('.card-list');
                  lokasidata.innerHTML = listdata;

                  // ketika kota di klik
                  const isikota = document.querySelectorAll('#nama-kota');
                  isikota.forEach( kota => {

                        const filterText = inputSearch.value.toLowerCase();
                        const itemText = kota.firstChild.textContent.toLowerCase();

                        if(itemText.indexOf(filterText) != -1 ){
                              kota.setAttribute("style", "display: block");
                        } else {
                              kota.setAttribute("style", "display: none !important");
                        }

                        kota.addEventListener('click', function(){
                              const idkota = this.dataset.idkota;
                              const Judulkota = this.textContent;
                              window.localStorage.setItem('idkota', idkota);
                              window.localStorage.setItem('judulkota', Judulkota);
                              lokasidata.classList.add('hidden-list');
                              inputSearch.value = '';
                              location.reload();
                              alert(`Kota ${judulKota} berhasil dipilih`);
                        });
                  });
            });



      } else {
            cardlist.classList.add('hidden-list');
           
      }
});




JadwalWaktuSholat();    

