---
layout: default
items:
  - the_gallows_farewell
  - B
  - C
  - D
---

{% for item in page.items %}

<div id="page-{{ item }}">
  <h2><a class="link"></a></h2>
  <p class="description"></p>
</div>
<script>
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readystate == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var a = document.querySelector("#page-{{ item }} h2 .link");
      a.href = "https://eisoptrophobia.github.io" + data.url;
      a.innerText = data.name;
      document.querySelector("#page-{{ item }} .description").innerText = data.description;
    }
  }
  xhttp.open("GET", "https://eisoptrophobia.github.io/games/{{ item }}/data.json");
  xhttp.send();
</script>

{% endfor %}
