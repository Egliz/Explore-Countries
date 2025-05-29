window.onload = function() {
    searchCountry("japan");
  };
  
  function searchCountry(customName) {
    const nameCountry = customName || document.getElementById("countryInput").value.toLowerCase();
    const url = `https://restcountries.com/v3.1/name/${nameCountry}`;  
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then(data => {
        const country = data[0];
        const name = country.name.common;
        const capital = country.capital ? country.capital[0] : "No disponible";
        const population = country.population.toLocaleString();
        const languages = Object.values(country.languages).join(", ");
        const flag = country.flags.png;
        const lat = country.latlng[0];
        const lng = country.latlng[1];
      
        const mapa = `
          <h3>location on the map:</h3>
          <iframe 
            width="100%" 
            height="300" 
            frameborder="0"
            style="border:0; margin-top: 10px;"
            src="https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=5&output=embed"
            allowfullscreen>
          </iframe>
          <br/>
          <small><a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank">Ver en Google Maps</a></small>
        `;
      
        const resultDiv = document.getElementById("result");
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `
          <h2>${name}</h2>
          <p><strong>Capital:</strong> ${capital}</p>
          <p><strong>Population:</strong> ${population}</p>
          <p><strong>Languages:</strong> ${languages}</p>
          <img src="${flag}" alt="Bandera de ${name}">
          ${mapa}
        `;
      })
      
      .catch(error => {
        document.getElementById("result").innerHTML = `<p>${error.message}</p>`;
      });
  }
  