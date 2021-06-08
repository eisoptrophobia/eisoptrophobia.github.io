---
layout: default
pageitems: "a", "b", "c", "d"
---

{% for item in pageitems %}
# {{ item }}
{% endfor %}
