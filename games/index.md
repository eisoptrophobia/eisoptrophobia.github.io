---
layout: default
items:
  - the_gallows_farewell
---
<link rel="stylesheet" href="https://eisoptrophobia.github.io/games/style.css">

{% for item in page.items %}


<div id="page-{{ item }}" class="pageentry">
    <h2 class="name"></h2>
    <p class="description"></p>
<div>
<script>
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.querySelector("#page-{{ item }}").onclick = () => {
        window.location = "https://eisoptrophobia.github.io" + data.url;
      }
      document.querySelector("#page-{{ item }} .name").innerText = data.name;
      document.querySelector("#page-{{ item }} .description").innerText = data.description;
    }
  }
  xhttp.open("GET", "https://eisoptrophobia.github.io/games/{{ item }}/data.json");
  xhttp.send();
</script>

{% endfor %}
