---
layout: default
items:
  - A
  - B
  - C
  - D
---

{% for item in page.items %}
# {{ item }}
{% endfor %}
