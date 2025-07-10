
const properties = [
    {
        id: 1,
        title: "Двустаен апартамент в София",
        city: "София",
        type: "Апартамент",
        price: 135000,
        image: "images/property1.jpg",
        description: "Светъл и просторен апартамент близо до метро."
    },
    {
        id: 2,
        title: "Къща в Пловдив",
        city: "Пловдив",
        type: "Къща",
        price: 220000,
        image: "images/property2.jpg",
        description: "Самостоятелна къща с двор и гараж."
    }
];

function renderList() {
    const container = document.getElementById("property-list");
    if (!container) return;
    container.innerHTML = "";
    const cityFilter = document.getElementById("filter-city").value;
    const typeFilter = document.getElementById("filter-type").value;

    const filtered = properties.filter(p =>
        (!cityFilter || p.city === cityFilter) &&
        (!typeFilter || p.type === typeFilter)
    );

    filtered.forEach(p => {
        const div = document.createElement("div");
        div.className = "property-card";
        div.innerHTML = \`
            <img src="\${p.image}" alt="">
            <h2>\${p.title}</h2>
            <p>\${p.city} • \${p.type}</p>
            <p><strong>\${p.price} EUR</strong></p>
            <a href="property.html?id=\${p.id}">Виж повече</a>
        \`;
        container.appendChild(div);
    });

    populateFilters();
}

function populateFilters() {
    const cities = [...new Set(properties.map(p => p.city))];
    const types = [...new Set(properties.map(p => p.type))];

    const citySelect = document.getElementById("filter-city");
    const typeSelect = document.getElementById("filter-type");

    if (citySelect && citySelect.options.length === 1) {
        cities.forEach(city => {
            const opt = document.createElement("option");
            opt.value = city;
            opt.textContent = city;
            citySelect.appendChild(opt);
        });
    }

    if (typeSelect && typeSelect.options.length === 1) {
        types.forEach(type => {
            const opt = document.createElement("option");
            opt.value = type;
            opt.textContent = type;
            typeSelect.appendChild(opt);
        });
    }
}

function renderDetails() {
    const container = document.getElementById("property-details");
    if (!container) return;
    const id = new URLSearchParams(window.location.search).get("id");
    const prop = properties.find(p => p.id == id);
    if (!prop) {
        container.innerHTML = "<p>Имотът не е намерен.</p>";
        return;
    }
    container.innerHTML = \`
        <img src="\${prop.image}" alt="" style="width:100%; max-width:600px;">
        <h2>\${prop.title}</h2>
        <p>\${prop.city} • \${prop.type}</p>
        <p><strong>\${prop.price} EUR</strong></p>
        <p>\${prop.description}</p>
    \`;
}

window.onload = () => {
    renderList();
    renderDetails();
    const f1 = document.getElementById("filter-city");
    const f2 = document.getElementById("filter-type");
    if (f1) f1.onchange = renderList;
    if (f2) f2.onchange = renderList;
};
