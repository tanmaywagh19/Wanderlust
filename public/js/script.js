// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


// Maps
const locationIcon = L.icon({
    iconUrl: "/images/location-dot-solid.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

const mapElement = document.getElementById("map");

const coordinates = JSON.parse(mapElement.dataset.coordinates);
const listingLocation = mapElement.dataset.location;

const map = L.map("map").setView(
    [coordinates[1], coordinates[0]],
    13
);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([
    coordinates[1],
    coordinates[0]
],{icon:locationIcon}).addTo(map);

marker.bindPopup(`
    <p>
        <b>${listingLocation}</b><br>
        Exact location will be provided after booking
    </p>
`).openPopup();