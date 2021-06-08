---
layout: default
items:
  - the_gallows_farewell
---

{% for item in page.items %}

<a id="page-{{ item }}">
<div class="page-entry">
<h2 class="name"></h2>
<p class="description"></p>
<div>
</a>
<script>
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.querySelector("#page-{{ item }}").href = "https://eisoptrophobia.github.io" + data.url;
      document.querySelector("#page-{{ item }} .page-entry .name").innerText = data.name;
      document.querySelector("#page-{{ item }} .page-entry .description").innerText = data.description;
    }
  }
  xhttp.open("GET", "https://eisoptrophobia.github.io/games/{{ item }}/data.json");
  xhttp.send();
</script>

{% endfor %}
